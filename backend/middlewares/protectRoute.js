import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("No token provided"); // Log the absence of token
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded", decoded); // Log the decoded token

    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in token verification", err); // Log any errors during verification
    res.status(500).json({ message: err.message });
  }
};

export default protectRoute;
