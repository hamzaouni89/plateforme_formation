var express = require('express')
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const Cours = require('../model/cours')

router.post('/upload', upload.single("contenue"), function (req, res, next) {
})
router.get('/getContenue/:name',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    res.sendFile('C:/Users/houni/OneDrive/Bureau/Formation/Niveau4/Projet/uploads/' + req.params.name);
    
})
router.post('/addCours',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var cours = new Cours({
        titre: req.body.titre,
        descreption: req.body.descreption,
        contenue: req.body.contenue,
        type: req.body.type,
        //owner: req.params.id,
        date: new Date(),
        niveau: req.body.niveau

    });
    cours.save(function (err, cours) {
        if (err) {
            res.send(err)
        } else {
            res.send(cours)
        }
    })
})
router.get('/getCours',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Cours.find().populate('owner').exec(function (err, cours) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(cours)
        }
    })
})

router.get('/getCoursByNiveau/:niveau', passport.authenticate('bearer', { session: false }),function (req, res, next) {
    Cours.find({"niveau" :  req.params.niveau}).exec(function (err, cours) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(cours)
        }
    })
})

router.post('/validerCours/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Cours.findByIdAndUpdate({
        "_id": ObjectId(id)
    }, {
        $set: {
            status: 'Valider',
        }
    }).exec(function (err, cours) {
        if (err) {
            res.send(err)
        } else {
            res.send(cours)
        }
    })
})
router.get('/deleteCours/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id

    Cours.findByIdAndRemove(id).exec(function (err, cours) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(cours)
        }
    })
})

router.post('/updateCours/:id',passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var id = req.params.id
    Cours.findByIdAndUpdate({ "_id": id }, { $set: { titre: req.body.titre, descreption: req.body.descreption, contenue: req.body.contenue, type: req.body.type, image: req.body.image, date: new Date(), niveau: req.body.niveau } }).exec(function (err, cours) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(cours)
        }
    })
})
module.exports = router;