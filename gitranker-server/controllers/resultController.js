import UserProfile from "../models/UserProfile.js";
import AnalysisReport from "../models/AnalysisReport.js";
import LeaderboardSnapshot from "../models/LeaderboardSnapshot.js";

export const getResult = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await UserProfile.findOne({
      githubUsername: username,
    }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not analyzed yet" });
    }

    const report = await AnalysisReport.findOne({
      userId: user._id,
    })
      .sort({ analyzedAt: -1 })
      .lean();

    if (!report) {
      return res.status(404).json({ message: "No report found" });
    }

    const leaderboardRank= await LeaderboardSnapshot.findOne({
        userId:user._id,
    })
    .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      profile: {
        username: user.githubUsername,
        fullName: user.fullName,
        accountCreatedAt: user.accountCreatedAt,
        avatar: user.avatarUrl,
        bio: user.bio,
        location: user.location,
        company: user.company,
        website: user.website,
        twitter: user.twitter,
        accountAgeYears: user.accountAgeYears,
        profileCompleteness: user.profileCompleteness,
        rank:leaderboardRank?.rank?? null,
      },
      report,
    });
  } catch (err) {
    console.error("Result fetch error:", err);
    next(err);
  }
};
