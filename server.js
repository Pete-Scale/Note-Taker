const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let notesArray = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Note Taker server is working!');
});

/**
 * HTML ROUTES
 */
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

/**
 * API ROUTES
 */
// show all saved notes
app.get("/api/notes", (req, res) => {
    res.json(notesArray);
});

// app.post("/api/notes", (req, res) => {
//     const newNote = req.body;
//     newNote.id = notesArray.length + 1;
//     noteArray.push(newNote);
//     console.log(notesArray);
//     res.status(200).send();
// });



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
