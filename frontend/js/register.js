function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message && data.message !== "Account created successfully") {
        alert(data.message);
        return;
      }

      alert("Registration successful! Please login.");
      window.location.href = "/login";
    })
    .catch(err => {
      console.error("Register error:", err);
      alert("Registration failed");
    });
}