const express = require("express");
const router = express.Router();
const { createLead, getLeads, deleteLead } = require("../controllers/leadController");
const auth = require("../middleware/authMiddleware");

// Routes
router.post("/", auth, createLead);
router.get("/", auth, getLeads);
router.delete("/:id", auth, deleteLead);

module.exports = router;
