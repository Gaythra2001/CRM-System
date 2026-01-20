const db = require("../config/db");

class Customer {
  static async create({ name, email, phone, address, createdBy, ownerId }) {
    const [result] = await db.query(
      `INSERT INTO customers (name, email, phone, address, created_by, owner_id) VALUES (?, ?, ?, ?, ?, ?)`
      , [name, email, phone, address, createdBy, ownerId]
    );
    return result.insertId;
  }

  static async findAllForUser(role, userId) {
    const baseQuery = `SELECT * FROM customers`;
    if (role === "admin") {
      const [rows] = await db.query(baseQuery + " ORDER BY created_at DESC");
      return rows;
    }
    const [rows] = await db.query(
      baseQuery + " WHERE owner_id = ? OR created_by = ? ORDER BY created_at DESC",
      [userId, userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM customers WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async update(id, fields) {
    const query = [];
    const params = [];
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined && value !== null && value !== "") {
        query.push(`${key} = ?`);
        params.push(value);
      }
    }
    if (query.length === 0) return 0;
    params.push(id);
    const sql = `UPDATE customers SET ${query.join(", ")} WHERE id = ?`;
    const [result] = await db.query(sql, params);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM customers WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = Customer;
