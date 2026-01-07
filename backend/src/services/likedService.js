import Like from "../models/LikeModel.js";
import Match from "../models/matchModel.js";
import CustomError from "../utilis/customError.js";


export const likeProfileService = async (likedBy, likedTo) => {
            if (!likedTo) {
                        throw new CustomError("likedTo id is required", 400);
            }

            if (likedBy.toString() === likedTo.toString()) {
                        throw new CustomError("You cannot like your own profile", 400);
            }

       
            const alreadyLiked = await Like.findOne({ likedBy, likedTo });
            if (alreadyLiked) {
                        throw new CustomError("You already liked this profile", 409);
            }

       
            const like = await Like.create({ likedBy, likedTo });

    
            const reverseLike = await Like.findOne({
                        likedBy: likedTo,
                        likedTo: likedBy,
            });

            if (!reverseLike) {
                        return {
                                    status: "liked",
                                    like,
                        };
            }


            const users = [likedBy, likedTo].sort();

            let match;
            try {
                        match = await Match.create({ users });
            } catch (error) {
                        match = await Match.findOne({ users });
            }

            return {
                        status: "matched",
                        match,
            };
};
