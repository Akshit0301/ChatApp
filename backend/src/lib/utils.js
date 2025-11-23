import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,        // HTTPS required (Render + Vercel are HTTPS)
    sameSite: "None",    // Required for cross-site cookies
    path: "/",           // Cookie available for all routes
  });

  return token;
};
