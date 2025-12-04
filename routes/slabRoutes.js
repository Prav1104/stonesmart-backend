const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createSlab,
  getSlabs,
  updateSlab,
  deleteSlab,
} = require("../controllers/slabController");

router.post("/", auth, createSlab);
router.get("/", auth, getSlabs);
router.put("/:id", auth, updateSlab);
router.delete("/:id", auth, deleteSlab);

module.exports = router;
