require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --------------------------------------------------
// ✅ FIXED CORS — WORKS WITH RENDER + LOCALHOST
// --------------------------------------------------
app.use(
  cors({
    origin: "*", // allow ALL origins for development + render stability
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 This line ensures OPTIONS preflight NEVER fails on Render
// app.options("*", cors());

// --------------------------------------------------
// Middleware
// --------------------------------------------------
app.use(express.json());

// --------------------------------------------------
// ROUTES
// --------------------------------------------------
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

const slabRoutes = require("./routes/slabRoutes");
app.use("/api/slabs", slabRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);



console.log("Routes mounted");

// --------------------------------------------------
// DATABASE CONNECTION
// --------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// --------------------------------------------------
// TEST ROOT ENDPOINT
// --------------------------------------------------
app.get("/", (req, res) => res.send("StoneSmart backend running 🚀"));

// --------------------------------------------------
// START SERVER
// --------------------------------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
