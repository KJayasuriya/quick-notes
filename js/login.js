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

    signupBtn.addEventListener("click", () => {

        const username = document.getElementById("nameId").value.trim();

        const password = document.getElementById("pwdId").value.trim();
        const confirmation = document.getElementById("confirm-pwd").value.trim();
        if (!username || !password || !confirmation) {
            alert("Please fill all fields!");
            return;
        }
        if (confirmation != password) {
            document.getElementById("confirm-pwd").value = "";

            alert("Password doesn't match!");
            return;
        }
        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user =>
            user.username === username
        );

        if (userExists) {

            alert("Username already exists!");

            return;
        }

        users.push({
            username,
            password
        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Signed up successfully!");

        window.location.href = "index.html";
    });
}


// ==========================
// LOGIN
// ==========================

const loginButton = document.querySelector(".login-btn");

if (loginButton) {

    loginButton.addEventListener("click", () => {

        const username =
            document.getElementById("nameId").value.trim();

        const password =
            document.getElementById("pwdId").value.trim();

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        console.log(users);

        const validUser = users.find(user =>
            user.username === username &&
            user.password === password
        );

        if (!validUser) {

            alert("Invalid credentials!");

            return;
        }

        localStorage.setItem(
            "currentUser",
            username
        );
        document.getElementById("nameId").value = "";
        document.getElementById("pwdId").value = "";
        window.location.href = "app.html";
    });
}
