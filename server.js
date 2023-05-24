//import express.js
const express = require('express');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;

//import builit-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

//initialize an instance of express.js
const app = express();

//specify on which port the epxress.js server will run
const PORT = process.env.PORT || 3001;

// TODO: Implement middleware for the parsing of JSON data
// TODO: Implement middleware for parsing of URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/api/notes', (req, res) => {
    fsPromises.readFile('db/db.json', 'utf8')
    .then(data => res.json(JSON.parse(data)));
    // res.json(db);
})



app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    console.log(`${req.method} request received`)

    if(req.body) {
        response = {
                title,
                text,
                id: uuidv4()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const dbData = JSON.parse(data);
                dbData.push(response);

                fs.writeFile('./db/db.json', JSON.stringify(dbData, null, "\t"), (writeErr) => {
                    writeErr
                        ? console.error(writeErr)
                        : res.status(201).json(response)
                })
            }
        })
        // res.json(db);
    } else {
        res.status(400).json('Request body cannot be empty');
    }
    
})

//listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => {
    console.log(`NoteTaker app listening at http://localhost:${PORT}`)
});