require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require("./routes/auth");

// mount routes  ✅ notice the leading slash
app.use("/api/auth", authRoutes);
console.log("✅ Routes mounted");


// connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

app.get("/", (req, res) => res.send("StoneSmart backend running 🚀"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
