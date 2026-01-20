const db = require("../config/db");

const VALID_STATUSES = ["new", "contacted", "qualified", "lost"];

class Lead {
  static async create({ name, email, phone, source, value, notes, nextActionAt, createdBy, ownerId }) {
    const [result] = await db.query(
      `INSERT INTO leads (name, email, phone, source, value, notes, next_action_at, created_by, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      , [name, email, phone, source, value, notes, nextActionAt, createdBy, ownerId]
    );
    return result.insertId;
  }

  static async findAllForUser(role, userId) {
    const baseQuery = `SELECT * FROM leads`;
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
    const [rows] = await db.query("SELECT * FROM leads WHERE id = ?", [id]);
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
    const sql = `UPDATE leads SET ${query.join(", ")} WHERE id = ?`;
    const [result] = await db.query(sql, params);
    return result.affectedRows;
  }

  static async updateStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error("Invalid lead status");
    }
    const [result] = await db.query("UPDATE leads SET status = ? WHERE id = ?", [status, id]);
    return result.affectedRows;
  }

  static async convertToCustomer(id, createdBy) {
    const lead = await this.findById(id);
    if (!lead) return null;

    const [result] = await db.query(
      `INSERT INTO customers (name, email, phone, address, status, created_by, owner_id)
       VALUES (?, ?, ?, ?, 'active', ?, ?)`
      , [lead.name, lead.email, lead.phone, lead.source || null, createdBy, lead.owner_id]
    );

    const customerId = result.insertId;
    await db.query("UPDATE leads SET converted_customer_id = ? WHERE id = ?", [customerId, id]);
    return customerId;
  }
}

module.exports = { Lead, VALID_STATUSES };
