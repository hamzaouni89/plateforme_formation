var passport = require('passport')
const BearerStrategy = require("passport-http-bearer");
const jwt = require('jsonwebtoken')
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');

// Load User model
const User = require('../model/users');
var Candidat = require('../model/candidats')
var Coach = require('../model/coachs');
var Admin = require('../model/admin');
var secret = "KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2"

passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,secret, function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        User.findOne({ _id: decoded._id }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));

// passport.use(new BearerStrategy(
//   function(token, done) {
//     jwt.verify(token,secret, function(err,decoded){
//       if(err){
//           return done(err);
//       }
//       if(decoded){
//         console.log(decoded)

//         Candidat.findOne({ _id: decoded.data._id }, function (err, candidat) {
//           if (err) { return done(err); }
//           if (!candidat) { return done(null, false); }
//           return done(null, true);
//         });
//       }
//   })
//   }
// ));

// passport.use(new BearerStrategy(
//   function(token, done) {
//     jwt.verify(token,secret, function(err,decoded){
//       if(err){
//           return done(err);
//       }
//       if(decoded){
//         console.log(decoded)

//         Coach.findOne({ _id: decoded.data._id }, function (err, coach) {
//           if (err) { return done(err); }
//           if (!coach) { return done(null, false); }
//           return done(null, true);
//         });
//       }
//   })
//   }
// ));


// passport.use(new BearerStrategy(
//   function(token, done) {
//     jwt.verify(token,secret, function(err,decoded){
//       if(err){
//           return done(err);
//       }
//       if(decoded){
//         console.log(decoded)

//         Admin.findOne({ _id: decoded.data._id }, function (err, admin) {
//           if (err) { return done(err); }
//           if (!admin) { return done(null, false); }
//           return done(null, true);
//         });
//       }
//   })
//   }
// ));



// module.exports = function (passport) {
//   passport.use('local',
//     new LocalStrategy({
//       usernameField: 'email',
//       passwordField: 'password'
//     }, (email, password, done) => {
//       // Match user
//       User.findOne({
//           email: email
//         }),
//         function (err, user) {
//           if (err) {
//             return done(err)
//           }
//           if (!user) {
//             return done(null, false, {
//               message: 'That email is not registered'
//             });
//           }
//           // Match password
//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//               return done(null, user);
//             } else {
//               return done(null, false, {
//                 message: 'Password incorrect'
//               });
//             }
//           });
//         }
//     })

//   );

//   passport.serializeUser(function (user, done) {
//     done(null, user._id);
//   });

//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
// };