const db = require("../config/db");


class User {

  static async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  static async findOne({ username, email, resetPasswordToken, resetPasswordExpires }) {
    const query = [];
    const params = [];
  
    if (username) {
      query.push("username = ?");
      params.push(username);
    }
    if (email) {
      query.push("email = ?");
      params.push(email);
    }
    if (resetPasswordToken) {
      query.push("resetPasswordToken = ?");
      params.push(resetPasswordToken);
    }
    if (resetPasswordExpires) {
      query.push("resetPasswordExpires > ?");
      params.push(resetPasswordExpires);
    }
  
    if (query.length === 0) {
      return null; 
    }
  
    const sql = `SELECT * FROM users WHERE ${query.join(" AND ")}`;
  
    const [rows] = await db.query(sql, params);
    return rows[0] || null;
  }
  
  static async createUser(username, email, password, fullName, role) {
    const [result] = await db.query(
      "INSERT INTO users (username, email, password,fullName, role) VALUES (?, ?, ?, ?,?)",
      [username, email, password, fullName, role]
    );
    return result.insertId;
  }

  static async getAllUsers() {
    const [rows] = await db.query(
      "SELECT id, username,email,fullName, role FROM users"
    );
    return rows;
  }

  static async updateUser(id, fields) {
    const query = [];
    const params = [];

    for (const [key, value] of Object.entries(fields)) {
        if (value !== undefined && value !== null && value !== "") { 
            query.push(`\`${key}\` = ?`); 
            params.push(value);
        }
    }

    if (query.length === 0) {
        return 0; 
    }

    params.push(id);
    const sql = `UPDATE users SET ${query.join(", ")} WHERE id = ?`;

    try {
        const [result] = await db.query(sql, params);
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Database update failed");
    }
}


  static async deleteUser(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  }

  static async save(resetPasswordToken, resetPasswordExpires, id) {
    const [result] = await db.query(
      "UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?",
      [resetPasswordToken, resetPasswordExpires, id]
    );
    return result.affectedRows;
  }

  static async savePass(resetPasswordToken, resetPasswordExpires, password, id) {
    const [result] = await db.query(
      "UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ?, password = ? WHERE id = ?",
      [resetPasswordToken, resetPasswordExpires, password, id]
    );
    return result.affectedRows;
  }
  
}

module.exports = User;
