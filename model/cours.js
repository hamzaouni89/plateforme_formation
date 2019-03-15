var mongoose = require('mongoose')

var coursSchema = new mongoose.Schema({

    titre: String,
    contenue:  String,
    image : String,
    niveau : Number,
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'Coachs' }
  
})
module.exports = mongoose.model('Cours', coursSchema)