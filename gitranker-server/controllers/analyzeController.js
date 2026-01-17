import {
  fetchUserProfile,
  fetchAllRepositories,
  fetchRepoLanguages,
  fetchContributionCalendar,
  fetchCommitStats,
  fetchFollowers,
  fetchPullRequests,
  fetchIssues,
} from "../services/githubService.js";

import {
  normalizeUserProfile,
  normalizeProfileCompleteness,
  normalizeRepositories,
  normalizeStars,
  normalizeFollowers,
  normalizeLanguages,
  normalizeCommits,
  normalizeStreaks,
  normalizePullRequests,
  normalizeIssues,
} from "../services/normalizeService.js";

import { generateScoreReport } from "../services/scoreService.js";

import UserProfile from "../models/UserProfile.js";
import AnalysisReport from "../models/AnalysisReport.js";
import LeaderboardSnapshot from "../models/LeaderboardSnapshot.js";

export const analyzeGithubProfile = async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "Invalid GitHub username" });
    }

    const [
      githubUser,
      repositories,
      contributionCalendar,
      commitStats,
      followersList,
    ] = await Promise.all([
      fetchUserProfile(username),
      fetchAllRepositories(username),
      fetchContributionCalendar(username),
      fetchCommitStats(username),
      fetchFollowers(username),
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

    const allPRs = [];
    const allIssues = [];

    await Promise.all(
      repositories.map(async (repo) => {
        try {
          const [prs, issues] = await Promise.all([
            fetchPullRequests(username, repo.name),
            fetchIssues(username, repo.name),
          ]);
          allPRs.push(...prs);
          allIssues.push(...issues);
        } catch { }
      })
    );

    const profile = normalizeUserProfile(githubUser);
    const profileCompleteness = normalizeProfileCompleteness(githubUser);

    const repos = normalizeRepositories(repositories);
    const stars = normalizeStars(repositories);

    const followers = normalizeFollowers({
      followers: followersList.length,
      following: githubUser.following,
    });

    const languages = normalizeLanguages(repoLanguagesMap);
    const commits = normalizeCommits(contributionCalendar, commitStats);
    const streak = normalizeStreaks(contributionCalendar);

    const pullRequests = normalizePullRequests(allPRs);
    const issues = normalizeIssues(allIssues);

    const allDays = contributionCalendar.weeks.flatMap(
      (w) => w.contributionDays
    );

    const activeDays = allDays.filter(
      (d) => d.contributionCount > 0
    ).length;

    const activeDaysPercentage = Math.round(
      (activeDays / allDays.length) * 100
    );

    let consistencyLabel = "Low";

    if (streak.current >= 60) {
      consistencyLabel = "Excellent";
    } else if (streak.current >= 30 || activeDaysPercentage >= 50) {
      consistencyLabel = "Good";
    }

    const activity = {
      activeDaysPercentage,
      inactiveDaysPercentage: 100 - activeDaysPercentage,
      consistencyLabel,
      trend: "stable",
    };


    const scoreReport = generateScoreReport({
      commits,
      streak,
      repos,
      stars,
      followers,
      prs: pullRequests,
      profileCompleteness,
    });

    const user = await UserProfile.findOneAndUpdate(
      { githubUsername: profile.githubUsername },
      {
        ...profile,
        followers,
        stars,
        languages,
        profileCompleteness,
      },
      { upsert: true, new: true }
    );

    const report = await AnalysisReport.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        overallScore: scoreReport.overallScore,
        level: scoreReport.level,
        categoryScores: scoreReport.categoryScores,
        repositories: repos,
        stars,
        followers,
        commits,
        streak,
        activity,
        languages,
        pullRequests,
        issues,
        analyzedAt: new Date(),
      },
      { upsert: true, new: true }
    );


    const leaderboardData = await AnalysisReport.aggregate([
      { $sort: { analyzedAt: -1 } },
      {
        $group: {
          _id: "$userId",
          userId: { $first: "$userId" },
          overallScore: { $first: "$overallScore" },
          level: { $first: "$level" },
        },
      },
      { $sort: { overallScore: -1 } },
    ]);

    await LeaderboardSnapshot.deleteMany({});

    const leaderboardDocs = leaderboardData.map((u, index) => ({
      userId: u.userId,
      rank: index + 1,
      score: u.overallScore,
      level: u.level,
    }));

    await LeaderboardSnapshot.insertMany(leaderboardDocs);

    const myRank =
      leaderboardDocs.find(
        (l) => l.userId.toString() === user._id.toString()
      )?.rank ?? null;

    res.status(201).json({
      success: true,
      username: user.githubUsername,
      overallScore: report.overallScore,
      level: report.level,
      rank: myRank,
      analyzedAt: report.analyzedAt,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    next(err);
  }
};
