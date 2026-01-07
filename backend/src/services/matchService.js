import Match from "../models/matchModel.js";

export const getUserMatches = async (userId) => {
            return await Match.find({ users: userId }).populate("users", "name email");
}