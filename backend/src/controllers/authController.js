import config from "../config/config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/authModel.js";
import { googleLogin } from "../services/authService.js";
import { getAuthCookieOptions } from "../utilis/cookieOption.js";
import { generateToken } from "../utilis/jwtToken.js";


// export const googleAuth = asyncHandler(async (req, res) => {
//             const { idToken } = req.body;

//             if (!idToken) {
//                         throw new CustomError("Google ID token is required", 400);
//             }

//             const { user, hasProfile } = await googleLogin(idToken);

//             const token = generateToken(user._id);
//             res.cookie("token", token, getAuthCookieOptions());

//             res.status(200).json({
//                         success: true,
//                         message: "Login successful",
//                         user,
//                         hasProfile
//             });
// });

export const googleAuth = async (req, res) => {
            try {
                        console.log("STEP 1: route hit");

                        const { idToken } = req.body;
                        console.log("STEP 2: token exists?", !!idToken);

                        const ticket = await client.verifyIdToken({
                                    idToken,
                                    audience: GOOGLE_CLIENT_ID,
                        });
                        console.log("STEP 3: Google verified");

                        const payload = ticket.getPayload();
                        console.log("STEP 4: payload email", payload.email);

                        // your user logic here
                        const token = generateToken(user._id);
                        console.log("STEP 5: before cookie");

                        res.cookie("token", token, getAuthCookieOptions());
                        console.log("STEP 6: cookie set");

                        res.json({ message: "success" });

            } catch (err) {
                        console.error("❌ GOOGLE ERROR:", err);
                        res.status(400).json({ error: err.message });
            }
};


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