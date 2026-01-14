import { getGlobalLeaderboard } from "../services/leaderboardService.js";

// Get Leaderboard
export const getLeaderboard = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 20,
            language,
            country,
        } = req.query;

        const leaderboard = await getGlobalLeaderboard({
            page,
            limit,
            language,
            country,
        });

        res.status(200).json({ message: "Leaderboard fetched successfully" }, {
            page: Number(page),
            limit: Number(limit),
            results: leaderboard.length,
            leaderboard,
        });

    } catch (err) {
        next(err);
    }
};