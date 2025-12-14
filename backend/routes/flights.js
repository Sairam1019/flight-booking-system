const express = require("express");
const Flight = require("../models/Flight");
const Attempt = require("../models/Attempt");
const applySurgePricing = require("../utils/surgePricing");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;

    const flights = await Flight.find({
      departure_city: from,
      arrival_city: to
    }).limit(10);

    for (let flight of flights) {
      let attempt = await Attempt.findOne({ flight_id: flight.flight_id });

      if (!attempt) {
        attempt = await Attempt.create({
          flight_id: flight.flight_id
        });
      } else {
        attempt.count += 1;
        attempt.lastAttempt = new Date();
        await attempt.save();
      }

      applySurgePricing(flight, attempt);
      await flight.save();
    }

    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: "Error fetching flights" });
  }
});

module.exports = router;
