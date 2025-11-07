const API_URL = "https://secure-password-manager-backend.onrender.com/api";

async function login() {
  const password = document.getElementById("masterInput").value;
  const res = await fetch(`${API_URL}/checkMaster`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ password })
  });
  const data = await res.json();
  if (data.valid) {
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
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ website, username, password })
  });
  alert("Password added successfully!");
}

async function searchPassword() {
  const q = document.getElementById("search").value;
  const res = await fetch(`${API_URL}/search?q=${q}`);
  const data = await res.json();
  document.getElementById("result").innerHTML = data
    .map(d => `<p><b>${d.website}</b> — ${d.username}</p>`)
    .join("");
}
