//import express.js
const express = require('express');
const db = require('./db/db.json');

//import builit-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

//initialize an instance of express.js
const app = express();

//specify on which port the epxress.js server will run
const PORT = process.env.PORT || 3001;

//static middleware pointing to the public folder
app.use(express.static('public'));

//create express.js routes for default '/', '/send' and '/routes/ endpoints
// app.get('/', (req, res) => res.send('navigate to /send or /routes'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirnmae, 'public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/db', (req, res) => {
    res.json(db);
})

//listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => {
    console.log(`NoteTaker app listening at http://loclahost:${PORT}`)
});