// backend/lib/utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // ✅ Cookie for Render (HTTPS) and cross-site (frontend on other domain)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,        // Render uses HTTPS
    sameSite: "None",    // allow cross-site cookie (frontend <> backend)
    path: "/",           // send cookie to all routes
    // ❌ DO NOT set `domain` here; let it default to backend host
  });

  return token;
};
