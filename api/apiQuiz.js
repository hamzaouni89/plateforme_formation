var express = require('express')
var router = express.Router();
var Quiz = require('../model/quiz')
var authenAdmin = require('./auth').authenAdmin;
var authenCoach = require('./auth').authenCoach;
var authentification = require('./auth').authentification;


router.post('/addQuiz', function (req, res, next) {
    var quiz = new Quiz({
        question: req.body.question,
        choix1: req.body.choix1,
        choix2: req.body.choix2,
        choix3: req.body.choix3,
        choix4: req.body.choix4,
        reponse : req.body.reponse,
        test: req.body.test
    });
    console.log(req.body)
    quiz.save(function (err, quiz) {
        if (err) {
            res.send(err)
        } else {
            res.send(quiz)
        }
    })
})
router.get('/getQuiz',authentification, function (req, res, next) {
    Commentaire.find().exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
})

router.get('/getQuiz/:id', function (req, res, next) {
    var id = req.params.id
    Quiz.findById(id).exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
})

router.get('/deleteQuiz/:id', authentification, function (req, res, next) {
    var id = req.params.id

    Quiz.findByIdAndRemove(id).exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
})


router.post('/updateQuiz/:id', function (req, res, next) {
       
    var id = req.params.id
    Quiz.findByIdAndUpdate({ "_id": id }, { $set: { question: req.params.question, choix1: req.body.choix1,choix2: req.body.choix2, choix3: req.body.choix3, choix4: req.body.choix4 } }).exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
}) 

module.exports = router;