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
let editIndex = null;
const noOfNotes = 0;
const noteForm = document.getElementById("note-form");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".save-btn");
const cancelButton = document.querySelector(".cancel-btn");
const notesContainer = document.querySelector(".notes-container");
const titleInput = document.getElementById("titleId");
const notesInput = document.getElementById("notesId");
//Empty notes situation

/* Object to store the notes */
const notes = JSON.parse(localStorage.getItem("notes")) || [];

/* Rendering the notes from stored object to webpage */
function renderNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("notes-card");
        noteCard.innerHTML = `
        <div class="notes-top">
            <h2>${note.title}</h2>
            <button class="edit-btn">✏️ Edit</button>
            <button class="delete-btn"></button>
        </div>
        <h4 class = "notes-date">Saved DateTime: ${note.date}</h4>
        <p>${note.content}</p>
        `;


        /* DELETE */
        noteCard.querySelector(".delete-btn").addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        /* EDIT */
        noteCard.querySelector(".edit-btn").addEventListener("click", () => {
            editIndex = index;
            titleInput.value = note.title;
            notesInput.value = note.content;
            noteForm.showModel();
        });
        notesContainer.appendChild(noteCard);
    });
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
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

    const title = titleInput.value.trim();
    const content = notesInput.value.trim();

    if (!title || !content) {
        alert("Please enter notes!");
        return;
    }

    const noteData = {
        title,
        content,
        date: new Date().toLocaleString()
    };

    /* EDIT EXISTING NOTE */
    if (editIndex !== null) {

        notes[editIndex] = noteData;

        editIndex = null;
    }

    /* CREATE NEW NOTE */
    else {
        notes.push(noteData);
    }

    saveNotes();

    renderNotes();

    titleInput.value = "";
    notesInput.value = "";

    noteForm.close();
});
renderNotes();