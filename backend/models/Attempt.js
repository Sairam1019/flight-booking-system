const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  flight_id: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 1
  },
  lastAttempt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attempt", AttemptSchema);
