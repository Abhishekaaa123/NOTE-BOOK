 const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage when the page loads
function showNote() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNote();

// Update localStorage whenever notes are modified
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

 // Event listener for creating a new note
createBtn.addEventListener("click", () => {
    const inputBox = document.createElement('div'); // Changed <p> to <div>
    const img = document.createElement('img');
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "del1.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage(); // Call updateStorage after adding a new note
});

// Event listener for deleting notes and updating storage
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Event listener for updating storage when notes are edited
notesContainer.addEventListener("input", function() {
    updateStorage();
});

// Event listener for handling Enter key to insert line breaks
notesContainer.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        event.preventDefault();
    }
});
