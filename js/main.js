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
// Elements
const noOfNotes = 0;
const noteForm = document.getElementById("note-form");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".save-btn");
const cancelButton = document.querySelector(".cancel-btn");
const notesContainer = document.querySelector(".notes-container");

//Empty notes situation

/* Object to store the notes */
const notesArr = [{
    title: "",
    date: "",
    notes: ""
}];

localStorage.getItem("notes",);
// Open dialog
addButton.addEventListener("click", () => {
    noteForm.showModal();
});
// Close dialog
cancelButton.addEventListener("click", () => {
    noteForm.close();
});
// Save note
saveButton.addEventListener("click", () => {
    const title = document.getElementById("titleId").value;
    const content = document.getElementById("notesId").value;
    if (title === "" || content === "") {
        alert("Please enter notes!");
        return;
    }
    const noteCard = document.createElement("div");
    const currentDate = new Date().toLocaleString();
    noteCard.classList.add("notes-card");
    noteCard.innerHTML = `
        <div class="notes-top">
            <h2>${title}</h2>
            <button class="edit-btn">✏️ Edit</button>
            <button class="delete-btn"></button>
        </div>
        <h4 class = "notes-date">Saved DateTime: ${currentDate}</h4>
        <p>${content}</p>
    `;
    notesContainer.appendChild(noteCard);
    // Delete logic
    const deleteBtn = noteCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        noteCard.remove();
    });

    // Clear inputs
    document.getElementById("titleId").value = "";
    document.getElementById("notesId").value = "";
    // Close dialog
    noteForm.close();


    /* Edit Feature */
    const editButton = document.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        noteForm.showModal();
        const newTitle = document.getElementById("titleId").value;
        const newNotes = document.getElementById("notesId").value;
        noteCard.innerHTML = `
        <div class="notes-top">
            <h2>${newTitle}</h2>
            <button class="edit-btn">✏️ Edit</button>
            <button class="delete-btn"></button>
        </div>
        <h4>Saved DateTime: ${currentDate}</h4>
        <p>${newNotes}</p>
    `;
    });

});
