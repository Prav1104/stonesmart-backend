const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createSlab,
  getSlabs,
  updateSlab,
  deleteSlab
} = require("../controllers/slabController");

// CREATE SLAB
router.post("/", auth, createSlab);

// GET ALL SLABS
router.get("/", auth, getSlabs);

// UPDATE SLAB
router.put("/:id", auth, updateSlab);

// DELETE SLAB
router.delete("/:id", auth, deleteSlab);

module.exports = router;
