const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const rootPassword = args[0] || "";

if (!rootPassword) {
  console.log("\n❌ MySQL root password is required!");
  console.log("\nUsage: node fullSetup.js YOUR_MYSQL_ROOT_PASSWORD\n");
  console.log("Example: node fullSetup.js root123\n");
  process.exit(1);
}

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: rootPassword,
  multipleStatements: true,
});

const setup = async () => {
  try {
    console.log("\n🚀 CRM System - Full Setup");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    const connection = await pool.promise().getConnection();

    // Create database
    console.log("1️⃣  Creating database...");
    await connection.query("CREATE DATABASE IF NOT EXISTS financial_crm_db");
    console.log("✅ Database created\n");

    // Select the database
    connection.config.database = "financial_crm_db";

    // Read and execute user schema
    console.log("2️⃣  Importing users schema...");
    const usersSql = fs.readFileSync(
      path.join(__dirname, "../financial_crm_db_users.sql"),
      "utf-8"
    );
    const userStatements = usersSql
      .split(";")
      .filter((s) => s.trim() && !s.trim().startsWith("--"));
    for (const stmt of userStatements) {
      if (stmt.trim()) {
        try {
          await connection.query(stmt);
        } catch (err) {
          // Ignore errors from the dump file metadata
        }
      }
    }
    console.log("✅ Users schema imported\n");

    // Read and execute ticket schema
    console.log("3️⃣  Importing tickets schema...");
    const ticketsSql = fs.readFileSync(
      path.join(__dirname, "../financial_crm_db_tickets.sql"),
      "utf-8"
    );
    const ticketStatements = ticketsSql
      .split(";")
      .filter((s) => s.trim() && !s.trim().startsWith("--"));
    for (const stmt of ticketStatements) {
      if (stmt.trim()) {
        try {
          await connection.query(stmt);
        } catch (err) {
          // Ignore errors
        }
      }
    }
    console.log("✅ Tickets schema imported\n");

    // Update backend .env
    console.log("4️⃣  Updating backend configuration...");
    const envContent = `PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=${rootPassword}
DB_NAME=financial_crm_db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
USE_DEV_LOGIN=false
`;
    fs.writeFileSync(path.join(__dirname, ".env"), envContent);
    console.log("✅ Backend configuration updated\n");

    // Seed data
    console.log("5️⃣  Seeding sample data...");
    const bcrypt = require("bcrypt");

    // Clear existing test data
    try {
      await connection.query("DELETE FROM tickets");
      await connection.query("DELETE FROM users WHERE username IN ('admin', 'planner1', 'planner2', 'broker1')");
    } catch (err) {
      // Tables might not exist yet
    }

    // Insert users
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
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await connection.query(
        "INSERT INTO users (username, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)",
        [user.username, user.email, hashedPassword, user.fullName, user.role]
      );
      console.log(`  ✅ Created user: ${user.username}`);
    }

    // Get user IDs
    const [userRows] = await connection.query("SELECT id, username FROM users");
    const userMap = {};
    userRows.forEach((u) => {
      userMap[u.username] = u.id;
    });

    // Insert tickets
    const tickets = [
      {
        serial_number: "TKT001",
        client_name: "Acme Corporation",
        client_address: "123 Business Ave, NYC",
        client_contact: "555-0100",
        amount: 50000.0,
        created_by: userMap["planner1"],
        assigned_to: userMap["broker1"],
        status: "open",
      },
      {
        serial_number: "TKT002",
        client_name: "Tech Startup Inc",
        client_address: "456 Innovation Blvd, SF",
        client_contact: "555-0101",
        amount: 75000.0,
        created_by: userMap["planner1"],
        assigned_to: userMap["broker1"],
        status: "in_progress",
      },
      {
        serial_number: "TKT003",
        client_name: "Global Enterprises",
        client_address: "789 Corporate Pkwy, Boston",
        client_contact: "555-0102",
        amount: 120000.0,
        created_by: userMap["planner2"],
        assigned_to: userMap["broker1"],
        status: "open",
      },
      {
        serial_number: "TKT004",
        client_name: "Small Business LLC",
        client_address: "321 Main St, Austin",
        client_contact: "555-0103",
        amount: 35000.0,
        created_by: userMap["planner1"],
        assigned_to: userMap["broker1"],
        status: "closed",
      },
    ];

    for (const ticket of tickets) {
      await connection.query(
        "INSERT INTO tickets (serial_number, client_name, client_address, client_contact, amount, created_by, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          ticket.serial_number,
          ticket.client_name,
          ticket.client_address,
          ticket.client_contact,
          ticket.amount,
          ticket.created_by,
          ticket.assigned_to,
          ticket.status,
        ]
      );
      console.log(`  ✅ Created ticket: ${ticket.serial_number}`);
    }

    console.log("\n✨ Setup Complete!\n");
    console.log("📋 Test Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Admin:");
    console.log("  Username: admin");
    console.log("  Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Financial Planner:");
    console.log("  Username: planner1");
    console.log("  Password: planner123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Mortgage Broker:");
    console.log("  Username: broker1");
    console.log("  Password: broker123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n🚀 Next: npm start (to start the backend)\n");

    connection.release();
  } catch (error) {
    console.error("\n❌ Setup error:", error.message);
    console.error(
      "\nTroubleshooting:\n1. Is MySQL installed and running?\n2. Is your root password correct?\n3. Try: node fullSetup.js your_root_password\n"
    );
  }
  pool.end();
};

setup();
