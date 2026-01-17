import mongoose from "mongoose";

/* ===================== SUB SCHEMAS ===================== */

const CategoryScoreSchema = new mongoose.Schema(
  {
    score: Number,
    weight: Number,
  },
  { _id: false }
);

const LanguageSchema = new mongoose.Schema(
  {
    name: String,
    percentage: Number,
    bytes: Number, // ✅ honest metric
    color: String,
  },
  { _id: false }
);

const TopRepoSchema = new mongoose.Schema(
  {
    name: String,
    stars: Number,
  },
  { _id: false }
);

/* ===================== MAIN SCHEMA ===================== */

const AnalysisReportsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
      index: true,
    },

    overallScore: Number,
    level: String,

    /* ---------- optional (future leaderboard) ---------- */
    globalRank: Number,
    percentile: Number,

    categoryScores: {
      consistency: CategoryScoreSchema,
      volume: CategoryScoreSchema,
      quality: CategoryScoreSchema,
      impact: CategoryScoreSchema,
      profile: CategoryScoreSchema,
    },

    repositories: {
      total: Number,
      original: Number,
      forked: Number,
      archived: Number,
      active: Number,
    },

    stars: {
      total: Number,
      avgPerRepo: Number,
      topRepos: [TopRepoSchema], 
      growthPercentage: Number, // optional future
    },

    followers: {
      total: Number,
      followerFollowingRatio: Number,
      growthPercentage: Number, // optional future
    },

    commits: {
      total: Number,
      last7days: Number,
      last30days: Number,
      last90days: Number,
      last365days: Number,
      perDayAverage: Number,
      firstCommitDate: Date, // optional future
      lastCommitDate: Date,  // optional future
    },

    streak: {
      current: Number,
      longest: Number,
      average: Number,
      breaks: Number,
    },

    activity: {
      activeDaysPercentage: Number,
      inactiveDaysPercentage: Number,
      consistencyLabel: String,
      trend: String,
    },

    languages: [LanguageSchema],

    pullRequests: {
      created: Number,
      merged: Number,
      acceptanceRate: Number,
      externalRepos: Number,
    },

    issues: {
      opened: Number,
      closed: Number,
      participationRate: Number,
    },

    analyzedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AnalysisReport", AnalysisReportsSchema);
