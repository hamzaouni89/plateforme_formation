var express = require('express');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../model/users')
var Candidats = require('../model/candidats')
var Coachs = require('../model/coachs');
var Admin = require('../model/admin');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var ObjectId = mongoose.Types.ObjectId;


const JWT_SIGN_SECRET = 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2'

router.post('/addCoach', passport.authenticate('bearer', { session: false }), function (req, res) {
    Coachs.findOne({
            email: req.body.email
        })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
                    var newCoach = new Coachs({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        tel: req.body.tel,
                        niveau: req.body.niveau,
                    });
                    newCoach.save().then(function () {
                            Coachs.findById(newCoach._id).exec(function (err, coach) {
                                var newUser = new User({
                                    email: req.body.email,
                                    coach: coach._id,
                                    role: "Coach",
                                    password: bcryptedPassword,
                                });
                                newUser.save().then(function (newUser) {
                                    res.status(201).send({
                                        'message': "Coach ajoutée",
                                        '_id': newUser._id
                                    })
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
router.post('/addAdmin',passport.authenticate('bearer', { session: false }), function (req, res) {
    Admin.findOne({
            email: req.body.email
        })
        .then(function (userfound) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
                    var newAdmin = new Admin({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        
                    });
                    newAdmin.save().then(function () {
                            Admin.findById(newAdmin._id).exec(function (err, admin) {
                                var newUser = new User({
                                    email: req.body.email,
                                    admin: admin._id,
                                    role : "Admin",
                                    password: bcryptedPassword,
                                });
                                newUser.save().then(function (newUser) {
                                    res.status(201).send({
                                        'message': "Admin ajoutée",
                                        '_id': newUser._id
                                    })
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
router.get('/getCoach', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Coachs.find().populate('owner').exec(function (err, coachs) {
        if (err) {
            res.send(err)
        } else {
            res.send(coachs)
        }
    })
})

router.get('/getCandidat',passport.authenticate('bearer', { session: false }),  function (req, res, next) {
    Candidats.find().populate('owner').exec(function (err, candidats) {
        if (err) {
            res.send(err)
        } else {
            res.send(candidats)
        }
    })
})

router.get('/getUser', function (req, res, next) {
    User.find().populate('owner').exec(function (err, users) {
        if (err) {
            res.send(err)
        } else {
            res.send(users)
        }
    })
})

router.get('/getCoachByUser/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    User.findOne({
        'coach': ObjectId(id)
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})

router.get('/getCandidatByUser/:id',passport.authenticate('bearer', { session: false }),  function (req, res, next) {
    var id = req.params.id
    User.findOne({
        'candidat': ObjectId(id)
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
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

router.post('/login', function (req, res, next) {
    var password = req.body.password
    var email = req.body.email
    if (password == null || email == null) {
        res.send({
            'error': 'missing parametres'
        })
    }
    User.findOne({
        email: email
    }).exec(function (err, userfound) {
        if (userfound) {
            bcrypt.compare(password, userfound.password, function (err, resBycrypt) {
                if (resBycrypt) {
                    if (userfound.role === "Candidat") {
                        Candidats.findOne({
                            _id: userfound.candidat
                        }).exec(function (err, cand) {
                            const token = jwt.sign({
                                '_id': userfound._id,
                                'email': userfound.email,
                                'role': userfound.role,
                                'nom' : cand.nom,
                                'prenom' : cand.prenom,
                                'age' : cand.age,
                                'niveau' : cand.niveau,
                                'tel' : cand.tel,
                                'status' : cand.status,
                                'marks' : cand.marks,
                                'notes' : cand.notes,
                                'etat':cand.etat,
                                'candidat': cand._id
                            },
                            JWT_SIGN_SECRET, {
                                expiresIn: '1h'
                            });                  
                        res.send({
                            Message: 'authentification valide',
                            token: token
                        })
                        })
                    }
                    else  if (userfound.role === "Coach") {
                        Coachs.findOne({
                            _id: userfound.coach
                        }).exec(function (err, coach) {
                            const token = jwt.sign({
                                '_id': userfound._id,
                                'email': userfound.email,
                                'role': userfound.role,
                                'nom' : coach.nom,
                                'prenom' : coach.prenom,
                                'niveau' : coach.niveau,
                                'tel' : coach.tel,
                                'coach': coach._id
                            },
                            JWT_SIGN_SECRET, {
                                expiresIn: '1h'
                            });                  
                        res.send({
                            Message: 'authentification valide',
                            token: token
                        })
                        })
                    }
                    else  if (userfound.role === "Admin") {
                        Admin.findOne({
                            _id: userfound.admin
                        }).exec(function (err, admin) {
                            const token = jwt.sign({
                                '_id': userfound._id,
                                'email': userfound.email,
                                'role': userfound.role,
                                'nom' : admin.nom,
                                'prenom' : admin.prenom,
                                'admin':admin._id
                             },
                            JWT_SIGN_SECRET, {
                                expiresIn: '1h'
                            });                  
                        res.send({
                            Message: 'authentification valide',
                            token: token
                        })
                        })
                    }
                } 
                else {
                    res.send({
                        'error': 'invalid password'
                    })
                }

            });
        } else {
            res.send({
                'error': 'user not exist in DB'
            })
        }

    })

});

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

router.post('/updateCoach/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Coachs.findByIdAndUpdate({
        "_id": ObjectId(id)
    }, {
        $set: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            tel: req.body.tel,
            niveau: req.body.niveau,
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)

        } else {

            User.findOneAndUpdate({
                coach: ObjectId(id)
            }, {
                $set: {
                    email: req.body.email,
                }
            }).exec(function (errr, user2) {
                if (errr) {
                    res.send(errr)
                } else {
                    res.send(user2)
                }
            })
            // User.findOne({
            //     coach: ObjectId(id)
            // }).exec(function (err, user2) {
            //     const token = jwt.sign({
            //             _id: user2._id,
            //             email: req.body.email,
            //             coach: user2.coach
            //         },
            //         JWT_SIGN_SECRET, {
            //             expiresIn: '1h'
            //         });
            //     res.status(200).send({
            //         Message: 'Update token ',
            //         token: token,
            //     })
            // })
        }
    })
})

router.get('/deleteCoach/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Coachs.findByIdAndRemove(ObjectId(id)).exec(function (err, coach) {
        if (err) {
            res.send(err)
        } else {
            User.findOneAndRemove({
                coach: ObjectId(id)
            }).exec(function (err, user) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(user)
                }
            })
        }
    })
})

router.get('/deleteCandidat/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Candidats.findByIdAndRemove(ObjectId(id)).exec(function (err) {
        if (err) {
            res.send(err)
        } else {
            User.findOneAndRemove({
                candidat: ObjectId(id)
            }).exec(function (err, user) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(user)
                }
            })
        }
    })
})

router.post('/updateCandidat/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Candidats.findByIdAndUpdate({
        "_id": ObjectId(id)
    }, {
        $set: {
            nom: req.body.nom,
            prenom: req.body.prenom,
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
            User.findOneAndUpdate({
                candidat: ObjectId(id)
            }, {
                $set: {
                    email: req.body.email,
                }
            }).exec(function (errr, user2) {
                if (errr) {
                    res.send(errr)
                } else {
                    res.send(user2)
                }
            })

        }
    })
})

router.post('/updateStatuCandidat/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Candidats.findByIdAndUpdate({
        "_id": ObjectId(id)
    }, {
        $set: {
            status: 'Payée',
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})
router.post('/sendMarks/:id/:marks', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    console.log(req.params);
    console.log("markes:",req.params.marks);
    
    Candidats.findByIdAndUpdate({
        "_id": ObjectId(req.params.id)
    }, {
        $set: {
            marks: req.params.marks,
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})

router.post('/sendNoteByNiveau/:id/:niveau/:note', passport.authenticate('bearer', { session: false }), function (req, res, next) {

    Candidats.findByIdAndUpdate({
        "_id": ObjectId(req.params.id)
    }, {
        $set: {
            notes: {niveau : req.params.niveau , note : req.params.note},
        }
    }).exec(function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})

router.get('/getCandidatById/:id', function (req, res, next) {
    User.findOne({candidat : req.params.id}).exec(function (err, user) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(user)
        }
    })
})

router.post('/sendMail/:id',passport.authenticate('bearer', { session: false }), function (req, res) {
    var id = req.params.id
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.nom} ${req.body.prenom} </li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.tel}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: req.body.email, // generated ethereal user
            pass: req.body.password // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    User.findOne({
        candidat: ObjectId(id)
    }).exec(function (err, user) {
        if (err) {
            res.send(err)

        } else {
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Dev Web Center" <req.body.email>', // sender address
                to: user.email, // list of receivers
                subject: req.body.subject, // Subject line
                text: 'Hello world?', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send(error);
                } else {
                    res.send({
                        'Email sent': info.response
                    });
                }
            });
        }
    })

});
// router.post('/updateUser/:id', function (req, res, next) {
//     var id = req.params.id
//     Candidats.findByIdAndUpdate({
//         "_id": id
//     }, {
//         $set: {
//             nom: req.body.nom,
//             prenom: req.body.prenom,
//             email: req.body.email,
//             tel: req.body.tel,
//             age: req.body.age,
//             niveau: req.body.niveau,
//             status: req.body.status,
//             etat: req.body.etat,
//         }
//     }).exec(function (err, user) {
//         if (err) {
//             res.send(err)

//         } else {


//             User.findById(id).exec(function (err, user) {

//                 const token = jwt.sign({
//                         _id: user._id,
//                         email: user.email,
//                         nom: user.nom,
//                         prenom: user.prenom,
//                         age: user.age,
//                         etat: req.body.etat,
//                         tel: req.body.tel,
//                         niveau: req.body.niveau,
//                         status: req.body.status,

//                     },
//                     JWT_SIGN_SECRET, {
//                         expiresIn: '1h'
//                     });
//                 res.status(200).send({
//                     Message: 'Update token ',
//                     token: token,
//                 })
//             })
//         }
//     })
// })

module.exports = router;