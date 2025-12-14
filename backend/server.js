require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// DB connections
require("./config/mongodb");   // MongoDB
require("./config/mysql");     // MySQL

// Routes
const flightRoutes = require("./routes/flights");
const bookingRoutes = require("./routes/booking");
const bookingHistoryRoutes = require("./routes/bookings");
const ticketRoutes = require("./routes/ticket");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= STATIC FRONTEND =================
// frontend folder is OUTSIDE backend
app.use(express.static(path.join(__dirname, "../frontend")));

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api/bookings", bookingHistoryRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/wallet", walletRoutes);

// ================= FRONTEND PAGE ROUTES =================

// Root → Login
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/search.html"));
});

app.get("/bookings", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/bookings.html"));
});

app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/help.html"));
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Flight Booking System is running");
  console.log(`🌐 Open: http://localhost:${PORT}`);
});
