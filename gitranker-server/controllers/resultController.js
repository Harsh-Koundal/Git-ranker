import UserProfile from "../models/UserProfile.js";
import AnalysisReport from "../models/AnalysisReport.js";

// get result
export const getResult = async (req, res, next) => {
    try {
        const { username } = req.params;

        if (!username) return res.status(400).json({ message: "Username is required" });

        // fetch user profile
        const user = await UserProfile.findOne({ githubUsername: username }).lean();

        if (!user) return res.status(400).json({ message: "Profile not analyzed yet" });

        const report = await AnalysisReport.findOne({
            userId: user._id,
        })
            .sort({ analyzedAt: -1 })
            .lean();

        if (!report) return res.status(400).json({ message: "No analysisi report found" });

        res.json({
            profile: {
                username: user.githubUsername,
                fullName: user.fullName,
                avatar: user.avatarUrl,
                bio: user.bio,
                location: user.location,
                company: user.company,
                website: user.website,
                twitter: user.twitter,
                accountAgeYears: user.accountAgeYears,
                profileCompleteness: user.profileCompleteness,
                followers: user.followers,
                stars: user.stars,
                languages: user.languages,
            },

            report: {
                overallScore: report.overallScore,
                level: report.level,
                categoryScores: report.categoryScores,

                repositories: report.repositories,
                commits: report.commits,
                streak: report.streak,
                weekdayActivity: report.weekdayActivity,
                monthlyHeatmap: report.monthlyHeatmap,

                analyzedAt: report.analyzedAt,
            },
        });

    }catch(err){
        console.error("error:",err);
        next(err);
    }
};

