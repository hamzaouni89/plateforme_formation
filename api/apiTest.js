var express = require('express')
var router = express.Router();
var Test = require('../model/test')
var passport = require('passport');

router.post('/addTest', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var test = new Test({
        titre : req.body.titre,
        descreption : req.body.descreption,
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
router.get('/getTest', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Test.find().exec(function (err, test) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(test)
        }
    })
})


router.get('/getTestByNiveau/:niveau', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var niveau = req.params.niveau
    Test.find({niveau : niveau}).exec(function (err, test) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(test)
        }
    })
})

router.get('/deleteTest/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
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


router.post('/updateTest/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
       
    var id = req.params.id
    Test.findByIdAndUpdate({ "_id": id }, { $set: { 
         titre : req.body.titre,
        descreption : req.body.descreption,
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