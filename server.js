// require express, api 
// wildcard route defaults to page if user  not using link route
// heroku
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const Notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
// this will put the data into the json
app.get('/api/notes' , (req, res)=>{
    res.json(Notes);
});
// will send file into the html
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/notes.html'))
});
// wild card
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// this function should create new tasks
function createNewTasks(body, taskArray){
    // const data = fs.readFileSync(path.join(__dirname, './db/db.json', 'utf8'))
    const newTask = body;
    // if(!Array.isArray(taskArray));
    // taskArray = [];
    // if (taskArray.length === 0)
    // taskArray.push(0);
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
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


















