const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, default: "Unknown" }, // e.g., Instagram, Facebook, Referral

  status: {
    type: String,
    enum: ["New", "Follow-Up", "Converted", "Closed"],
    default: "New"
  },

  note: { type: String },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
