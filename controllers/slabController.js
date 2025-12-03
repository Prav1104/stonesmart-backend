const Slab = require("../models/Slab");

// CREATE
exports.createSlab = async (req, res) => {
  try {
    const slab = await Slab.create(req.body);
    res.status(201).json({ success: true, data: slab });
  } catch (error) {
    console.error("Slab Create Error:", error);
    res.status(500).json({ success: false, message: "Error creating slab", error });
  }
};

// GET ALL
exports.getSlabs = async (req, res) => {
  try {
    const slabs = await Slab.find().sort({ createdAt: -1 });
    res.json({ success: true, data: slabs });
  } catch (error) {
    console.error("Slab Fetch Error:", error);
    res.status(500).json({ success: false, message: "Error fetching slabs" });
  }
};

// DELETE
exports.deleteSlab = async (req, res) => {
  try {
    const { id } = req.params;
    await Slab.findByIdAndDelete(id);
    res.json({ success: true, message: "Slab deleted" });
  } catch (error) {
    console.error("Slab Delete Error:", error);
    res.status(500).json({ success: false, message: "Error deleting slab" });
  }
};
