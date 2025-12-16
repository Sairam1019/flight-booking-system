const express = require("express");
const Flight = require("../models/Flight");

const router = express.Router();

/**
 * GET /api/flights?from=&to=
 * Returns 10 flights from DB
 */
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To required" });
    }

    const flights = await Flight.find({
      departure_city: from,
      arrival_city: to
    }).limit(10);

    res.json(flights);
  } catch (err) {
    console.error("Flight search error:", err);
    res.status(500).json({ error: "Error fetching flights" });
  }
});

module.exports = router;
