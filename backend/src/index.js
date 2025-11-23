import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

// Trusted frontend URLs
const allowedOrigins = [
  "https://chatapp-frontend-81gr.onrender.com",
  "http://localhost:5173" // for local testing if needed
];

// Middlewares
app.use(express.json());
app.use(cookieParser());

// 🔥 CORS for all devices (Mobile + Desktop)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start server
server.listen(PORT, () => {
  console.log("🚀 Server running on PORT: " + PORT);
  connectDB();
});
