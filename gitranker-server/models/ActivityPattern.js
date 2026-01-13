import mongoose from "mongoose";

const DayActivitySchema = new mongoose.Schema({
  day: String,
  commits: Number,
}, { _id: false });


const MonthActivitySchema = new mongoose.Schema({
  month: String,
  commits: Number,
}, { _id: false });

const ActivityPatternSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "AnalysisReport", required: true },

  weekdayActivity: [DayActivitySchema],
  monthlyHeatmap: [MonthActivitySchema],
  timeRangeUsed: Number,
}, { timestamps: true });


export default mongoose.model("ActivityPattern", ActivityPatternSchema);