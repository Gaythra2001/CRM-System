const express = require("express");
const { createTicket, getTickets, allTickets, updateTicketStatus, deleteTicket, updateTicket } = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["financial_planner", "mortgage_broker"]), createTicket);
router.get("/", authMiddleware(["financial_planner", "mortgage_broker"]), getTickets);
router.get("/all", authMiddleware(["financial_planner", "mortgage_broker"]), allTickets);
router.put("/:id", authMiddleware(["financial_planner", "mortgage_broker"]), updateTicket);
router.put("/status/:id", authMiddleware(["financial_planner", "mortgage_broker"]), updateTicketStatus);
router.delete("/:id", authMiddleware(["financial_planner", "mortgage_broker"]), deleteTicket);

module.exports = router;