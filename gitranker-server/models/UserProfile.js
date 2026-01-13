import mongoose from "mongoose";

const ProfileCompletenessSchema = new mongoose.Schema({
  bio: Boolean,
  avatar: Boolean,
  pinnedRepos: Boolean,
  profileReadme: Boolean,
  externalLinks: Boolean,
  score: Number,
}, { _id: false });

const UserProfileSchema = new mongoose.Schema({
  githubUsername: { type: String, required: true, unique: true },
  githubId: { type: Number, unique: true },

  fullName: String,
  avatarUrl: String,
  bio: String,
  location: String,
  company: String,
  website: String,
  twitter: String,

  accountCreatedAt: Date,
  accountAgeYears: Number,

  profileCompleteness: ProfileCompletenessSchema,
}, { timestamps: true });

export default mongoose.model("UserProfile", UserProfileSchema);