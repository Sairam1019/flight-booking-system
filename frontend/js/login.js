function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
      } else {
        // Save user session
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.name);

        alert("Login successful");
        window.location.href = "index.html";
      }
    });
}
