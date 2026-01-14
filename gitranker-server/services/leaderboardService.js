import UserProfile from "../models/UserProfile.js";
import AnalysisReport from "../models/AnalysisReport.js";

const calculateTrend = (current, previous) => {
    if (!previous) return { trend: "same", value: 0 };
    if (current > previous) return { trend: "up", value: current - previous };
    if (current < previous) return { trend: "down", value: previous - current };
    return { trend: "same", value: 0 };
};

// Get Global Leaderboard
export const getGlobalLeaderboard = async ({
    page = 1,
    limit = 20,
    language,
    country,
}) => {
    const skip = (page - 1) * limit;

    const reports = await AnalysisReport.aggregate([
        { $sort: { analyzedAt: -1 } },
        {
            $group: {
                _id: "$userId",
                latestReport: { $first: "$$ROOT" },
            },
        },
        { $replaceRoot: { newRoot: "$latestReport" } },
        { $sort: { overallScore: -1 } },
        { $skip: skip },
        { $limit: Number(limit) },
    ]);

  const userIds = reports.map((r) => r.userId);

  const users = await UserProfile.find({
    _id: { $in: userIds },
  }).lean();

  const userMap = {};
  users.forEach((u) => (userMap[u._id] = u));


  const Leaderboard = reports.map((report,index)=>{
    const user = userMap[report.userId];

    const previousReport = null;

    const trend = calculateTrend(
        report.overallScore,
        previousReport?.overallScore
    );

    return{
        rank: skip + index + 1,
      username: user.githubUsername,
      name: user.fullName,
      avatar: user.avatarUrl,
      location: user.location,
      score: report.overallScore,
      level: report.level,
      language: user.languages?.[0]?.name || "Unknown",
      trend: trend.trend,
      trendValue: trend.value,
      repos: report.repositories.total,
      stars: user.stars.total,
      commits: report.commits.total,
    }
  })
}