const express = require("express");
const { listTasks, createTask, updateTaskStatus, deleteTask } = require("../controllers/tasksController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), listTasks);
router.post("/", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), createTask);
router.put("/:id/status", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), updateTaskStatus);
router.delete("/:id", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), deleteTask);

module.exports = router;
