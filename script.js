const notesContainer = document.getElementById('notes');
const noteInput = document.getElementById('noteInput');
const draftsContainer = document.getElementById('draftsContainer');
let draftList = [];
let isNoteSaved = true;

function handleNewNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!isNoteSaved && (title.trim() || content.trim())) {
        if (confirm("You have unsaved changes. Do you want to save this note as a draft?")) {
            saveDraft();
        }
    }
    showNoteInput();
}

function showNoteInput() {
    noteInput.classList.add('active');
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    isNoteSaved = false;
}

function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title.trim() && content.trim()) {
        const note = document.createElement('div');
        note.classList.add('note');

        note.innerHTML = `
            <h2>${title}</h2>
            <p>${content}</p>
            <div class="actions">
                <button class="edit" onclick="editNote(this)">Edit</button>
                <button class="delete" onclick="deleteNote(this)">Delete</button>
            </div>
        `;

        notesContainer.appendChild(note);
        noteInput.classList.remove('active');
        isNoteSaved = true;
    }
}

function saveDraft() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title.trim() || content.trim()) {
        const draft = { title, content };
        draftList.push(draft);
        renderDrafts();
        noteInput.classList.remove('active');
        isNoteSaved = true;
    }
}

function renderDrafts() {
    draftsContainer.innerHTML = '<h2>Drafts</h2>';

    draftList.forEach((draft, index) => {
        const draftDiv = document.createElement('div');
        draftDiv.classList.add('draft');

        draftDiv.innerHTML = `
            <h3>${draft.title || 'Untitled Draft'}</h3>
            <button onclick="editDraft(${index})">Edit</button>
        `;

        draftsContainer.appendChild(draftDiv);
    });
}

function editDraft(index) {
    const draft = draftList[index];

    document.getElementById('title').value = draft.title;
    document.getElementById('content').value = draft.content;

    draftList.splice(index, 1);
    renderDrafts();
    noteInput.classList.add('active');
    isNoteSaved = false;
}

function deleteNote(button) {
    const note = button.parentElement.parentElement;
    notesContainer.removeChild(note);
}

function editNote(button) {
    const note = button.parentElement.parentElement;
    const title = note.querySelector('h2').innerText;
    const content = note.querySelector('p').innerText;

    document.getElementById('title').value = title;
    document.getElementById('content').value = content;

    notesContainer.removeChild(note);
    noteInput.classList.add('active');
    isNoteSaved = false;
}