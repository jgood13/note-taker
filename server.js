const express = require('express')
const path = require('path')
const fs = require('fs')
const randomId = require('random-id')
const len = 10
const pattern = 'aA0'

const app = express()
const PORT = 3001

app.use(express.urlencoded({extended: true}))
app.use (express.json())
// middleware
app.use(express.static('./Develop/public'))


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/db/db.json'));
});

app.post('/notes', function(req,res){
  let db = fs.readFile('./Develop/db/db.json')
  db =JSON.parse(db)
  res.json(db)
  let 

})


app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);