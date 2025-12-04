const express = require("express");
const router = express.Router();

const {
  createSlab,
  getSlabs,
  updateSlab,
  deleteSlab
} = require("../controllers/slabController");

router.post("/", createSlab);
router.get("/", getSlabs);
router.put("/:id", updateSlab);
router.delete("/:id", deleteSlab);

module.exports = router;
