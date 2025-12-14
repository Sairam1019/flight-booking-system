const express = require("express");
const db = require("../config/mysql");

const router = express.Router();

/**
 * GET /api/wallet/:userId
 */
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT wallet_balance FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ wallet_balance: result[0].wallet_balance });
    }
  );
});

module.exports = router;
