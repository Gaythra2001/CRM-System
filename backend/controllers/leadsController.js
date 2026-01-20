const { Lead, VALID_STATUSES } = require("../models/Lead");
const Interaction = require("../models/Interaction");

const listLeads = async (req, res) => {
  try {
    const leads = await Lead.findAllForUser(req.user.role, req.user.id);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads" });
  }
};

const createLead = async (req, res) => {
  const { name, email, phone, source, value, notes, nextActionAt, ownerId } = req.body;
  if (!name || !ownerId) {
    return res.status(400).json({ message: "Name and ownerId are required" });
  }
  try {
    const id = await Lead.create({
      name,
      email,
      phone,
      source,
      value: value || 0,
      notes,
      nextActionAt,
      createdBy: req.user.id,
      ownerId,
    });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: "Error creating lead" });
  }
};

const updateLead = async (req, res) => {
  try {
    const updated = await Lead.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Lead not found or no changes" });
    res.json({ message: "Lead updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating lead" });
  }
};

const updateLeadStatus = async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const updated = await Lead.updateStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

const convertLead = async (req, res) => {
  try {
    const customerId = await Lead.convertToCustomer(req.params.id, req.user.id);
    if (!customerId) return res.status(404).json({ message: "Lead not found" });
    await Interaction.create({
      relatedType: "lead",
      relatedId: req.params.id,
      type: "note",
      summary: "Lead converted to customer",
      occurredAt: new Date(),
      createdBy: req.user.id,
    });
    res.json({ message: "Lead converted", customerId });
  } catch (err) {
    res.status(500).json({ message: "Error converting lead" });
  }
};

module.exports = { listLeads, createLead, updateLead, updateLeadStatus, convertLead };
