import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";


dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5025",
    "http://localhost:3020",
];

app.use(
    cors({
        origin:(origin,callback)=>{
            if(!origin || allowedOrigins.includes(origin)){
                callback(null, true);
            }else{
                console.error("Blocker by CORS:",origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials:true,
        methods:["GET","POST","PUT","DELETE","PATCH"],
    })
);


mongoose
.connect(process.env.DB_URI)
.then(async()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.error("MongoDB Error:",err.message);
    process.exit(1);
});

const PORT = process.env.PORT || 5025;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});