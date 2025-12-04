const mongoose = require("mongoose");

const slabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  material: { type: String, required: true }, // granite / quartz
  color: { type: String, required: true },
  origin: { type: String, default: "" },

  price: { type: Number, required: true }, // per sq yard or per sqft
  thickness: { type: Number, default: 20 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Slab", slabSchema);
