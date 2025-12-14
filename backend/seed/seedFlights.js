require("../config/mongodb");
const Flight = require("../models/Flight");

const flights = [
  { flight_id: "AI101", airline: "Air India", departure_city: "Hyderabad", arrival_city: "Delhi", base_price: 2200, current_price: 2200 },
  { flight_id: "AI102", airline: "Air India", departure_city: "Hyderabad", arrival_city: "Mumbai", base_price: 2300, current_price: 2300 },
  { flight_id: "AI103", airline: "IndiGo", departure_city: "Delhi", arrival_city: "Chennai", base_price: 2400, current_price: 2400 },
  { flight_id: "AI104", airline: "Vistara", departure_city: "Bangalore", arrival_city: "Delhi", base_price: 2500, current_price: 2500 },
  { flight_id: "AI105", airline: "SpiceJet", departure_city: "Mumbai", arrival_city: "Hyderabad", base_price: 2600, current_price: 2600 },
  { flight_id: "AI106", airline: "IndiGo", departure_city: "Chennai", arrival_city: "Bangalore", base_price: 2700, current_price: 2700 },
  { flight_id: "AI107", airline: "Air India", departure_city: "Delhi", arrival_city: "Kolkata", base_price: 2800, current_price: 2800 },
  { flight_id: "AI108", airline: "Vistara", departure_city: "Hyderabad", arrival_city: "Pune", base_price: 2900, current_price: 2900 },
  { flight_id: "AI109", airline: "SpiceJet", departure_city: "Mumbai", arrival_city: "Delhi", base_price: 3000, current_price: 3000 },
  { flight_id: "AI110", airline: "IndiGo", departure_city: "Bangalore", arrival_city: "Mumbai", base_price: 2100, current_price: 2100 },

  { flight_id: "AI111", airline: "Air India", departure_city: "Chennai", arrival_city: "Delhi", base_price: 2200, current_price: 2200 },
  { flight_id: "AI112", airline: "IndiGo", departure_city: "Pune", arrival_city: "Hyderabad", base_price: 2300, current_price: 2300 },
  { flight_id: "AI113", airline: "Vistara", departure_city: "Delhi", arrival_city: "Jaipur", base_price: 2400, current_price: 2400 },
  { flight_id: "AI114", airline: "SpiceJet", departure_city: "Kolkata", arrival_city: "Delhi", base_price: 2500, current_price: 2500 },
  { flight_id: "AI115", airline: "IndiGo", departure_city: "Mumbai", arrival_city: "Chennai", base_price: 2600, current_price: 2600 },
  { flight_id: "AI116", airline: "Air India", departure_city: "Bangalore", arrival_city: "Hyderabad", base_price: 2700, current_price: 2700 },
  { flight_id: "AI117", airline: "Vistara", departure_city: "Delhi", arrival_city: "Ahmedabad", base_price: 2800, current_price: 2800 },
  { flight_id: "AI118", airline: "SpiceJet", departure_city: "Jaipur", arrival_city: "Mumbai", base_price: 2900, current_price: 2900 },
  { flight_id: "AI119", airline: "IndiGo", departure_city: "Pune", arrival_city: "Delhi", base_price: 3000, current_price: 3000 },
  { flight_id: "AI120", airline: "Air India", departure_city: "Hyderabad", arrival_city: "Chennai", base_price: 2100, current_price: 2100 },

  { flight_id: "AI121", airline: "Air India", departure_city: "Delhi", arrival_city: "Bangalore", base_price: 2200, current_price: 2200 },
  { flight_id: "AI122", airline: "IndiGo", departure_city: "Mumbai", arrival_city: "Pune", base_price: 2300, current_price: 2300 },
  { flight_id: "AI123", airline: "Vistara", departure_city: "Chennai", arrival_city: "Kolkata", base_price: 2400, current_price: 2400 },
  { flight_id: "AI124", airline: "SpiceJet", departure_city: "Hyderabad", arrival_city: "Ahmedabad", base_price: 2500, current_price: 2500 },
  { flight_id: "AI125", airline: "IndiGo", departure_city: "Delhi", arrival_city: "Pune", base_price: 2600, current_price: 2600 },
  { flight_id: "AI126", airline: "Air India", departure_city: "Mumbai", arrival_city: "Jaipur", base_price: 2700, current_price: 2700 },
  { flight_id: "AI127", airline: "Vistara", departure_city: "Bangalore", arrival_city: "Chennai", base_price: 2800, current_price: 2800 },
  { flight_id: "AI128", airline: "SpiceJet", departure_city: "Kolkata", arrival_city: "Mumbai", base_price: 2900, current_price: 2900 },
  { flight_id: "AI129", airline: "IndiGo", departure_city: "Ahmedabad", arrival_city: "Delhi", base_price: 3000, current_price: 3000 },
  { flight_id: "AI130", airline: "Air India", departure_city: "Pune", arrival_city: "Bangalore", base_price: 2100, current_price: 2100 },

  { flight_id: "AI131", airline: "IndiGo", departure_city: "Delhi", arrival_city: "Lucknow", base_price: 2200, current_price: 2200 },
  { flight_id: "AI132", airline: "SpiceJet", departure_city: "Lucknow", arrival_city: "Mumbai", base_price: 2300, current_price: 2300 },
  { flight_id: "AI133", airline: "Vistara", departure_city: "Jaipur", arrival_city: "Delhi", base_price: 2400, current_price: 2400 },
  { flight_id: "AI134", airline: "Air India", departure_city: "Bangalore", arrival_city: "Kolkata", base_price: 2500, current_price: 2500 },
  { flight_id: "AI135", airline: "IndiGo", departure_city: "Chennai", arrival_city: "Pune", base_price: 2600, current_price: 2600 },
  { flight_id: "AI136", airline: "SpiceJet", departure_city: "Mumbai", arrival_city: "Ahmedabad", base_price: 2700, current_price: 2700 },
  { flight_id: "AI137", airline: "Vistara", departure_city: "Delhi", arrival_city: "Amritsar", base_price: 2800, current_price: 2800 },
  { flight_id: "AI138", airline: "Air India", departure_city: "Amritsar", arrival_city: "Delhi", base_price: 2900, current_price: 2900 },
  { flight_id: "AI139", airline: "IndiGo", departure_city: "Bangalore", arrival_city: "Jaipur", base_price: 3000, current_price: 3000 },
  { flight_id: "AI140", airline: "SpiceJet", departure_city: "Hyderabad", arrival_city: "Nagpur", base_price: 2100, current_price: 2100 }
];

async function seed() {
  try {
    await Flight.deleteMany();
    await Flight.insertMany(flights);
    console.log("✅ 40 Flights seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
