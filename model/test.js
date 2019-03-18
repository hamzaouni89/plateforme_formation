var mongoose = require('mongoose')

var testSchema = new mongoose.Schema({
    question: String,
    reponse: String,
    //note: Number,
    resultat: Number,
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }

})
module.exports = mongoose.model('test', testSchema)