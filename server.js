
// Dependencies
const express = require('express')
const path = require('path')
const fs = require('fs')
const randomId = require('random-id')
const db = require('./db/db.json')

// setting up express app to be used
const app = express()

// setting a local host port
const PORT = process.env.PORT || 3001


app.use(express.urlencoded({extended: true}))
app.use (express.json())


app.use(express.static('./public'))

// setting up get requests for the two pages html
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Loading the notes in the DB
app.get('/api/notes', (req, res) =>{
  res.json(db)
})

// Post request to create new information
app.post('/api/notes', (req,res) =>{
  const note = req.body
  note.id = randomId(10, 'aA0')
  db.push(note)

  fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>{
    if (err) {
      return console.log(err)
    } 
  })
  res.json(note)
})

//  Delete request to delete information
app.delete('/api/notes/:id', (req,res) =>{
  for (let i=0; i<db.length;i++){
    if( req.params.id == db[i].id){
      return db.splice(i,1)
    }
  }
  fs.writeFile(('./db/db.json', JSON.stringify(db), (err) => {
    if (err) throw (err)
    res.json(db)
  }))
  })

app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);