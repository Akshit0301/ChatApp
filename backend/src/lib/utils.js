import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,          // required for cross-site
    sameSite: "None",      // required for cross-site
    path: "/",             // make cookie valid for full API
  });

  return token;
};
