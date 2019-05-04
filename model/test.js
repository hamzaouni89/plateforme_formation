var mongoose = require('mongoose')

var testSchema = new mongoose.Schema({
    titre : String,
    descreption : String,
    niveau:  Number,
    dure : Number,
    questions : [{question : String, choix1 : String,choix2 : String,choix3 : String,choix4 : String, reponse: String}],
    type: {
        type: String,
        enum: ['HTML5', 'JavaScript','Bootstrap', 'Angular 7', 'Node JS','J2EE'],
        default: 'HTML5'
      },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    candidat: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidats' }

})
module.exports = mongoose.model('Test', testSchema)