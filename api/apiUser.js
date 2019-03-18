var express = require('express');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../model/users')
var Candidats = require('../model/candidats')
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

router.post('/registerCandidat', function (req, res) {
    Candidats.findOne({
        email: req.body.email
    })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
                    var newCandidat = new Candidats({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        tel: req.body.tel,
                        age: req.body.age,
                        niveau: req.body.niveau,
                        etat: req.body.etat,
                        status: req.body.status
                    });
                    newCandidat.save().then(function () {
                        Candidats.findById(newCandidat._id).exec(function (err, cand) {
                            console.log(cand)
                            var newUser = new User({
                                email: req.body.email,
                                candidat: cand._id,
                                password: bcryptedPassword,
                            });
                            newUser.save().then(function (newUser) {
                                res.status(201).send({
                                    'message': "Candidat ajoutée",
                                    '_id': newUser._id
                                })
                                console.log("ok");
                            })
                        })
                    })
                        .catch(function (err) {
                            res.status(500).send(err)
                        })
                })
            } else {
                res.status(409).send({
                    'error': 'user already exsit'
                })
            }
        })
        .catch(function (err) {
            res.status(500).send({
                'error': 'unable to verify user'
            })
        });
})


router.get('/getuser/:id', function (req, res, next) {
    var id = req.params.id
    Candidats.findById(id).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})

router.post('/login', function (req, res) {
    var password = req.body.password
    var email = req.body.email
    if (password == null || email == null) {
        res.status(400).send({
            'error': 'missing parametres'
        })
    }
    Candidats.findOne({
        "email": email
    }).exec(function (err, userfound) {
        if (userfound) {
            bcrypt.compare(password, userfound.password, function (err, resBycrypt) {
                if (resBycrypt) {

                    const token = jwt.sign({
                        '_id': userfound._id,
                        'email': userfound.email,
                        'nom': userfound.nom,
                        'prenom': userfound.prenom,
                        'age': userfound.age,
                        'tel': userfound.tel,
                        'niveau': userfound.niveau,
                        'etat': userfound.etat,
                        'status': userfound.status,
                    },
                        JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        });
                    res.status(200).send({
                        Message: 'authentification valide',
                        token: token
                    })

                } else {
                    res.status(403).send({
                        'error': 'invalid password'
                    })
                }

            });
        } else {
            res.status(404).send({
                'error': 'user not exist in DB'
            })
        }

    })

});

router.get('/logout', function (req, res) {
    req.logOut()
    req.session.destroy()

})

router.post('/addCandidats/:id', function (req, res, next) {

    Candidats.updateOne({
        "_id": req.params.id
    }, {
            $set: {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
                tel: req.body.tel,
                niveau: req.body.niveau,
                status: req.body.status,
                etat: req.body.etat,
            }
        }).exec(function (err, user) {
            if (err) {
                res.send(err)
            } else {
                res.send(user)
            }
        })
})



router.post('/updateUser/:id', function (req, res, next) {

    var id = req.params.id


    Candidats.findByIdAndUpdate({
        "_id": id
    }, {
            $set: {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                tel: req.body.tel,
                age: req.body.age,
                niveau: req.body.niveau,
                status: req.body.status,
                etat: req.body.etat,
            }
        }).exec(function (err, user) {
            if (err) {
                res.send(err)

            } else {


                User.findById(id).exec(function (err, user) {

                    const token = jwt.sign({
                        _id: user._id,
                        email: user.email,
                        nom: user.nom,
                        prenom: user.prenom,
                        age: user.age,
                        etat: req.body.etat,
                        tel: req.body.tel,
                        niveau: req.body.niveau,
                        status: req.body.status,

                    },
                        JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        });
                    res.status(200).send({
                        Message: 'Update token ',
                        token: token,
                    })
                })
            }
        })
})

module.exports = router;
