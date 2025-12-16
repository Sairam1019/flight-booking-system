✈️ FLIGHT BOOKING SYSTEM – FULL STACK APPLICATION

A complete Flight Booking System built using Node.js, Express.js, MongoDB Atlas, and Vanilla JavaScript.
This project demonstrates database-driven flight search, dynamic pricing, wallet system, PDF ticket generation, and booking history.


---

FEATURES

User Authentication

User Registration & Login

Passwords encrypted using bcrypt

User data stored in MongoDB Atlas


Flight Search

Flights stored in MongoDB (no static JSON, no APIs)

Search based on From → To cities

Returns up to 10 flights


Dynamic Pricing (Surge Pricing)

Tracks search/booking attempts per flight

If a flight is searched/booked 3 times within 5 minutes
→ Price increases by 10%

Price resets after 10 minutes


Wallet System

Each user has a wallet

Default balance: ₹50,000

Booking deducts wallet balance

Prevents booking if wallet balance is insufficient


Booking & Ticket Generation

Generates PDF ticket after booking

Ticket includes:
Passenger Name
Flight ID
Airline
Route
Amount Paid
Booking Time
Unique PNR


Booking History

View booking history

Download ticket PDF anytime



---

TECH STACK

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB Atlas
ORM: Mongoose
Authentication: bcrypt
PDF Generation: pdfkit


---

PROJECT STRUCTURE

Flight_booking_system/

backend

config

mongodb.js


models

User.js

Flight.js

Booking.js

Attempt.js

Wallet.js


routes

auth.js

flights.js

booking.js

bookings.js

wallet.js

ticket.js


utils

generatePNR.js

generatePDF.js

surgePricing.js


seed

seedFlights.js


tickets

server.js

.env


frontend

css

js

index.html

login.html

register.html

bookings.html

help.html



---

ENVIRONMENT SETUP

Create a file named .env inside backend folder.

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/flight_booking_db
JWT_SECRET=flight_booking_secret

Do NOT push .env to GitHub.


---

MONGODB ATLAS SETUP

1. Create MongoDB Atlas account
https://www.mongodb.com/atlas


2. Create a free shared cluster


3. Create database
flight_booking_db


4. Create database user (username & password)


5. Network Access → Allow IP
0.0.0.0/0




---

FLIGHT DATA SEEDING (VERY IMPORTANT)

Flights must be inserted before searching.

Seed file location:
backend/seed/seedFlights.js

Run seed command:

cd backend
node seed/seedFlights.js

Expected output:

40 Flights seeded successfully


---

HOW TO RUN PROJECT

1. Install dependencies



cd backend
npm install

2. Start server



node server.js

3. Open browser



http://localhost:5000


---

HOW TO TEST

1. Register a new user


2. Login


3. Wallet starts with ₹50,000


4. Search flights (example: Hyderabad → Delhi)


5. Book flight


6. Wallet amount reduces


7. Ticket PDF generated


8. Booking visible in My Bookings




---

WALLET SYSTEM DETAILS

Wallet linked with MongoDB User

Auto-created during registration

Deducts balance during booking



---

TICKET DOWNLOAD

API Endpoint:
GET /api/ticket/:pnr

Downloads ticket PDF.


---

DYNAMIC PRICING LOGIC

Tracks attempts per flight

Applies surge pricing automatically

Resets price after time window



---

COMMON ISSUES & SOLUTIONS

Flights not showing
→ Run flight seed script

Wallet undefined
→ Check userId exists in localStorage

ObjectId Cast Error
→ Ensure MongoDB _id is used

PDF not downloading
→ Ensure tickets folder exists


---

ACADEMIC COMPLIANCE

✔ Database-driven
✔ No static JSON
✔ No external APIs
✔ Wallet system
✔ Dynamic pricing
✔ PDF generation


---