import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";

import analyzeRoutes from "./routes/analyzeRoute.js";
import resultRoutes from "./routes/resultRoute.js";
import leaderboardRoutes from "./routes/leaderboardRoute.js"
import { leaderboardCron } from "./cron/leaderboardCron.js";
import { cleanupCron } from "./cron/cleanupCron.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5025",
    "http://localhost:3020",
    "https://git-ranker.onrender.com",
    "https://gitranker.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);


app.use(express.json());

// routes
app.use("/api/v1/analyze",analyzeRoutes);
app.use("/api/v1/result",resultRoutes);
app.use("/api/v1/leaderboard",leaderboardRoutes);

leaderboardCron();
cleanupCron();

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