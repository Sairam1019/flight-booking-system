const express = require("express");
const Flight = require("../models/Flight");
const Booking = require("../models/Booking");
const db = require("../config/mysql");
const generatePNR = require("../utils/generatePNR");
const generatePDF = require("../utils/generatePDF");

const router = express.Router();
module.exports = router;


/**
 * POST /api/book
 * body: { user_id, passenger_name, flight_id }
 */
router.post("/", async (req, res) => {
  try {
    console.log("👉 Booking request body:", req.body);

    const { user_id, passenger_name, flight_id } = req.body;

    const flight = await Flight.findOne({ flight_id });
    console.log("👉 Flight found:", flight);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    db.query(
      "SELECT wallet_balance FROM users WHERE id = ?",
      [user_id],
      async (err, result) => {
        console.log("👉 MySQL result:", result, "Error:", err);

        if (err) {
          console.error("❌ MySQL error");
          return res.status(500).json({ error: "MySQL error" });
        }

        if (!result || result.length === 0) {
          return res.status(404).json({ message: "User not found in MySQL" });
        }

        const balance = result[0].wallet_balance;

        if (balance < flight.current_price) {
          return res.status(400).json({
            message: "Insufficient wallet balance"
          });
        }

        db.query(
          "UPDATE users SET wallet_balance = wallet_balance - ? WHERE id = ?",
          [flight.current_price, user_id],
          async (err2) => {
            if (err2) {
              console.error("❌ Wallet update failed");
              return res.status(500).json({ error: "Wallet update failed" });
            }

            const booking = new Booking({
              user_id,
              passenger_name,
              flight_id: flight.flight_id,
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
          }
        );
      }
    );
  } catch (err) {
    console.error("❌ Booking catch error:", err);
    res.status(500).json({ error: "Booking failed" });
  }
});
