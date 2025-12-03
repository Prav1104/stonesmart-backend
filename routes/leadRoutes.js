const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createLead,
  getLeads,
  deleteLead
} = require("../controllers/leadController");

router.post("/", authMiddleware, createLead);
router.get("/", authMiddleware, getLeads);
router.delete("/:id", authMiddleware, deleteLead);

module.exports = router;
