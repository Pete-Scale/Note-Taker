const fs = require('fs');
const noteArray = require('../db/db.json');

module.exports = app => {
    app.get("/api/notes", (req, res) => {
        res.json(noteArray);
    });
    
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        newNote.id = noteArray.length + 1;
        noteArray.push(newNote);
        updateDB();
        res.status(200).send();
    });
    
    function updateDB() {
        let jsonNotes = JSON.stringify(noteArray);
        fs.writeFile('./db/db.json', jsonNotes, err => {
            if (err) {
                return console.log(err);
            }
            console.log(noteArray);
        });
    }
}