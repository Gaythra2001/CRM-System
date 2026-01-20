const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || "",
  database: "financial_crm_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const seedDatabase = async () => {
  try {
    const connection = await pool.promise().getConnection();

    console.log("🔄 Seeding database...\n");

    // Seed users
    const users = [
      {
        username: "admin",
        email: "admin@crm.com",
        password: "admin123",
        fullName: "Admin User",
        role: "admin",
      },
      {
        username: "planner1",
        email: "planner1@crm.com",
        password: "planner123",
        fullName: "John Planner",
        role: "financial_planner",
      },
      {
        username: "broker1",
        email: "broker1@crm.com",
        password: "broker123",
        fullName: "Sarah Broker",
        role: "mortgage_broker",
      },
      {
        username: "planner2",
        email: "planner2@crm.com",
        password: "planner456",
        fullName: "Jane Smith",
        role: "financial_planner",
      },
    ];

    for (const user of users) {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await connection.query(
          "INSERT INTO users (username, email, password, fullName, role) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?, fullName = ?",
          [
            user.username,
            user.email,
            hashedPassword,
            user.fullName,
            user.role,
            hashedPassword,
            user.fullName,
          ]
        );
        console.log(`✅ Seeded user: ${user.username}`);
      } catch (err) {
        console.log(`⏭️  User ${user.username} already exists, skipping`);
      }
    }

    // Get user IDs for ticket creation
    const [userRows] = await connection.query(
      "SELECT id, username FROM users LIMIT 4"
    );
    const userMap = {};
    userRows.forEach((u) => {
      userMap[u.username] = u.id;
    });

    // Seed tickets
    const tickets = [
      {
        serial_number: "TKT001",
        client_name: "Acme Corporation",
        client_address: "123 Business Ave, NYC",
        client_contact: "555-0100",
        amount: 50000.0,
        created_by: userMap["planner1"] || 1,
        assigned_to: userMap["broker1"] || 3,
        status: "open",
      },
      {
        serial_number: "TKT002",
        client_name: "Tech Startup Inc",
        client_address: "456 Innovation Blvd, SF",
        client_contact: "555-0101",
        amount: 75000.0,
        created_by: userMap["planner1"] || 1,
        assigned_to: userMap["broker1"] || 3,
        status: "in_progress",
      },
      {
        serial_number: "TKT003",
        client_name: "Global Enterprises",
        client_address: "789 Corporate Pkwy, Boston",
        client_contact: "555-0102",
        amount: 120000.0,
        created_by: userMap["planner2"] || 1,
        assigned_to: userMap["broker1"] || 3,
        status: "open",
      },
      {
        serial_number: "TKT004",
        client_name: "Small Business LLC",
        client_address: "321 Main St, Austin",
        client_contact: "555-0103",
        amount: 35000.0,
        created_by: userMap["planner1"] || 1,
        assigned_to: userMap["broker1"] || 3,
        status: "closed",
      },
      {
        serial_number: "TKT005",
        client_name: "Retail Solutions",
        client_address: "654 Commerce Dr, Chicago",
        client_contact: "555-0104",
        amount: 60000.0,
        created_by: userMap["planner2"] || 1,
        assigned_to: userMap["broker1"] || 3,
        status: "open",
      },
    ];

    for (const ticket of tickets) {
      try {
        await connection.query(
          "INSERT INTO tickets (serial_number, client_name, client_address, client_contact, amount, created_by, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = ?",
          [
            ticket.serial_number,
            ticket.client_name,
            ticket.client_address,
            ticket.client_contact,
            ticket.amount,
            ticket.created_by,
            ticket.assigned_to,
            ticket.status,
            ticket.status,
          ]
        );
        console.log(`✅ Seeded ticket: ${ticket.serial_number}`);
      } catch (err) {
        console.log(`⏭️  Ticket ${ticket.serial_number} already exists, skipping`);
      }
    }

    console.log("\n✨ Database seeding complete!");
    console.log("\n📋 Sample Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Admin:");
    console.log("  Username: admin");
    console.log("  Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Financial Planner:");
    console.log("  Username: planner1");
    console.log("  Password: planner123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Mortgage Broker:");
    console.log("  Username: broker1");
    console.log("  Password: broker123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    connection.release();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
  }
  pool.end();
};

seedDatabase();
