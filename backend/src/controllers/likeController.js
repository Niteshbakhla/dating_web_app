import asyncHandler from "../middlewares/asyncHandler.js";
import { likeProfileService } from "../services/likedService.js";


export const likeProfile = asyncHandler(async (req, res) => {
            const likedBy = req.user.id;
            const { likedTo } = req.body;

            const result = await likeProfileService(likedBy, likedTo);

            res.status(201).json({
                        success: true,
                        message:
                                    result.status === "matched"
                                                ? "It's a match 🎉"
                                                : "Profile liked",
                        data: result,
            });
});
