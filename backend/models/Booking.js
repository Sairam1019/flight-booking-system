const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",              // 👈 important
    required: true
  },
  passenger_name: {
    type: String,
    required: true
  },
  flight_id: {
    type: String,
    required: true
  },
  airline: String,
  route: String,
  amount_paid: {
    type: Number,
    required: true
  },
  booking_time: {
    type: Date,
    default: Date.now
  },
  pnr: {
    type: String,
    unique: true,
    required: true
  },
  ticket_path: String
});

module.exports = mongoose.model("Booking", BookingSchema);
