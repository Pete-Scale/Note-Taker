const fs = require('fs');
const noteArray = require('../db/db.json');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        res.json(noteArray);
    });
    
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = noteArray.length;
        noteArray.push(newNote);
        updateDB();
        res.status(200).send();
    });

    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile(noteArray, 'utf8', (err, jsonNotes) => {
            if (err) throw err;
            let newNoteArray = JSON.parse(jsonNotes);
            let noteID = req.params.id 
            const index = newNoteArray.findIndexOf(note => {
            return noteID === note.id;
            });  
            newNoteArray.splice(index, 1);
            updateDB();
            res.json(JSON.stringify(noteArray));
        });
    });
    
    function updateDB() {
        let jsonNotes = JSON.stringify(noteArray);
        fs.writeFile('./db/db.json', jsonNotes, err => {
            if (err) throw err;
            console.log(noteArray);
        });
    }
}