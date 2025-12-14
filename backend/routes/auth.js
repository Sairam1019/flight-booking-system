const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/mysql");

const router = express.Router();

/**
 * REGISTER
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, wallet_balance) VALUES (?, ?, ?, 50000)",
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "User already exists" });
      }
      res.json({ message: "Account created successfully" });
    }
  );
});

/**
 * LOGIN
 * POST /api/auth/login
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    }
  );
});

module.exports = router;
