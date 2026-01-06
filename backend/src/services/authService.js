import User from "../models/authModel.js";
import CustomError from "../utilis/customError.js"
import { verifyGoogleIdToken } from "../utilis/verifyGoogleToken.js";


export const googleLogin = async (idToken) => {
            if (!idToken) {
                        throw new CustomError("id token is required", 400);
            }

            const payload = await verifyGoogleIdToken(idToken);
            const { email, sub: googleId, email_verified, name } = payload;

            if (!email) {
                        throw new CustomError("Google account has no email", 400);
            }

            if (!email_verified) {
                        throw new CustomError("Google email is not verified", 400);
            }

            let user = await User.findOne({ googleId });

            if (!user) {
                        user = await User.create({ email, name, googleId });
            }

            return { user };
};
