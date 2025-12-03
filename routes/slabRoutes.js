const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createSlab,
  getSlabs,
  getSingleSlab,
  updateSlab,
  deleteSlab
} = require("../controllers/slabController");

router.post("/", authMiddleware, createSlab);
router.get("/", authMiddleware, getSlabs);
router.get("/:id", authMiddleware, getSingleSlab);
router.put("/:id", authMiddleware, updateSlab);
router.delete("/:id", authMiddleware, deleteSlab);

module.exports = router;
