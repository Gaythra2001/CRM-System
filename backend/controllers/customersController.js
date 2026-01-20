const Customer = require("../models/Customer");
const Interaction = require("../models/Interaction");

const listCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAllForUser(req.user.role, req.user.id);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
};

const createCustomer = async (req, res) => {
  const { name, email, phone, address, ownerId } = req.body;
  if (!name || !ownerId) {
    return res.status(400).json({ message: "Name and ownerId are required" });
  }
  try {
    const id = await Customer.create({
      name,
      email,
      phone,
      address,
      createdBy: req.user.id,
      ownerId,
    });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: "Error creating customer" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    const history = await Interaction.list("customer", req.params.id);
    res.json({ customer, history });
  } catch (err) {
    res.status(500).json({ message: "Error fetching customer" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Customer not found or no changes" });
    res.json({ message: "Customer updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer" });
  }
};

module.exports = { listCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer };
