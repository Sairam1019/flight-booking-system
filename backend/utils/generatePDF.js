const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generatePDF(booking) {
  const fileName = `${booking.pnr}.pdf`;
  const filePath = path.join(__dirname, "..", "tickets", fileName);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(16).text("Flight Ticket", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`PNR: ${booking.pnr}`);
  doc.text(`Passenger: ${booking.passenger_name}`);
  doc.text(`Flight ID: ${booking.flight_id}`);
  doc.text(`Airline: ${booking.airline}`);
  doc.text(`Route: ${booking.route}`);
  doc.text(`Amount Paid: ₹${booking.amount_paid}`);
  doc.text(`Booking Time: ${booking.booking_time}`);

  doc.end();

  return filePath;
};
