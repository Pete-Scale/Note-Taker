const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        fs.readFile(path.join(__dirname , '../db/db.json'), 'utf8', (err, jsonNotes) => {
            if (err) throw err;
            let noteArray = JSON.parse(jsonNotes);
            res.json(noteArray);
        });
    });
    
    app.post('/api/notes', (req, res) => {
        fs.readFile(path.join(__dirname , '../db/db.json'), 'utf8', (err, jsonNotes) => {
            if (err) throw err;
            const newNote = req.body;
            let noteArray = JSON.parse(jsonNotes);
            newNote.id = uuidv4();
            noteArray.push(newNote);
            updateDB(noteArray);
            res.json(JSON.stringify(noteArray));
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile(path.join(__dirname , '../db/db.json'), 'utf8', (err, jsonNotes) => {
            if (err) throw err;
            let noteArray = JSON.parse(jsonNotes);
            let noteID = req.params.id
            const index = noteArray.findIndex(note => {
            return (noteID === note.id);
            });  
            noteArray.splice(index, 1);
            updateDB(noteArray);
            res.json(JSON.stringify(noteArray));
        });
    });
    
    function updateDB(notes) {
        let jsonNotes = JSON.stringify(notes);
        fs.writeFile(path.join(__dirname , '../db/db.json'), jsonNotes, err => {
            if (err) throw err;
        });
    }
}