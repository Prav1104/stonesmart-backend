const Lead = require("../models/Lead");

// ---------------------------------
// CREATE LEAD
// ---------------------------------
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating lead", error });
  }
};

// ---------------------------------
// GET ALL LEADS (search + filter + sort + pagination)
// ---------------------------------
exports.getLeads = async (req, res) => {
  try {
    const {
      search = "",
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { interest: { $regex: search, $options: "i" } }
      ];
    }

    if (status) query.status = status;

    const leads = await Lead.find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: leads,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching leads", error });
  }
};

// ---------------------------------
// GET SINGLE LEAD
// ---------------------------------
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lead", error });
  }
};

// ---------------------------------
// UPDATE LEAD
// ---------------------------------
exports.updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) return res.status(404).json({ success: false, message: "Lead not found" });

    res.json({ success: true, message: "Lead updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating lead", error });
  }
};

// ---------------------------------
// DELETE LEAD
// ---------------------------------
exports.deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ success: false, message: "Lead not found" });

    res.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting lead", error });
  }
};
