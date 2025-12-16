const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");

const router = express.Router();

/**
 * GET /api/bookings/:user_id
 */
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // 🔒 Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const bookings = await Booking.find({ user_id }).sort({ booking_time: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Booking history error:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;
