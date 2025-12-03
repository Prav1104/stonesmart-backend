const Lead = require("../models/Lead");

// CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      assignedTo: req.user.id
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    console.error("Lead Create Error:", error);
    res.status(500).json({ success: false, message: "Error creating lead" });
  }
};

// GET LEADS with filters
exports.getLeads = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    const query = {};

    if (status) query.status = status;
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "name email");

    res.json({ success: true, data: leads });
  } catch (error) {
    console.error("Lead Fetch Error:", error);
    res.status(500).json({ success: false, message: "Error fetching leads" });
  }
};

// DELETE
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting lead" });
  }
};
