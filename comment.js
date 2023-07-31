//Create a web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
//Set up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Set up the express app to use the public folder
app.use(express.static('public'));
//Get the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
//Get the index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
//Get the notes from the db.json file
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});
//Post the notes to the db.json file
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), err => {
            if (err) throw err;
            res.json(notes);
        });
    });
});
//Delete the notes from the db.json file
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== id);
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(newNotes), err => {
            if (err) throw err;
            res.json(newNotes);
        });
    });
});
//Start the server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));