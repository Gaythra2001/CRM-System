const db = require("../config/db");

class Interaction {
  static async create({ relatedType, relatedId, type, summary, occurredAt, createdBy }) {
    const [result] = await db.query(
      `INSERT INTO interactions (related_type, related_id, type, summary, occurred_at, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`
      , [relatedType, relatedId, type, summary, occurredAt, createdBy]
    );
    return result.insertId;
  }

  static async list(relatedType, relatedId) {
    const [rows] = await db.query(
      `SELECT * FROM interactions WHERE related_type = ? AND related_id = ? ORDER BY occurred_at DESC`,
      [relatedType, relatedId]
    );
    return rows;
  }
}

module.exports = Interaction;
