import asyncHandler from "../middlewares/asyncHandler.js";
import { getUserMatches } from "../services/matchService.js";


export const findMatches = asyncHandler(
            async (req, res) => {
                        const matches = await getUserMatches(req.user.id);

                        res.status(200).json({
                                    success: true,
                                    matches
                        })
            }
)