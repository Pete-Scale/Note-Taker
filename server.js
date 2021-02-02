const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let notesArray = require('./db/db.json');

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



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
