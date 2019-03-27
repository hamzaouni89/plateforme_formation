var express = require('express')
var router = express.Router();
var Quiz = require('../model/quiz')
var authenAdmin = require('./auth').authenAdmin;
var authenCoach = require('./auth').authenCoach;
var authentification = require('./auth').authentification;


router.post('/addQuiz', function (req, res, next) {
    var quiz = new Quiz({
        titre : req.body.titre,
        descreption : req.body.titre,
        dure : req.body.dure,
        type : req.body.type,
        niveau : req.body.niveau,
        questions: req.body.questions,   
    });
    quiz.save(function (err, quiz) {
        if (err) {
            res.send(err)
        } else {
            res.send(quiz)
        }
    })
})
router.get('/getQuiz', function (req, res, next) {
    Quiz.find().exec(function (err, quiz) {
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

router.get('/deleteTest/:id', function (req, res, next) {
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
    Quiz.findByIdAndUpdate({ "_id": id }, { $set: {  titre : req.body.titre,
        descreption : req.body.titre,
        dure : req.body.dure,
        type : req.body.type,
        niveau : req.body.niveau,
        questions: req.body.questions } }).exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
}) 

module.exports = router;