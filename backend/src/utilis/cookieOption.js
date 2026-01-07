import config from "../config/config.js";

export const getAuthCookieOptions = () => {
            const isProd = config.NODE_ENV === "production";
            return {
                        httpOnly: true,
                        secure: isProd,
                        sameSite: isProd ? "none" : "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
            };
};
