const express = require('express');
const path = require('path');
const fs = require('fs');




const app = express();
const PORT = process.env.PORT || 5000;
const mainDir = path.join(__dirname, '/public')

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());





app.get("/notes", (req, res) => {
    res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(mainDir, "index.html"));
});

app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Thank you for sending content! Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
});

function validateNotes(notes) {
    if (!notes.title || typeof notes.title !== 'string') {
      return false;
    }
    if (!notes.text || typeof notes.text !== 'string') {
      return false;
    }
    if (!notes.id || typeof notes.id !== 'string') {
      return false;
    }
    if (!notes.content || !Array.isArray(notes.content)) {
      return false;
    }
    return true;
  }

app.delete("/api/notes/:id",(req, res) =>{
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})


//listner 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

