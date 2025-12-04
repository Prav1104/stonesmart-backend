const Slab = require("../models/Slab");

// CREATE
exports.createSlab = async (req, res) => {
  try {
    const slab = await Slab.create(req.body);
    res.status(201).json({ success: true, data: slab });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating slab",
      error: error.message
    });
  }
};

// GET ALL (with search/filter)
exports.getSlabs = async (req, res) => {
  try {
    const { search = "", material = "" } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (material) query.material = material;

    const slabs = await Slab.find(query).sort({ createdAt: -1 });

    res.json({ success: true, data: slabs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching slabs",
      error: error.message
    });
  }
};

// UPDATE
exports.updateSlab = async (req, res) => {
  try {
    const updated = await Slab.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating slab",
      error: error.message
    });
  }
};

// DELETE
exports.deleteSlab = async (req, res) => {
  try {
    await Slab.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Slab deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting slab",
      error: error.message
    });
  }
};
