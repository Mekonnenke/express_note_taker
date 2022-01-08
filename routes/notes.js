const express = require('express');
const router = express.Router();
const notes = require('./Notes')

router.get("/routes/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

router.get("/routes/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    if(savedNotes){
        res.json(savedNotes[Number(req.params.id)]);
    }
    else{
        res.status(400).json({msg: `Note is not found.${req.params.id}`})
    }
   
});


module.exports = router;