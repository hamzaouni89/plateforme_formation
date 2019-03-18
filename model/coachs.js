var mongoose = require('mongoose')

var coachsSchema = new mongoose.Schema({

    nom: String,
    prenom: String,
    tel: Number,
    niveau: Number

})
module.exports = mongoose.model('Coachs', coachsSchema)