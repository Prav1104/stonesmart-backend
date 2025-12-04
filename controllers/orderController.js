const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { customer_name, customer_phone, slab_name, quantity } = req.body;

    // Example price formula: ₹150 per sqft (customize as needed)
    const total_price = quantity * 150;

    const order = await Order.create({
      customer_name,
      customer_phone,
      slab_name,
      quantity,
      total_price,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating order", error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
