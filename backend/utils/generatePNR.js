module.exports = function generatePNR() {
  return "PNR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};
