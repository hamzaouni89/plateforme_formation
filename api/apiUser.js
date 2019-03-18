var express = require('express');
var bcrypt = require('bcrypt')

var Coach = require('../model/coachs');
var router = express.Router()

const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2'



router.post('/addCoach', function (req, res) {
    Coach.findOne({
        email: req.body.email
    })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
                    var newCoach = new Coach({
                        email: req.body.email,
                        nom: req.body.nom,
                        Tel: req.body.Tel,
                        DateNais: req.body.DateNais,
                        prenom: req.body.prenom,
                        role: req.body.role,
                        password: bcryptedPassword
                    });
                    newCoach.save().then(function (newCoach) {
                        res.status(201).send({
                            '_id': newCoach._id
                        })
                    })
                        .catch(function (err) {
                            res.status(500).send(err)

                        })
                })

            } else {
                res.status(409).send({
                    'error': 'Coach already exsit'
                })
            }

        })
        .catch(function (err) {
            res.status(500).send({
                'error': 'unable to verify Coach'
            })
        });
})
module.exports = router;
