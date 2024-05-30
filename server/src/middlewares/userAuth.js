const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isLoggedIn = async (req, res, next) => {
    try {
        console.log("->", req.headers)
        const token = req.headers.authorization || req.headers.Authorization;
        console.log("hello", token);
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRETE);
            const user = await User.findById(decode?.id);
            if (!user) {
                res.status(403).json({ status: false, message: "User not authorized" });
            }
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}

module.exports = { isLoggedIn };