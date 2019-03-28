var mongoose = require('mongoose')

var coursSchema = new mongoose.Schema({

    titre: String,
    descreption : String,
    contenue:  String,
    niveau : Number,
    type: {
        type: String,
        enum: ['HTML5', 'Bootstrap', 'JQuery', 'Node JS', 'Angular 7' , 'J2EE', 'Symfony'],
        default: 'HTML5'
      },
    date : String,
   owner : { type: mongoose.Schema.Types.ObjectId, ref: 'Coachs' }
  
})
module.exports = mongoose.model('Cours', coursSchema)