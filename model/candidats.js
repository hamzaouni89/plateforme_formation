var mongoose = require('mongoose')

var candidatsSchema = new mongoose.Schema({

    nom:  String,
    prenom: String,
    age : Number,
    niveau : Number,
    tel : Number,
    etat :  {
        type: String,
        enum: ['Accepter', 'En attente' , 'Refuser'],
        default: 'En attente'
      },
    status : {
        type: String,
        enum: ['Payée', 'Non Payée'],
        default: 'Non Payée'
      },
    marks: { type: Number, default: '0' },
    notes: [{ niveau: Number, note : Number }]
  
})
module.exports = mongoose.model('Candidats', candidatsSchema)