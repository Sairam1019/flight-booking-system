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

// ================= PROFILE DROPDOWN =================
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = document.querySelector(".profile-dropdown");
  const menu = document.getElementById("profileMenu");

  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.style.display = "none";
  }
});

// ================= WALLET =================
const walletEl = document.getElementById("wallet");

if (walletEl) {
  fetch(`/api/wallet/${userId}`)
    .then(res => res.json())
    .then(data => {
      walletEl.innerText = `💰 Wallet: ₹${data.wallet_balance}`;
    })
    .catch(err => console.error("Wallet error:", err));
}

// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  window.location.href = "/login";
}

// ================= BOOKING HISTORY =================
const container = document.getElementById("bookingContainer");

if (container) {
  fetch(`/api/bookings/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <h3>No bookings yet ✈️</h3>
            <p>Book a flight to see your history here.</p>
          </div>
        `;
        return;
      }

      data.forEach(booking => {
        const card = document.createElement("div");
        card.className = "booking-card";

        card.innerHTML = `
          <h3>${booking.airline}</h3>
          <p><strong>Flight ID:</strong> ${booking.flight_id}</p>
          <p><strong>Route:</strong> ${booking.route}</p>
          <p><strong>PNR:</strong> ${booking.pnr}</p>
          <p><strong>Amount Paid:</strong> ₹${booking.amount_paid}</p>
          <p><strong>Date:</strong> ${new Date(booking.booking_time).toLocaleString()}</p>
          <a class="download-btn" href="/api/ticket/${booking.pnr}">
            Download Ticket
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Booking fetch error:", err);
      container.innerHTML = "<p>Error loading booking history.</p>";
    });
}
