import mongoose from "mongoose";

const CategoryScoreSchema = new mongoose.Schema({
    score:Number,
    weight:Number,
},{_id:false});

const LanguageSchema = new mongoose.Schema({
    name:String,
    percentage:Number,
    commits:Number,
    color:String,
},{_id:false});


const AnalysisReportsSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"UserProfile",required:true},

    overallScore: Number,
  level: String,
  globalRank: String,
  percentile: String,

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
    topRepo: {
      name: String,
      stars: Number,
    },
    growthPercentage: String,
  },

   followers: {
    total: Number,
    growthPercentage: String,
    followerFollowingRatio: Number,
  },

  commits: {
    total: Number,
    last7days: Number,
    last30days: Number,
    last90days: Number,
    last365days: Number,
    perDayAverage: Number,
    firstCommitDate: String,
    lastCommitDate: String,
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

  analyzedAt: { type: Date, default: Date.now },

},{timestamps:true});

export default mongoose.model("AnalysisReport",AnalysisReportsSchema);