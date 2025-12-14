const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user_id: Number,
  passenger_name: String,
  flight_id: String,
  airline: String,
  route: String,
  amount_paid: Number,
  booking_time: {
    type: Date,
    default: Date.now
  },
  pnr: String,
  ticket_path: String
});

module.exports = mongoose.model("Booking", BookingSchema);
