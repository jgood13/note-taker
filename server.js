const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3030

app.use(express.urlencoded({extended: true}))
app.use (express.json())

app.use(express.static('./Develop/public'))