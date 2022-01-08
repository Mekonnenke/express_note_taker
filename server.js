const express = require('express');
const path = require('path');
const fs = require('fs');




const app = express();
const PORT = process.env.PORT || 5000;
const mainDir = path.join(__dirname, "/public")


app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.get("/", function(req, res) {
//     //res.sendFile(path.join(__dirname, 'public', 'notes.html'));
//     res.sendFile(path.join(mainDir, 'notes.html'));
// });



//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/notes', require('./routes/notes'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
});

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
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
});


//listner 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

