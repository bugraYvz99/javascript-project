const contentDiv = document.getElementById("main-content");
const navbar = document.querySelector(".navbar");
const layout = document.querySelector(".layout");

window.addEventListener("DOMContentLoaded", () => {
  // Define a mapping of page names to their JavaScript files
  const pageScriptMapping = {
    home: "home.js",
    about: "about.js",
    contact: "contact.js",
    login: "auth.js",
    // Add more pages as needed
  };

  function renderPage(pageName) {
    // Check if the page is the login page
    const isLoginPage = pageName === "login";

    if (isLoginPage) {
      // Load the login page without the general layout
      loadLoginPage();

      hideElements();
      return;
    } else {
      const login = document.querySelector(".login-container");
      if (login) {
        login.remove();
      }
      showElements();
    }

    // For other pages, load them with the general layout
    fetch(`pages/${pageName}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error loading page: ${response.status} ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((html) => {
        console.log("then");
        contentDiv.innerHTML = html;

        // Load and execute the JavaScript file for the current page
        const scriptFile = pageScriptMapping[pageName];
        if (scriptFile) {
          loadScript(scriptFile);
        }
      })
      .catch((error) => {
        console.log("error");

        // Fetch error.html and render it
        fetch("pages/error.html")
          .then((response) => response.text())
          .then((errorHtml) => {
            contentDiv.innerHTML = errorHtml;
          })
          .catch((fetchError) => {
            console.error("Error loading error page:", fetchError);
          });
      });
  }

  function loadScript(scriptFile) {
    const script = document.createElement("script");
    script.src = scriptFile;
    script.async = true;
    document.body.appendChild(script);
  }

  function loadLoginPage() {
    // Load the login page without the general layout
    fetch("pages/login.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error loading login page: ${response.status} ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((html) => {
        console.log("then");
        // Create a container for the login page and append it to the body
        const loginContainer = document.createElement("div");
        loginContainer.classList.add("login-container");
        loginContainer.innerHTML = html;
        document.body.appendChild(loginContainer);

        // Load and execute the JavaScript file for the login page
        const scriptFile = pageScriptMapping.login;
        if (scriptFile) {
          loadScript(scriptFile);
        }
      })
      .catch((error) => {
        console.log("error");

        // Fetch error.html and render it
        fetch("pages/error.html")
          .then((response) => response.text())
          .then((errorHtml) => {
            contentDiv.innerHTML = errorHtml;
          })
          .catch((fetchError) => {
            console.error("Error loading error page:", fetchError);
          });
      });
  }

  function hideElements() {
    // Hide elements specific to other pages
    navbar.style.display = "none";
    layout.style.display = "none";
  }

  function showElements() {
    // Show elements when not on the login page
    navbar.style.display = "block";
    layout.style.display = "grid";
  }

  function handleNavigation() {
    const hash = window.location.hash;
    const pageName = hash.substring(2) || "home"; // Remove the '#' and get the page name or default to 'home'
    renderPage(pageName);
  }

  // Initial page load
  handleNavigation();

  // Listen for changes in the URL hash to handle navigation
  window.addEventListener("hashchange", handleNavigation);
});
