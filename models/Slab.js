const mongoose = require("mongoose");

const slabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  price_per_sqyard: { type: Number, required: true },
  thickness_mm: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Slab", slabSchema);
