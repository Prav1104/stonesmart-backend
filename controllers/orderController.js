const Order = require("../models/Order");

// ------------------------------------
// CREATE ORDER
// ------------------------------------
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating order", error });
  }
};

// ------------------------------------
// GET ALL ORDERS (search + filter + sort + pagination)
// ------------------------------------
exports.getOrders = async (req, res) => {
  try {
    const {
      search = "",
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { orderNumber: { $regex: search, $options: "i" } }
      ];
    }

    if (status) query.status = status;

    const orders = await Order.find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders", error });
  }
};

// ------------------------------------
// GET SINGLE ORDER
// ------------------------------------
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.slabId");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order", error });
  }
};

// ------------------------------------
// UPDATE ORDER
// ------------------------------------
exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order", error });
  }
};

// ------------------------------------
// DELETE ORDER
// ------------------------------------
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting order", error });
  }
};
