const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",      // MySQL server
  user: "root",           // your MySQL username
  password: "NewPassword@123", // 🔴 replace with your MySQL password
  database: "flight_users"   // database you created
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
});

module.exports = db;
