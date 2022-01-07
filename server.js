const express = require('express');
const path = require('path');
const fs = require('fs');




const app = express();
const PORT = process.env.PORT || 5000;
const mainDir = path.join(__dirname, "/public")



app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, 'public', 'notes.html'));
    res.sendFile(path.join(mainDir, 'notes.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

