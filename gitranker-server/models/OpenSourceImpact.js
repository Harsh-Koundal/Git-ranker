import mongoose from "mongoose";

const OpenSourceImpactSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "AnalysisReport", required: true },

  pullRequests: {
    created: Number,
    merged: Number,
    open: Number,
    closed: Number,
  },

  issues: {
    opened: Number,
    closed: Number,
    active: Number,
    stale: Number,
  },

  community: {
    views: Number,
    forks: Number,
    stars: Number,
    followers: Number,
  },
}, { timestamps: true });

export default mongoose.model("OpenSourceImpact", OpenSourceImpactSchema);
