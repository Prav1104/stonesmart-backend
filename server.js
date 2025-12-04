// --------------------------------------------------
// LOAD ENV + IMPORTS
// --------------------------------------------------
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// --------------------------------------------------
// CREATE EXPRESS APP (must come BEFORE app.use)
// --------------------------------------------------
const app = express();

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// ROUTES
// --------------------------------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/slabs", require("./routes/slabRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

console.log("Routes loaded");

// --------------------------------------------------
// DATABASE CONNECTION
// --------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error →", err));

// --------------------------------------------------
// ROOT ENDPOINT
// --------------------------------------------------
app.get("/", (req, res) => {
  res.send("StoneSmart backend running 🚀");
});

// --------------------------------------------------
// START SERVER  → ONLY ONE PORT DECLARATION!
// --------------------------------------------------
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
