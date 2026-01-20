const express = require("express");
const { listCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../controllers/customersController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), listCustomers);
router.post("/", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), createCustomer);
router.get("/:id", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), getCustomer);
router.put("/:id", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), updateCustomer);
router.delete("/:id", authMiddleware(["admin"]), deleteCustomer);

module.exports = router;
