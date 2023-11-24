import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // this cookie cannot be accessed by the browser
    maxAge: 30 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict", // CSRF
  });
  return token;
};

export default generateTokenAndSetCookie;
