var express = require('express')
var router = express.Router();
var Test = require('../model/test')
var authenAdmin = require('./auth').authenAdmin;
var authenCoach = require('./auth').authenCoach;
var authentification = require('./auth').authentification;


router.post('/addTest', function (req, res, next) {
    var test = new Test({
        titre : req.body.titre,
        descreption : req.body.titre,
        dure : req.body.dure,
        type : req.body.type,
        niveau : req.body.niveau,
        questions: req.body.questions,   
    });
    test.save(function (err, test) {
        if (err) {
            res.send(err)
        } else {
            res.send(test)
        }
    })
})
router.get('/getTest', function (req, res, next) {
    Test.find().exec(function (err, test) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(test)
        }
    })
})

router.get('/getTest/:id', function (req, res, next) {
    var id = req.params.id
    test.findById(id).exec(function (err, test) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(test)
        }
    })
})

router.get('/deleteTest/:id', function (req, res, next) {
    var id = req.params.id

    Test.findByIdAndRemove(id).exec(function (err, Test) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(Test)
        }
    })
})


router.post('/updateTest/:id', function (req, res, next) {
       
    var id = req.params.id
    Test.findByIdAndUpdate({ "_id": id }, { $set: {  titre : req.body.titre,
        descreption : req.body.titre,
        dure : req.body.dure,
        type : req.body.type,
        niveau : req.body.niveau,
        questions: req.body.questions } }).exec(function (err, test) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(test)
        }
    })
}) 

module.exports = router;