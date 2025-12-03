const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    interest: { type: String }, // granite, quartz, etc.
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "won", "lost"],
      default: "new"
    },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
