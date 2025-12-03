const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("Order Create Error:", error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("Order Delete Error:", error);
    res.status(500).json({ success: false, message: "Error deleting order" });
  }
};
