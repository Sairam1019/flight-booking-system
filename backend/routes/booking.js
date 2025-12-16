const express = require("express");
const mongoose = require("mongoose");
const Flight = require("../models/Flight");
const Booking = require("../models/Booking");
const User = require("../models/User");
const generatePNR = require("../utils/generatePNR");
const generatePDF = require("../utils/generatePDF");

const router = express.Router();

/**
 * POST /api/book
 * body: { user_id, passenger_name, flight_id }
 */
router.post("/", async (req, res) => {
  try {
    const { user_id, passenger_name, flight_id } = req.body;

    // 🔒 Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const flight = await Flight.findOne({ flight_id });
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.wallet_balance < flight.current_price) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // 💰 Deduct wallet
    user.wallet_balance -= flight.current_price;
    await user.save();

    // ✈️ Create booking
    const booking = new Booking({
      user_id,
      passenger_name,
      flight_id,
      airline: flight.airline,
      route: `${flight.departure_city} → ${flight.arrival_city}`,
      amount_paid: flight.current_price,
      pnr: generatePNR()
    });

    booking.ticket_path = generatePDF(booking);
    await booking.save();

    res.json({
      message: "Booking successful",
      booking
    });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
