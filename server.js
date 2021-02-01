const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Note Taker server is working!');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
