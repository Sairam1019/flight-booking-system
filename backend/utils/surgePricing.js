module.exports = function applySurgePricing(flight, attempt) {
  const now = new Date();

  // Initialize last_reset if missing
  if (!flight.last_reset) {
    flight.last_reset = now;
  }

  // 🔁 RESET PRICE after 10 minutes
  if (now - flight.last_reset >= 10 * 60 * 1000) {
    flight.current_price = flight.base_price;
    attempt.count = 0;              // reset attempts
    flight.last_reset = now;
    return;
  }

  // 🔥 APPLY SURGE (only once)
  if (
    attempt.count >= 3 &&
    flight.current_price === flight.base_price
  ) {
    flight.current_price = Math.round(flight.base_price * 1.1);
  }
};
