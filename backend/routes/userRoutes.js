const express = require("express");
const {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware(["admin", "financial_planner", "mortgage_broker"]), getAllUsers);
router.get("/:id", authMiddleware(["admin", "financial_planner", "mortgage_broker"]), getUserById);
router.post("/", authMiddleware("admin"), addUser);
router.put("/:id",authMiddleware("admin"), updateUser);
router.delete("/:id",authMiddleware("admin"), deleteUser);

module.exports = router;
