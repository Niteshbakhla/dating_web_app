import { OAuth2Client } from "google-auth-library";
import config from "../config/config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/authModel.js";
import { googleLogin } from "../services/authService.js";
import { getAuthCookieOptions } from "../utilis/cookieOption.js";
import { generateToken } from "../utilis/jwtToken.js";
const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleAuth = asyncHandler(async (req, res) => {
            const { idToken } = req.body;

            if (!idToken) {
                        throw new CustomError("Google ID token is required", 400);
            }

            const { user, hasProfile } = await googleLogin(idToken);

            const token = generateToken(user._id);
            res.cookie("token", token, getAuthCookieOptions());

            res.status(200).json({
                        success: true,
                        message: "Login successful",
                        user,
                        hasProfile
            });
});



export const logout = (req, res) => {
            res.clearCookie("token", {
                        httpOnly: true,
                        secure: config.NODE_ENV === "production",
                        sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
            });

            res.status(200).json({
                        success: true,
                        message: "Logged out successfully",
            });
};


export const authMe = asyncHandler(
            async (req, res) => {
                        const user = await User.findById(req.user.id);
                        res.status(200).json({ success: true, user })
            }
)