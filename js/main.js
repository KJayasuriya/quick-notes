

// DOM ELEMENTS


let editIndex = null;

const noteForm = document.getElementById("note-form");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".save-btn");
const cancelButton = document.querySelector(".cancel-btn");
const notesContainer = document.querySelector(".notes-container");
const emptyDialog = document.getElementById("empty-notes");
const titleInput = document.getElementById("titleId");
const notesInput = document.getElementById("notesId");

const searchBar = document.querySelector("form");

// AUTH CHECK


const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}
const greeting = document.getElementById("greeting");
greeting.innerText = `Hi, ${currentUser} 👋...`;

// THEME TOGGLE


const themeButton = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode"); themeButton.textContent = "☀️ Light Mode";
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark"); themeButton.textContent = "☀️ Light Mode";
    }
    else {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "🌙 Dark Mode";
    }
});


// NOTES DATABASE


let notesDB = JSON.parse(localStorage.getItem("notesDB")) || {};

// Create user notes array if not existing

if (!notesDB[currentUser]) {
    notesDB[currentUser] = [];
}


// SAVE DATABASE


function saveDatabase() {
    localStorage.setItem("notesDB", JSON.stringify(notesDB));
}


// RENDER NOTES


function renderNotes(notesList = notesDB[currentUser]) {

    notesContainer.innerHTML = "";

    if (!notesList.length) {
        emptyDialog.style.display = "block";
        addButton.style.display = "none";
        searchBar.style.display = "none";
        return;
    }

    emptyDialog.style.display = "none";
    addButton.style.display = "block";
    searchBar.style.display = "flex";
    notesList.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("notes-card");
        noteCard.innerHTML = `        
        <div class="notes-top">
            <h2>${note.title}</h2>
            <button class="edit-btn">✏️ Edit</button>
            <button class="delete-btn"></button>
        </div>
        <pre>${note.content}</pre>  
        <hr>  
        <h4 class="notes-date">Last Edited: ${note.date}</h4>`;
        // DELETE NOTE    
        const deleteBtn = noteCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            notesDB[currentUser].splice(index, 1);
            saveDatabase();
            renderNotes();
        });
        // EDIT NOTE    
        const editBtn = noteCard.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            editIndex = index;
            titleInput.value = note.title;
            notesInput.value = note.content;
            noteForm.showModal();
        });
        notesContainer.appendChild(noteCard);
    });
}


// OPEN DIALOG


addButton.addEventListener("click", () => {
    editIndex = null;
    titleInput.value = "";
    notesInput.value = "";
    noteForm.showModal();
});
const createButton = document.querySelector(".first-create-btn");
createButton.addEventListener("click", () => {
    editIndex = null;
    titleInput.value = "";
    notesInput.value = "";
    noteForm.showModal();
})

// CLOSE DIALOG


cancelButton.addEventListener("click", () => {
    noteForm.close();
});


// SAVE NOTE


saveButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = notesInput.value.trim();
    if (!title || !content) {
        alert("Please enter notes!");
        return;
    }
    const noteData = {
        title: title,
        content: content,
        date: new Date().toLocaleString()
    };
    // EDIT EXISTING NOTE
    if (editIndex !== null) {
        notesDB[currentUser][editIndex] = noteData;
        editIndex = null;
    }
    // CREATE NEW NOTE
    else {
        notesDB[currentUser].push(noteData);
    }
    saveDatabase();
    renderNotes();
    titleInput.value = "";
    notesInput.value = "";
    noteForm.close();
});


// SEARCH NOTES

const searchInput = document.getElementById("search-input");
const searchForm = document.querySelector("form");

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    // Empty search -> show all notes
    if (query === "") {
        renderNotes();
        return;
    }

    const filteredNotes = notesDB[currentUser].filter(note =>

        note.title.toLowerCase().includes(query) ||

        note.content.toLowerCase().includes(query)

    );

    renderNotes(filteredNotes);

    if (filteredNotes.length === 0) {
        alert("No matching notes found!");
    }

});
searchInput.addEventListener("input", () => {

    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        renderNotes();
        return;
    }

    const filteredNotes = notesDB[currentUser].filter(note =>

        note.title.toLowerCase().includes(query) ||

        note.content.toLowerCase().includes(query)

    );

    renderNotes(filteredNotes);

});
// INITIAL RENDER


renderNotes();

// Preloader
window.addEventListener("load", () => {
    const loader = document.getElementById("preloader");
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 500);
});