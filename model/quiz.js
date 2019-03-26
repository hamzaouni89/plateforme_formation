var mongoose = require('mongoose')

var quizSchema = new mongoose.Schema({

    titre : String,
    descreption : String,
    niveau:  Number,
    dure : Number,
    questions : [{question : String, choix1 : String,choix2 : String,choix3 : String,choix4 : String, reponse: String}],
    type: {
        type: String,
        enum: ['HTML5', 'Bootstrap', 'JQuery', 'Node JS', 'Angular 7' , 'J2EE', 'Symfony'],
        default: 'HTML5'
      },
    coath: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' } ,

})
module.exports = mongoose.model('Quiz', quizSchema)