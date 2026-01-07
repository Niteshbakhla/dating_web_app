import User from "../models/authModel.js";
import Profile from "../models/profileModel.js";
import CustomError from "../utilis/customError.js"
import { verifyGoogleIdToken } from "../utilis/verifyGoogleToken.js";


export const googleLogin = async (idToken) => {
            if (!idToken) {
                        throw new CustomError("Google ID token is required", 400);
            }

            const payload = await verifyGoogleIdToken(idToken)

            const { email, sub: googleId, name, email_verified } = payload

            if (!email) {
                        throw new CustomError("Google account has no email", 400);
            }

            if (!email_verified) {
                        throw new CustomError("Google email is not verified", 400);
            }

            let user = await User.findOne({ googleId });

            if (!user) {
                        user = await User.create({
                                    email,
                                    name,
                                    googleId,
                        });
            }

            const profile = await Profile.findOne({ userId: user._id });

            return {
                        user,
                        hasProfile: Boolean(profile),
            };
};

