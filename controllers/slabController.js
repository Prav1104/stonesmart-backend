const Slab = require("../models/Slab");

// CREATE SLAB
exports.createSlab = async (req, res) => {
  try {
    const slab = await Slab.create(req.body);
    res.status(201).json({ success: true, data: slab });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL SLABS (search + filter + sort)
exports.getSlabs = async (req, res) => {
  try {
    const { search = "", material = "", sortBy = "createdAt", order = "desc" } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (material) query.material = material;

    const slabs = await Slab.find(query).sort({ [sortBy]: order === "asc" ? 1 : -1 });

    res.json({ success: true, data: slabs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateSlab = async (req, res) => {
  try {
    const updated = await Slab.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteSlab = async (req, res) => {
  try {
    await Slab.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Slab deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
