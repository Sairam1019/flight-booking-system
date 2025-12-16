const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  flight_id: {
    type: String,
    required: true,
    unique: true
  },
  airline: {
    type: String,
    required: true
  },
  departure_city: {
    type: String,
    required: true,
    index: true        // 🔥 faster search
  },
  arrival_city: {
    type: String,
    required: true,
    index: true        // 🔥 faster search
  },
  base_price: {
    type: Number,
    required: true
  },
  current_price: {
    type: Number,
    required: true
  },
  last_reset: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Flight", FlightSchema);
