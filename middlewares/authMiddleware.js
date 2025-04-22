import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import Volunteer from "../models/Volunteer.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.cookies.access_token ||
            req.header("Authorization")?.replace("Bearer ", "");
        console.log(req.cookies);

        if (!token) throw new Error("Invalid user: Token not found");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) throw new Error("Invalid token");

        // 🔥 Attach user info to the request
        req.user = decodedToken;

        next();
    } catch (error) {
        next(error);
    }
});

export { verifyJWT };
