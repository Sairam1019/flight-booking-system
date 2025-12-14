# ✈️ Flight Booking System

A full-stack Flight Booking Web Application developed using **Node.js, Express.js, MongoDB, MySQL, HTML, CSS, and JavaScript**.  
This project demonstrates a **database-driven flight search system**, **dynamic pricing**, **wallet-based booking**, **PDF ticket generation**, and **booking history management**.

---

## 🔥 Features

### 1️⃣ Flight Search Module (Database Driven)
- Flights are stored in **MongoDB**
- Search flights by **departure** and **arrival** cities
- Returns results **directly from database**
- No static JSON or external APIs used

---

### 2️⃣ Dynamic Pricing Engine
- If a user tries to book the **same flight 3 times within 5 minutes**, price increases by **10%**
- After **10 minutes**, price resets to original base price
- Surge pricing is clearly shown in UI

---

### 3️⃣ Wallet System
- Wallet managed using **MySQL**
- Default wallet balance: **₹50,000**
- Wallet balance displayed in profile dropdown
- Ticket price is deducted on successful booking
- Booking fails if wallet balance is insufficient

---

### 4️⃣ Ticket PDF Generation
- PDF ticket generated after every successful booking
- Downloadable anytime from booking history
- Ticket includes:
  - Passenger Name
  - Airline & Flight ID
  - Route (Departure → Arrival)
  - Final Price Paid
  - Booking Date & Time
  - Unique PNR

---

### 5️⃣ Booking History
- Displays complete booking history per user
- Shows:
  - Flight details
  - Amount paid
  - Booking date
  - PNR
- Option to download ticket PDF again

---

### 6️⃣ Authentication
- User Registration & Login
- User data stored in **MySQL**
- Session handled using **Local Storage**

---

### 7️⃣ User Interface
- Video background home page
- Clean navbar with:
  - Home
  - Book Now
  - My Bookings
  - Profile dropdown
- Profile dropdown includes:
  - Wallet balance
  - Help page
  - Logout
- Fully responsive layout

---

## 🧠 Technology Stack

| Layer | Technology |
|------|-----------|
Frontend | HTML, CSS, JavaScript |
Backend | Node.js, Express.js |
Database | MongoDB (Flights, Bookings) |
Database | MySQL (Users, Wallet) |
PDF | pdfkit |
Version Control | Git, GitHub |
Deployment | Render (Optional) |

---

## 📂 Project Structure

flight-booking-system/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── models/
│ ├── config/
│ ├── utils/
│ └── seed/
│
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── register.html
│ ├── search.html
│ ├── bookings.html
│ ├── help.html
│ ├── css/
│ ├── js/
│ └── images/
│
├── .gitignore
└── README.md


---

## ⚙️ Setup & Run Instructions

### ✅ Prerequisites
- Node.js installed
- MongoDB running
- MySQL running

---

### 🛠️ Backend Setup

```bash
cd backend
npm install
PORT=5000
MONGO_URI=mongodb://localhost:27017/flightDB
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=flight_booking
##to run server
node server.js
## console output
🚀 Flight Booking System is running
🌐 Open: http://localhost:5000
