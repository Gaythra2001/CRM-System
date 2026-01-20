const express = require("express");
const { listLeads, createLead, updateLead, updateLeadStatus, convertLead } = require("../controllers/leadsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), listLeads);
router.post("/", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), createLead);
router.put("/:id", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), updateLead);
router.put("/:id/status", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), updateLeadStatus);
router.post("/:id/convert", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), convertLead);

module.exports = router;
