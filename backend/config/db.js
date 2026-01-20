const mysql = require("mysql2");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, USE_DEV_LOGIN } = require("./config");

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err) => {
  if(err) {
    console.log("⚠️  Database connection failed:", err.message);
    if (USE_DEV_LOGIN) {
      console.log("✅ Running in DEV mode without database");
    } else {
      console.log("❌ Database required. Please install/start MySQL or set USE_DEV_LOGIN=true");
    }
  } else {
    console.log("✅ Connected to database");
  }
});

module.exports = pool.promise();