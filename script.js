const API_URL = "https://secure-password-manager-backend.onrender.com/api";

async function login() {
  const password = document.getElementById("masterInput").value;

  const res = await fetch(`${API_URL}/checkMaster`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ password })
  });

  const text = await res.text();
  if (text.trim() === "valid") {
    document.getElementById("dashboard").style.display = "block";
  } else {
    alert("Invalid master password!");
  }
}

async function addPassword() {
  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ website, username, password })
  });

  alert("Password added successfully!");
}

async function searchPassword() {
  const q = document.getElementById("search").value;

  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}`);
  const text = await res.text();

  document.getElementById("result").innerHTML = text
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => `<p>${line}</p>`)
    .join("");
}
