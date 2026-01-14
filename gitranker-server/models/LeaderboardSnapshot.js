import mongoose from "mongoose";

const leaderboardSnapshotSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile",
        required:true,
    },
    rank:Number,
    score:Number,
    level:String,
    updatedAt:Date,
});

export default mongoose.model("LeaderboardSnapshort",leaderboardSnapshotSchema);
