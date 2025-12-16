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

// ✅ Auto-update lastAttempt each time a record is modified
AttemptSchema.pre("save", function (next) {
  this.lastAttempt = Date.now();
  next();
});

// ✅ Indexes
AttemptSchema.index({ flight_id: 1 });
AttemptSchema.index({ lastAttempt: 1 }, { expireAfterSeconds: 86400 }); // optional cleanup

module.exports = mongoose.model("Attempt", AttemptSchema);
