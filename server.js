// require express, api 
// wildcard route -> page if user  not using link route
// heroku
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const Notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

// app.use statements
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
// data for json notes
app.get('/api/notes' , (req, res)=>{
    res.json(Notes);
});
// read file from html
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/notes.html'))
});
// wild card read index.html
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// this function should create new tasks
function createNewTasks(body, taskArray){
    const newTask = body;
    body.id = uuidv4();
    taskArray.push(body);
    console.log('data', body, taskArray)
    fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(taskArray));
    return taskArray;
}
app.post('/api/notes', (req, res) =>{
    const newTask = createNewTasks(req.body, Notes);
    res.json(newTask);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteIdToDelete = req.params.id;
    const noteIndex = notes.findIndex((note) => note.id === noteIdToDelete);
    if (noteIndex === -1) {
      // erro return 404 Not Found
      return res.status(404).json({ error: 'Note not found' });
    }
    // Remove the note from the notes array
    notes.splice(noteIndex, 1);
    // Update the db.json file with the updated notes array
    fs.writeFile(
      './db/db.json',
      JSON.stringify(notes, null, 4),
      (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).json({ error: 'Error when adding notes.' });
        }
        console.info('Note deleted.');
        return res.json(notes);
      }
    );
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


















