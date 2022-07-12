const express = require('express')
const path = require('path')
const fs = require('fs')
const randomId = require('random-id')
const len = 10
const pattern = 'aA0'
const db = require('./Develop/db/db.json')

const app = express()
const PORT = 3001

app.use(express.urlencoded({extended: true}))
app.use (express.json())
// middleware
app.use(express.static('./Develop/public'))

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


app.get('/api/notes', (req, res) =>{
  res.json(db)
})

app.post('/api/notes', (req,res) =>{
  const note = req.body
  note.id = randomId(len, pattern)
  db.push(note)

  fs.writeFile('./Develop/db/db.json', JSON.stringify(db), (err) =>{
    if (err) {
      return console.log(err)
    } 
  })
  res.json(note)
})

app.delete('/api/notes/:id', (req,res) =>{
  for (let i=0; i<db.length;i++){
    if( req.params.id == db[i].id){
      db.splice(i,1)
    }
  }
  fs.writeFile(('./Develop/db/db.json', JSON.stringify(db), (err) =>{
    if (err) {
      return console.log(err)
    }
    res.json(db)
  }))
})







app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);