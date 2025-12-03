const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createSlab,
  getSlabs,
  getSingleSlab,
  updateSlab,
  deleteSlab,
} = require("../controllers/slabController");

// CREATE
router.post("/", authMiddleware, createSlab);

// GET ALL
router.get("/", authMiddleware, getSlabs);

// GET SINGLE
router.get("/:id", authMiddleware, getSingleSlab);

// UPDATE
router.put("/:id", authMiddleware, updateSlab);

// DELETE
router.delete("/:id", authMiddleware, deleteSlab);

module.exports = router;
