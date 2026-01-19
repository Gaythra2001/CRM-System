const db = require("../config/db");

class Ticket {
  static async createTicket(serialNumber, clientName, clientAddress, clientContact, amount, createdBy, assignedTo) {
    const [result] = await db.query(
      "INSERT INTO tickets (serial_number, client_name, client_address, client_contact, amount, created_by, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [serialNumber, clientName, clientAddress, clientContact, amount, createdBy, assignedTo]
    );
    return result.insertId;
  }

  static async getTicketsByUser(userId) {
    const [rows] = await db.query("SELECT * FROM tickets WHERE created_by = ? OR assigned_to = ?", [userId, userId]);
    return rows;
  }

  static async getAllTickets() {
    const [rows] = await db.query("SELECT * FROM tickets");
    return rows;
  }

  static async update(ticketId, updates) {
    try {
      const fields = [];
      const values = [];
  
      for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
  
      if (fields.length === 0) {
        throw new Error("No updates provided");
      }
  
      values.push(ticketId);
  
      const [result] = await db.query(
        `UPDATE tickets SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
  
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw new Error("Internal Server Error");
    }
  }
  

  static async updateStatus(ticketId, status) {
    const validStatuses = ['open', 'in_progress', 'closed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    const [result] = await db.query("UPDATE tickets SET status = ? WHERE id = ?", [status, ticketId]);
    return result.affectedRows > 0;
  }


  static async deleteTicketById(ticketId) {
    const [result] = await db.query("DELETE FROM tickets WHERE id = ?", [ticketId]);
    return result.affectedRows > 0;
  }
  

}

module.exports = Ticket;