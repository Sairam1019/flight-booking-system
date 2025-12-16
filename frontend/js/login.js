
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        return;
      }

      // ✅ CORRECT KEYS
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);

      alert("Login successful");
      window.location.href = "/home";
    })
    .catch(err => {
      console.error(err);
      alert("Login failed");
    });
}
