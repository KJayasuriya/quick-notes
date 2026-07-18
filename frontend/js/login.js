console.log(localStorage.getItem("users"));
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
            return;
        }

        const response = await fetch(
            "http://127.0.0.1:8000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

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

        const response = await fetch(
            "http://127.0.0.1:8000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const result = await response.json();

        if (!result.success) {

            alert(result.message);

            return;

        }

        localStorage.setItem(
            "token",
            result.token
        );

        localStorage.setItem(
            "username",
            result.user.username
        );

        window.location.href = "app.html";

    });

}