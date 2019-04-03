
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var db = require('./database/db')
var users = require('./api/apiUser')
var test = require('./api/apiTest')
var cours = require('./api/apiCours')
var quiz = require('./api/apiQuiz')
const passport = require('passport');
var cors = require('cors');



// Passport Config
require('./api/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/users', users)
app.use('/test', test)
app.use('/cours', cours)
app.use('/quiz', quiz)
app.listen(3000, (err => {
    if (err) throw err;
    console.log('server is running on port 3000')
}))