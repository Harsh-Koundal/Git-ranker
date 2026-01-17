import AnalysisReport from "../models/AnalysisReport.js";

export const getGlobalLeaderboard = async ({
  page = 1,
  limit = 20,
  language,
  country,
}) => {
  const skip = (page - 1) * limit;

  const pipeline = [
    { $sort: { analyzedAt: -1 } },

    {
      $group: {
        _id: "$userId",
        report: { $first: "$$ROOT" },
      },
    },

    { $replaceRoot: { newRoot: "$report" } },

    { $sort: { overallScore: -1 } },

    { $skip: skip },
    { $limit: limit },

    {
      $lookup: {
        from: "userprofiles",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },

    { $unwind: "$user" },
  ];

  const data = await AnalysisReport.aggregate(pipeline);

  return data.map((report, index) => ({
    userId: report.user._id,
    rank: skip + index + 1,

    name: report.user.fullName || report.user.githubUsername,
    username: report.user.githubUsername,
    avatarUrl: report.user.avatarUrl,
    location: report.user.location || "Unknown",

    score: report.overallScore,
    level: report.level,

    repos: report.repositories?.total ?? 0,
    stars: report.stars?.total ?? 0,
    commits: report.commits?.total ?? 0,

    primaryLanguage: report.languages?.[0]?.name ?? "Unknown",

    trend: "same",
    trendValue: 0,
    badges: ["⭐"],
  }));
};
