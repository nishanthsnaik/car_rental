import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json({ success: false, message: "not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();

    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "not authorized"
        });
    }
}