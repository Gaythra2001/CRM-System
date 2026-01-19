const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  const { clientName, clientAddress, clientContact, amount, assignedTo } =
    req.body;
  const createdBy = req.user.id;

  try {
    const serialNumber = `TICKET-${Date.now()}`;
    await Ticket.createTicket(
      serialNumber,
      clientName,
      clientAddress,
      clientContact,
      amount,
      createdBy,
      assignedTo
    );
    res.status(201).json({ message: "Ticket created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating ticket" });
  }
};

const getTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const tickets = await Ticket.getTicketsByUser(userId);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// Get all tickets
const allTickets = async (req, res) => {
  try {
    const tickets = await Ticket.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all tickets" });
  }
};

// update ticket status
const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Ticket.updateStatus(id, status);
    res.status(200).json({ message: "Ticket status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket status" });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { client_name, client_address, client_contact, amount, assigned_to } = req.body;

  if (!client_name || !client_address || !client_contact || !amount || !assigned_to) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
console.log(req.body)
  try {
    await Ticket.update(id, {
      client_name,
      client_address,
      client_contact,
      amount,
      assigned_to
    });
    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.error("Error updating ticket:", error); // Add logging
    res.status(500).json({ message: "Error updating ticket" });
  }
};


// delete ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params; // Make sure req.params contains the id value
  try {
    const success = await Ticket.deleteTicketById(id);
    if (success) {
      res.status(200).json({ message: "Ticket deleted successfully" });
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting ticket" });
  }
};


module.exports = { createTicket, getTickets, allTickets,updateTicket, updateTicketStatus, deleteTicket };

