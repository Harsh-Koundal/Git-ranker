import mongoose from "mongoose";

const GrowthMetricsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },

  commitGrowthPercentage: Number,
  starGrowthPercentage: Number,
  followerGrowthPercentage: Number,

  comparedPeriod: String, // month | quarter
  calculatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("GrowthMetrics", GrowthMetricsSchema);
