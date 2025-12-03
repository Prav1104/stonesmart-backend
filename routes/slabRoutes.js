const express = require("express");
const router = express.Router();
const slabController = require("../controllers/slabController");

// Create slab
router.post("/", slabController.createSlab);

// Get all slabs (search, filter, sort, pagination)
router.get("/", slabController.getSlabs);

// Get one slab
router.get("/:id", slabController.getSingleSlab);

// Update slab
router.put("/:id", slabController.updateSlab);

// Delete slab
router.delete("/:id", slabController.deleteSlab);

module.exports = router;
