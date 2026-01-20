const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "financial_crm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const createTestUser = async () => {
  try {
    const username = "testuser";
    const email = "testuser@gmail.com";
    const password = "test123"; // Simple password for testing
    const fullName = "Test User";
    const role = "financial_planner";

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.promise().getConnection();
    
    const [result] = await connection.query(
      "INSERT INTO users (username, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, fullName, role]
    );

    console.log("✅ Test user created successfully!");
    console.log("\nTest Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${role}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    connection.release();
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("❌ User already exists. Here are the test credentials:\n");
      console.log("Test Credentials:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Username: testuser");
      console.log("Email: testuser@gmail.com");
      console.log("Password: test123");
      console.log("Role: financial_planner");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } else {
      console.error("❌ Error:", error.message);
    }
  }
  pool.end();
};

createTestUser();
