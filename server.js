import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();  // ✅ Must come before using env vars


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // ✅ Mount routes here

// Test Route
app.get("/", (req, res) => {
  res.send("✅ GymBuddy Backend is running");
});

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));


import auth from "./middleware/auth.js";

app.get("/api/protected", auth, (req, res) => {
  res.json({ msg: "Access granted! Welcome " + req.user.id });
}); 