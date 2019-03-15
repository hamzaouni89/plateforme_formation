var mongoose = require('mongoose')

var candidatsSchema = new mongoose.Schema({

    nom:  String,
    prenom: String,
    age : Number,
    niveau : Number,
    tel : Number,
    etats :  {
        type: String,
        enum: ['Accepter', 'En attente' , 'Refuser'],
        default: 'En attente'
      },
    status : {
        type: String,
        enum: ['Payée', 'Non Payée'],
        default: 'Non Payée'
      },
  
})
module.exports = mongoose.model('Candidats', candidatsSchema)