import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    //req.user is just an object
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};
export default protectRoute;
