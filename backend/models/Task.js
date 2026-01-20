const db = require("../config/db");

const VALID_TASK_STATUS = ["open", "in_progress", "done"];

class Task {
  static async create({ title, description, dueDate, relatedType, relatedId, assignedTo, createdBy, reminderAt }) {
    const [result] = await db.query(
      `INSERT INTO tasks (title, description, due_date, related_type, related_id, assigned_to, created_by, reminder_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      , [title, description, dueDate, relatedType, relatedId, assignedTo, createdBy, reminderAt]
    );
    return result.insertId;
  }

  static async findForUser(userId) {
    const [rows] = await db.query(
      `SELECT * FROM tasks WHERE assigned_to = ? ORDER BY due_date IS NULL, due_date ASC, created_at DESC`,
      [userId]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    if (!VALID_TASK_STATUS.includes(status)) {
      throw new Error("Invalid task status");
    }
    const [result] = await db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = { Task, VALID_TASK_STATUS };
