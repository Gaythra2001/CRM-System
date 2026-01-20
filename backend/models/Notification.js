const db = require("../config/db");

class Notification {
  static async create({ userId, type, message }) {
    const [result] = await db.query(
      `INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)`
      , [userId, type, message]
    );
    return result.insertId;
  }

  static async listForUser(userId) {
    const [rows] = await db.query(
      `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`,
      [userId]
    );
    return rows;
  }

  static async markRead(id) {
    const [result] = await db.query("UPDATE notifications SET read_at = NOW() WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = Notification;
