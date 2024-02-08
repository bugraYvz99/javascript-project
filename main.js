function logout() {
  // Remove userEmail and userPassword from localStorage
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");

  // Redirect to the login page
  window.location.hash = "#/login";
}
