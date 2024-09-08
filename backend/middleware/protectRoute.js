import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Please authenticate." });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) {
            return res.status(400).json({
                err: "Invalid token"
            });
        }
        const user = await User.findById(decodedData.userId);
        if (!user) {
            return res.status(400).json({
                err: "user not found"
            });
        }

        req.user = user;
        // console.log(req.user);
        // const user = await User
        next();

    } catch (err) {
        console.log("error in protect Route middleware", err.message);
        res.status(400).json({
            err: "internal server error"
        })
    }
}

export default protectRoute;