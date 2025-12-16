const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * GET /api/wallet/:userId
 * Returns wallet balance for logged-in user
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      wallet_balance: user.wallet_balance
    });
  } catch (err) {
    console.error("Wallet route error:", err);
    res.status(500).json({ error: "Wallet fetch failed" });
  }
});

module.exports = router;