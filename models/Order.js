const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String },
    items: [
      {
        slabId: { type: mongoose.Schema.Types.ObjectId, ref: "Slab" },
        quantity: Number,
        price: Number
      }
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending"
    },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
