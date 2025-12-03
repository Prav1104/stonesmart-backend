
const express = require("express");
const router = express.Router();
const { createSlab, getSlabs, deleteSlab } = require("../controllers/slabController");
const auth = require("../middleware/authMiddleware");

// CREATE slab
router.post("/", auth, createSlab);

// GET slabs
router.get("/", auth, getSlabs);

// DELETE slab
router.delete("/:id", auth, deleteSlab);

module.exports = router;
