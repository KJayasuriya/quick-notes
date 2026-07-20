
const API_URL = "https://notex-api-4e3s.onrender.com";
// DOM ELEMENTS


let editingId = null;

const noteForm = document.getElementById("note-form");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".save-btn");
const cancelButton = document.querySelector(".cancel-btn");
const notesContainer = document.querySelector(".notes-container");
const emptyDialog = document.getElementById("empty-notes");
const titleInput = document.getElementById("titleId");
const notesInput = document.getElementById("notesId");

const searchForm = document.querySelector("form");

// AUTH CHECK

const token = localStorage.getItem("token");
const currentUser = localStorage.getItem("username");

if (!token || !currentUser) {
    window.location.href = "index.html";
}

const greeting = document.getElementById("greeting");
greeting.innerText = `Hi, ${currentUser} 👋...`;



function getHeaders(json = false) {

    const headers = {
        Authorization: `Bearer ${token}`
    };

    if (json) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
}
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


let notes = [];

// RENDER NOTES


function renderNotes(notesList = notes) {

    notesContainer.innerHTML = "";

    if (!notesList.length) {
        emptyDialog.style.display = "block";
        addButton.style.display = "none";
        searchForm.style.display = "none";
        return;
    }

    emptyDialog.style.display = "none";
    addButton.style.display = "block";
    searchForm.style.display = "flex";
    notesList.forEach(note => {
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
        <h4 class="notes-date">
            Last Edited: ${new Date(note.updated_at).toLocaleString()}
        </h4>`;
        // DELETE NOTE    
        const deleteBtn = noteCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", async () => {
            await deleteNote(note.id);
        });
        // EDIT NOTE    
        const editBtn = noteCard.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            editingId = note.id;
            titleInput.value = note.title;
            notesInput.value = note.content;
            noteForm.showModal();
        });
        notesContainer.appendChild(noteCard);
    });
}


// OPEN DIALOG


addButton.addEventListener("click", () => {
    editingId = null;
    titleInput.value = "";
    notesInput.value = "";
    noteForm.showModal();
});
const createButton = document.querySelector(".first-create-btn");
createButton.addEventListener("click", () => {
    editingId = null;
    titleInput.value = "";
    notesInput.value = "";
    noteForm.showModal();
})

// CLOSE DIALOG


cancelButton.addEventListener("click", () => {
    noteForm.close();
});


// SAVE NOTE


saveButton.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const content = notesInput.value.trim();
    if (!title || !content) {
        alert("Please enter notes!");
        return;
    }

    // EDIT EXISTING NOTE
    if (editingId !== null) {
        await updateNote(
            editingId,
            title,
            content
        );
    }
    else {
        await createNote(
            title,
            content
        );
    }
    titleInput.value = "";
    notesInput.value = "";
    editingId = null;
});


// SEARCH NOTES

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {

    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        renderNotes();
        return;
    }

    const filteredNotes = notes.filter(note =>

        note.title.toLowerCase().includes(query) ||

        note.content.toLowerCase().includes(query)

    );

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = "";
        emptyDialog.style.display = "none";

        const noResults = document.createElement("h2");
        noResults.classList.add("no-results");
        noResults.textContent = `No results for "${query}"`;

        notesContainer.appendChild(noResults);
        return;
    }
    renderNotes(filteredNotes);

});
// INITIAL RENDER
window.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});
// API Functions
async function loadNotes() {
    let response;
    try {
        response = await fetch(`${API_URL}/notes`, {
            headers: getHeaders()
        });
    }
    catch (error) {
        alert("Cannot connect to the server. Please check your internet connection or try again later.");
        return;
    }
    if (response.status === 401) {
        logout();
        return;
    }
    const data = await response.json();

    notes = data.notes;

    renderNotes();

}
async function createNote(title, content) {

    let response;
    try {
        response = await fetch(`${API_URL}/notes`, {

            method: "POST",

            headers: getHeaders(true),

            body: JSON.stringify({
                title,
                content
            })
        });
    } catch (error) {
        alert("Cannot connect to the server. Please check your internet connection or try again later.");
        return;
    }

    if (response.status === 401) {
        logout();
        return;
    }
    if (!response.ok) {
        alert("Unable to save note.");
        return;
    }
    await loadNotes();

    noteForm.close();
}
async function updateNote(id, title, content) {

    let response;
    try {
        response = await fetch(`${API_URL}/notes/${id}`, {

            method: "PUT",

            headers: getHeaders(true),

            body: JSON.stringify({
                title,
                content
            })
        });
    } catch (error) {
        alert("Cannot connect to the server. Please check your internet connection or try again later.");
        return;
    }

    if (response.status === 401) {
        logout();
        return;
    }
    if (!response.ok) {
        alert("Unable to update note.");
        return;
    }
    await loadNotes();

    noteForm.close();
}
async function deleteNote(id) {
    let response;
    try {
        response = await fetch(`${API_URL}/notes/${id}`, {

            method: "DELETE",

            headers: getHeaders()
        });
    } catch (error) {
        alert("Cannot connect to the server. Please check your internet connection or try again later.");
        return;
    }

    if (response.status === 401) {
        logout();
        return;
    }
    if (!response.ok) {
        alert("Unable to delete note.");
        return;
    }
    await loadNotes();
}
// Preloader
window.addEventListener("load", () => {
    const loader = document.getElementById("preloader");
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 500);
});

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.href = "index.html";

}