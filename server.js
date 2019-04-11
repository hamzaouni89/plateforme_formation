
var express = require('express')
var bodyParser = require('body-parser')

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var db = require('./database/db')
var users = require('./api/apiUser')
var test = require('./api/apiTest')
var cours = require('./api/apiCours')
var quiz = require('./api/apiQuiz')
const passport = require('passport');
var cors = require('cors');
var app = express()



// Passport Config
//require('./api/passport')(passport);
// var session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// app.use(session({
//   name:'dev.sid',
//   resave:false,
//   saveUninitialized:false,
//   secret:'secret',
//   cookie:{
//     maxAge:36000000,
//     httpOnly:false,
//     secure:false
//   },
  //store: new MongoStore({ mongooseConnection: db.connection })
// }));
require('./api/passport');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
//app.use(cookieParser());
app.use('/users', users)
app.use('/test', test)
app.use('/cours', cours)
app.use('/quiz', quiz)
app.listen(3000, (err => {
    if (err) throw err;
    console.log('server is running on port 3000')
}))