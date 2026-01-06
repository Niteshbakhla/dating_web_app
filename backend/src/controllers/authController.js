import config from "../config/config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { googleLogin } from "../services/authService.js";
import { getAuthCookieOptions } from "../utilis/cookieOption.js";
import { generateToken } from "../utilis/jwtToken.js";


export const googleAuth = asyncHandler(async (req, res) => {
            const { idToken } = req.body;
            console.log(idToken)
            if (!idToken) {
                        throw new CustomError("Google ID token is required", 400);
            }

            const { user } = await googleLogin(idToken);
            const token = generateToken(user._id);

            res.cookie("token", token, getAuthCookieOptions());


            res.status(200).json({
                        success: true,
                        message: "Login successful",
                        user,
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
