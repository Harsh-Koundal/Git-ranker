import mongoose from "mongoose";

const TopRepoSchema = new mongoose.Schema({
  name: String,
  stars: Number,
  forks: Number,
  language: String,
  lastUpdated: String,
}, { _id: false });

const RepositoryQualitySchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "AnalysisReport", required: true },

  documentationScore: Number,
  licenseScore: Number,
  topicsScore: Number,
  cicdScore: Number,
  testsScore: Number,

  maintenance: {
    recentlyUpdatedCount: Number,
    needsAttentionCount: Number,
    archivedCount: Number,
  },

  topRepositories: [TopRepoSchema],
}, { timestamps: true });

export default mongoose.model("RepositoryQuality", RepositoryQualitySchema);