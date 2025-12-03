const Slab = require("../models/Slab");

// CREATE
exports.createSlab = async (req, res) => {
  try {
    const slab = await Slab.create(req.body);
    res.status(201).json({ success: true, data: slab });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating slab", error });
  }
};

// GET ALL (search + filter + sort + pagination)
exports.getSlabs = async (req, res) => {
  try {
    const {
      search = "",
      material,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { color: { $regex: search, $options: "i" } }
      ];
    }

    if (material) query.material = material;

    const slabs = await Slab.find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Slab.countDocuments(query);

    res.json({
      success: true,
      data: slabs,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching slabs", error });
  }
};

// GET SINGLE (ID from URL)
exports.getSingleSlab = async (req, res) => {
  try {
    const { id } = req.params;
    const slab = await Slab.findById(id);

    if (!slab) return res.status(404).json({ success: false, message: "Slab not found" });

    res.json({ success: true, data: slab });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching slab", error });
  }
};

// UPDATE
exports.updateSlab = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Slab.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Slab not found" });

    res.json({ success: true, message: "Slab updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating slab", error });
  }
};

// DELETE
exports.deleteSlab = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Slab.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ success: false, message: "Slab not found" });

    res.json({ success: true, message: "Slab deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting slab", error });
  }
};
