var express = require('express');
var Test = require('../model/test');
var router = express.Router();


router.post('/addTest', function (req, res, next) {
    console.log(req.body);
    var test = new Test({
        question: req.body.question,
        reponse: req.body.reponse,
        // note: req.body.note,
        resultat: req.body.resultat,
        //  owner: req.body.owner

    });
    console.log(req.body)
    test.save(function (err, test) {
        if (err) {
            res.send(err)
        } else {
            res.send(test)
        }
    })
})



module.exports = router;
