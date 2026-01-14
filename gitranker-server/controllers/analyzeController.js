import {
    fetchUserProfile,
    fetchAllRepositories,
    fetchRepoLanguages,
    fetchContributionCalendar,
    fetchCommitStats,
    fetchFollowers,
    fetchStarredRepos,
} from "../services/github.service.js";

import {
    normalizeUserProfile,
    normalizeProfileCompleteness,
    normalizeRepositories,
    normalizeStars,
    normalizeFollowers,
    normalizeLanguages,
    normalizeCommits,
    normalizeStreaks,
    normalizeWeekdayActivity,
    normalizeMonthlyHeatmap,
} from "../services/normalize.service.js";


import { generateScoreReport } from "../services/score.service.js";

import UserProfile from "../models/UserProfile.js";
import AnalysisReport from "../models/AnalysisReport.js";

// Analyze Github Profile
export const analyzeGithubProfile = async (req, res, next) => {

    try {

        const { username } = req.body;

        if (!username || typeof username !== "string") return res.status(400).json({ message: "InValid Github username" });

        const [
            githubUser,
            repositories,
            contributionCalendar,
            commitStats,
            starredRepos,
        ] = await Promise.all([
            fetchUserProfile(username),
            fetchAllRepositories(username),
            fetchContributionCalendar(username),
            fetchCommitStats(username),
            fetchStarredRepos(username),
        ]);

        const repoLanguagesMap = {};

        await Promise.all(
            repositories.map(async (repo) => {
                try {
                    repoLanguagesMap[repo.name] = await fetchRepoLanguages(
                        username,
                        repo.name
                    );
                } catch {
                    repoLanguagesMap[repo.name] = {};
                }
            })
        );


        // Normalization Layer
        const profile = normalizeUserProfile(githubUser);
        const profileCompleteness = normalizeProfileCompleteness(githubUser);

        const repos = normalizeRepositories(repositories);
        const stars = normalizeStars(repositories);
        const followers = normalizeFollowers(githubUser);

        const languages = normalizeLanguages(repoLanguagesMap);

        const commits = normalizeCommits(
            contributionCalendar,
            commitStats
        );

        const streak = normalizeStreaks(contributionCalendar);
        const weekdayActivity = normalizeWeekdayActivity(contributionCalendar);
        const monthlyHeatmap = normalizeMonthlyHeatmap(contributionCalendar);

        // Scoring
        const scoreReport = generateScoreReport({
            commits,
            streak,
            repos,
            stars,
            followers,
            prs: { merged: 0 },
            profileCompleteness,
        });

        const user = await UserProfile.findOneAndUpdate(
            { githubUsername: profile.githubUsername },
            {
                ...profile,
                profile,
                followers,
                stars,
                languages,
            },
            { upsert: true, new: true }
        );

        const report = await AnalysisReport.create({
            userId: user._id,

            overallScore: scoreReport.overallScore,
            level: scoreReport.level,
            categoryScores: scoreReport.categoryScores,

            repositories: repos,
            commits,
            streak,
            weekdayActivity,
            monthlyHeatmap,

            analyzedAt: new Date(),
        });

        res.status(201).json({
            success: true,
            username: user.githubUsername,
            overallScore: report.overallScore,
            level: report.level,
        });
    } catch (err) {
        console.log("error occured:", err);
        next(err);
    }
}