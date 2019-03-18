
var express = require('express')
var app = express()
var db = require('./database/db')
var users = require('./api/apiUser')
var test = require('./api/apiTest')
//var cours = require('./api/apiCours')

var cors = require('cors');
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/users', users)
app.use('/test', test)
// app.use('/cours', cours)

app.listen(3000, (err => {
    if (err) throw err;
    console.log('server is running on port 3000')
}))