import cron from "node-cron";
import AnalysisReport from "../models/AnalysisReport.js";
import LeaderboardSnapshot from "../models/LeaderboardSnapshot.js";

export const leaderboardCron = () => {
    cron.schedule("0 * * * *", async () => {
        console.log("Leaderboard cron started");

        try {
            const reports = await AnalysisReport.aggregate([
                { $sort: { analyzedAt: -1 } },
                {
                    $group: {
                        _id: "$userId",
                        latest: { $first: "$$ROOT" },
                    },
                },
                { $replaceRoot: { newRoot: "$latest" } },
                { $sort: { overallScore: -1 } },
                { $limit: 5000 },
            ]);

            await LeaderboardSnapshot.deleteMany({});
            await LeaderboardSnapshot.insertMany(
                reports.map((r, index) => ({
                    userId: r.userId,
                    score: r.overallScore,
                    rank: index + 1,
                    level: r.level,
                    updatedAt: new Date(),
                }))
            );
            console.log("Leaderboard snapshot updated");
        }catch(err){
            console.error("Leaderboard cron failed",err);
        }
    });
};