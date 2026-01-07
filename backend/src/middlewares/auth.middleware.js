import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import CustomError from "../utilis/customError.js";
import config from "../config/config.js";


const protect = asyncHandler(async (req, res, next) => {
            const token = req.cookies?.token;

            if (!token) {
                        throw new CustomError("Not authorized, token missing", 401);
            }


            const decoded = jwt.verify(token, config.JWT_SECRET);

            req.user = { id: decoded.userId };
            next();
});

export default protect;
