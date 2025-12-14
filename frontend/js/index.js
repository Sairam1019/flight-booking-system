// ================= USER AUTH =================
// Show username
document.getElementById("username").innerText = localStorage.getItem("userName");

// Toggle dropdown
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  const dropdown = document.querySelector(".profile-dropdown");
  if (!dropdown.contains(e.target)) {
    document.getElementById("profileMenu").style.display = "none";
  }
});

// Fetch wallet balance
fetch(`/api/wallet/${localStorage.getItem("userId")}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("wallet").innerText =
      `💰 Wallet: ₹${data.wallet_balance}`;
  });

const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");

if (!userId) {
  window.location.href = "login.html";
}

// Show username
if (document.getElementById("username")) {
  document.getElementById("username").innerText = userName;
}
if (document.getElementById("welcomeName")) {
  document.getElementById("welcomeName").innerText = userName;
}

// ================= WALLET FETCH =================
fetch(`/api/wallet/${userId}`)
  .then(res => res.json())
  .then(data => {
    if (document.getElementById("wallet")) {
      document.getElementById("wallet").innerText =
        `💰 ₹${data.wallet_balance}`;
    }
  })
  .catch(err => console.error("Wallet fetch error:", err));

// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ================= SEARCH FLIGHTS =================
function searchFlights() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  document.getElementById("loading").style.display = "block";

  fetch(`/api/flights?from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("loading").style.display = "none";
      const container = document.getElementById("flightsContainer");
      container.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>No flights found.</p>";
        return;
      }

      data.forEach(flight => {
        const card = document.createElement("div");
        card.className = "flight-card";

        card.innerHTML = `
          <h3>${flight.airline}</h3>
          <p><strong>Flight ID:</strong> ${flight.flight_id}</p>
          <p><strong>Route:</strong> ${flight.departure_city} → ${flight.arrival_city}</p>
          <p>
            <strong>Price:</strong> ₹${flight.current_price}
            ${flight.current_price > flight.base_price ? "<span style='color:red;'> 🔥 Surge</span>" : ""}
          </p>
          <button class="book-btn" onclick="bookFlight('${flight.flight_id}')">
            Book Now
          </button>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      document.getElementById("loading").style.display = "none";
      console.error(err);
      alert("Failed to fetch flights");
    });
}

// ================= BOOK FLIGHT =================
function bookFlight(flightId) {
  const passenger = prompt("Enter passenger name:");
  if (!passenger) return;

  fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      passenger_name: passenger,
      flight_id: flightId
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Booking successful!\nPNR: ${data.booking.pnr}`);
        location.reload(); // 🔄 Refresh wallet + UI
      }
    })
    .catch(err => {
      console.error(err);
      alert("Booking failed");
    });
}
