const mongoose = require("mongoose");

const slabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  material: { type: String, required: true }, // Granite / Quartz
  color: { type: String, required: true },
  origin: { type: String },
  price: { type: Number, required: true },
  thickness: { type: Number },
  stockQty: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Slab", slabSchema);
