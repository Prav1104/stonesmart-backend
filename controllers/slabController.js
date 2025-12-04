const Slab = require("../models/Slab");



exports.createSlab = async (req, res) => {
  try {
    const slab = await Slab.create(req.body);
    res.json({ success: true, data: slab });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET /slabs
exports.getSlabs = async (req, res) => {
  try {
    const { q, sortBy = "name", sortDir = "asc" } = req.query;

    console.log("BACKEND Q RECEIVED:", q);

    let filter = {};

    if (q && q.trim() !== "") {
      filter = {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { origin: { $regex: q, $options: "i" } }
        ]
      };
    }

    const slabs = await Slab.find(filter)
      .sort({ [sortBy]: sortDir === "asc" ? 1 : -1 });

    res.json({ success: true, data: slabs });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching slabs" });
  }
};


exports.updateSlab = async (req, res) => {
  try {
    console.log("Update ID:", req.params.id);
    console.log("Update Body:", req.body);

    const slab = await Slab.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    console.log("Mongo Response:", slab);

    res.json({ success: true, data: slab });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.deleteSlab = async (req, res) => {
  try {
    await Slab.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Slab deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
