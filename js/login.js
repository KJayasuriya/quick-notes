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