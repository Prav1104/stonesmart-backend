const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const { createOrder, getOrders, deleteOrder } = require("../controllers/orderController");

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;
