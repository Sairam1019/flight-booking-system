// ================= AUTH CHECK =================
const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");


if (!userId) {
  window.location.href = "/login";
}

// ================= USERNAME =================
const usernameEl = document.getElementById("username");
if (usernameEl && userName) {
  usernameEl.innerText = userName;
}

const welcomeEl = document.getElementById("welcomeName");
if (welcomeEl && userName) {
  welcomeEl.innerText = userName;
}

// ================= PROFILE DROPDOWN =================
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (!menu) return;
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  const dropdown = document.querySelector(".profile-dropdown");
  const menu = document.getElementById("profileMenu");
  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.style.display = "none";
  }
});

// ================= WALLET =================
function loadWallet() {
  fetch(`/api/wallet/${userId}`)
    .then(res => res.json())
    .then(data => {
      const walletEl = document.getElementById("wallet");
      if (walletEl) {
        walletEl.innerText = `💰 Wallet: ₹${data.wallet_balance}`;
      }
    })
    .catch(err => console.error("Wallet fetch error:", err));
}

loadWallet();

// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  window.location.href = "/login";
}

// ================= SEARCH FLIGHTS =================
function searchFlights() {
  const from = document.getElementById("from")?.value.trim();
  const to = document.getElementById("to")?.value.trim();

  if (!from || !to) {
    alert("Please enter both From and To cities");
    return;
  }

  document.getElementById("loading").style.display = "block";

  fetch(`/api/flights?from=${from}&to=${to}`)
    .then(res => res.json())
    .then(flights => {
      document.getElementById("loading").style.display = "none";
      const container = document.getElementById("flightsContainer");
      container.innerHTML = "";

      if (!Array.isArray(flights) || flights.length === 0) {
        container.innerHTML = "<p>No flights found.</p>";
        return;
      }

      flights.forEach(flight => {
        const surge =
          flight.current_price > flight.base_price
            ? `<span style="color:red;font-weight:bold;"> 🔥 Surge</span>`
            : "";

        container.innerHTML += `
          <div class="flight-card">
            <h3>${flight.airline}</h3>
            <p>${flight.departure_city} → ${flight.arrival_city}</p>
            <p>Price: ₹${flight.current_price} ${surge}</p>
            <button class="book-btn"
              onclick="bookFlight('${flight.flight_id}')">
              Book Now
            </button>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById("loading").style.display = "none";
      alert("Failed to load flights");
    });
}

// ================= BOOK FLIGHT =================
function bookFlight(flight_id) {
  const passenger = prompt("Enter passenger name:");
  if (!passenger) return;

  fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      passenger_name: passenger,
      flight_id
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Booking successful!\nPNR: ${data.booking.pnr}`);
        loadWallet(); // ✅ refresh wallet after booking
      }
    })
    .catch(err => {
      console.error(err);
      alert("Booking failed");
    });
}
