const express = require("express");
const router = express.Router();
const { createOrder, getOrders, deleteOrder } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

// Routes
router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.delete("/:id", auth, deleteOrder);

module.exports = router;
