import cron from "node-cron";
import AnalysisReport from "../models/AnalysisReport.js";

export const cleanupCron = ()=>{
    cron.schedule("0 3 * * *",async()=>{
        console.log("cleanup cron started");

        const users = await AnalysisReport.distinct("userId");
        for(const userId of users){
            const reports = await AnalysisReport.find({userId})
            .sort({analyzedAt:-1})
            .skip(5);

            if(reports.length){
                const ids = reports.map((r)=> r._id);
                await AnalysisReport.deleteMany({_id:{$in:ids}});
            }
        }
        console.log("Cleanup completed");
    });
};