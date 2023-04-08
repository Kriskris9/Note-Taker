const fs = require('fs');
const db = require('./db/db.json');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const uniqid = require('uniqid');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
});


app.post('/api/notes', (req, res) => {

    let newNote = req.body;
    let newID = uniqid();

    newNote.id = newID;

    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbFile = JSON.parse(data);
        dbFile.push(newNote);
        //  write to the file

        fs.writeFile('./db/db.json', JSON.stringify(dbFile), (err) => {
            if(err) throw err;
            console.log('note saved')
        })
    })
    
    res.redirect('/notes');
});


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

