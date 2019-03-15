var mongoose = require('mongoose')

var testSchema = new mongoose.Schema({
    titre: String,
    contenue:  String,
    note : Number,
    niveau : Number,
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  
})
module.exports = mongoose.model('test', testSchema)