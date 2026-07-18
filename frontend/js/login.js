const API_URL = "https://quick-notes-api.onrender.com";
// Theme Toggle
const themeButton = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light Mode";
}

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeButton.textContent = "☀️ Light Mode";
    }

    else {

        localStorage.setItem("theme", "light");

        themeButton.textContent = "🌙 Dark Mode";
    }
});

// ==========================
// SIGN UP
// ==========================

const signupBtn = document.querySelector(".sign-up-btn");

if (signupBtn) {

    signupBtn.addEventListener("click", async () => {

        const username =
            document.getElementById("nameId").value.trim();

        const password =
            document.getElementById("pwdId").value.trim();

        const confirmation =
            document.getElementById("confirm-pwd").value.trim();

        if (!username || !password || !confirmation) {
            alert("Please fill all fields!");
            return;
        }

        if (password !== confirmation) {
            alert("Passwords do not match.");
            document.getElementById("pwdId").value = "";
            document.getElementById("confirm-pwd").value = "";
            return;
        }

        // Disable button while request is in progress
        signupBtn.disabled = true;
        signupBtn.textContent = "Creating Account...";

        let response;

        try {

            response = await fetch(`${API_URL}/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })

            });

        }
        catch (error) {

            alert("Unable to connect to the server.");
            return;

        }
        finally {

            signupBtn.disabled = false;
            signupBtn.textContent = "Sign Up";

        }

        if (!response.ok) {
            alert("Server error.");
            return;
        }

        const result = await response.json();

        alert(result.message);

        if (result.success) {

            window.location.href = "index.html";

        }

    });

}

// ==========================
// LOGIN
// ==========================

const loginButton = document.querySelector(".login-btn");

if (loginButton) {

    loginButton.addEventListener("click", async () => {

        const username =
            document.getElementById("nameId").value.trim();

        const password =
            document.getElementById("pwdId").value.trim();

        // Disable button
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
        let response;

        try {

            response = await fetch(`${API_URL}/login`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            });

        }
        catch (error) {

            alert("Unable to connect to the server.");
            return;

        }
        finally {

            loginButton.disabled = false;
            loginButton.textContent = "Login";

        }

        if (!response.ok) {
            alert("Server error.");
            return;
        }

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.username);

        window.location.href = "app.html";
    });
}