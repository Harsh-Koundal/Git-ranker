import mongoose from "mongoose";

const LeaderboardEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },

  rank: Number,
  score: Number,
  level: String,

  name: String,
  username: String,
  avatarUrl: String,
  location: String,
  primaryLanguage: String,

  repos: Number,
  stars: Number,
  commits: Number,

  trend: String, // up | down | same
  trendValue: Number,

  badges: [String],
}, { timestamps: true });

export default mongoose.model("LeaderboardEntry", LeaderboardEntrySchema);
