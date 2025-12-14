const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // 🔥 FIX: ensure type matches MongoDB
    const bookings = await Booking.find({ user_id: Number(user_id) });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;
