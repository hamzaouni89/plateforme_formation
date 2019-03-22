var mongoose = require('mongoose')

var quizSchema = new mongoose.Schema({
    question: String,
    choix1 : String,
    choix2 : String,
    choix3 : String,
    choix4 : String,
    reponse: String,
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' } ,

})
module.exports = mongoose.model('Quiz', quizSchema)