var express = require('express')
var router = express.Router();
var Quiz = require('../model/quiz')
var passport = require('passport');

router.post('/addQuiz',passport.authenticate('bearer', { session: false }), function (req, res, next) {
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
router.get('/getQuiz',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Quiz.find().exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
})

router.get('/getQuiz/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
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

router.get('/deleteTest/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
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


router.post('/updateQuiz/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
       
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

router.get('/getQuizByNiveau/:niveau', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var niveau = req.params.niveau
    Quiz.findOne({niveau : niveau}).exec(function (err, quiz) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(quiz)
        }
    })
})

module.exports = router;