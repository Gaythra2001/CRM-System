const { Task, VALID_TASK_STATUS } = require("../models/Task");

const listTasks = async (req, res) => {
  try {
    const tasks = await Task.findForUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate, relatedType, relatedId, assignedTo, reminderAt } = req.body;
  if (!title || !assignedTo) {
    return res.status(400).json({ message: "Title and assignedTo are required" });
  }
  try {
    const id = await Task.create({
      title,
      description,
      dueDate,
      relatedType,
      relatedId,
      assignedTo,
      reminderAt,
      createdBy: req.user.id,
    });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  if (!VALID_TASK_STATUS.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const updated = await Task.updateStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = { listTasks, createTask, updateTaskStatus, deleteTask };
