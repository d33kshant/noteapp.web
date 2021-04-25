let titleInput = document.getElementById("titleInput");
let noteInput = document.getElementById("noteInput");

showNotes();

function showNotes() {
  let allNotes = localStorage.getItem("notes");
  let container = document.getElementById("notes");
  let notes;
  let cards = "";
  if (allNotes == null) {
    notes = [];
  } else {
    notes = JSON.parse(allNotes);
  }

  notes.forEach((element, index) => {
    cards += `<div class="card m-3">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.note}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
        </div>
    </div>`;
  });

  if (notes.length == 0) {
    container.innerHTML = `<div class="alert alert-primary text-center m-3" role="alert">
        Nothing to show here, Try adding some notes.
    </div>`;
  }else{
    container.innerHTML = cards;
  }
}

document.getElementById("add").addEventListener("click", function addNote() {
  let note = noteInput.value;
  if (note != "") {
    let title = titleInput.value;
    let notes;

    if (title == "") {
      title = "Untitled";
    }

    let allNotes = localStorage.getItem("notes");
    let newNote = {
      title: title,
      note: note,
    };
    if (allNotes == null) {
      notes = [];
    } else {
      notes = JSON.parse(allNotes);
    }
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    titleInput.value = noteInput.value = "";
    showNotes();
  }
});

document.getElementById("clear").addEventListener("click", function () {
  let clear = confirm("Clear all of your notes ?");
  if (clear) {
    localStorage.clear();
    showNotes();
  }
});

function deleteNote(index) {
    let allNotes =localStorage.getItem("notes");
    let notes;
    if(allNotes == null){
        notes = []
    }else{
        notes = JSON.parse(allNotes);
    }
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}