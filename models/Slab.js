const mongoose = require("mongoose");

const SlabSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    origin: {
      type: String,
      required: true,
      trim: true,
    },

    thicknessMm: {
      type: Number,
      required: true,
    },

    pricePerSqft: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// IMPORTANT: Model name must be exactly "Slab"
module.exports = mongoose.model("Slab", SlabSchema);
