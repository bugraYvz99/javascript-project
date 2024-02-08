// auth.js
console.log("WORK");

function submitFunc() {
  console.log("work");
  // Get form inputs
  const email = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;
  console.log(email);

  // Save to localStorage
  localStorage.setItem("userEmail", email);

  localStorage.setItem("userPassword", password);

  // Redirect to home page
  window.location.hash = "#/home";
}

// Check if user is already logged in
window.addEventListener("DOMContentLoaded", () => {
  const userEmail = localStorage.getItem("userEmail");

  const userPassword = localStorage.getItem("userPassword");

  if (userEmail && userPassword) {
    // Redirect to home page
    window.location.hash = "#/home";
  }
});

// Prevent going back to the login page if already logged in
window.addEventListener("hashchange", () => {
  const userEmail = localStorage.getItem("userEmail");
  const userPassword = localStorage.getItem("userPassword");
  const currentHash = window.location.hash;

  if (userEmail && userPassword && currentHash.includes("login")) {
    // Redirect to home page
    window.location.hash = "#/home";
  }
});
