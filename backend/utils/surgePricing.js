module.exports = function applySurgePricing(flight, attempt) {
  const now = new Date();

  // If 3 attempts within 5 minutes → surge
  if (
    attempt.count >= 3 &&
    now - attempt.lastAttempt <= 5 * 60 * 1000
  ) {
    flight.current_price = flight.base_price * 1.1;
  }

  // Reset price after 10 minutes
  if (now - flight.last_reset > 10 * 60 * 1000) {
    flight.current_price = flight.base_price;
    flight.last_reset = now;
  }
};
