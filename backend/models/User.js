const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  wallet_balance: {
    type: Number,
    default: 50000
  }
});

module.exports = mongoose.model("User", UserSchema);