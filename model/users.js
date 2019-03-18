var mongoose = require('mongoose')
var valid = require('validator')


var usersSchema = new mongoose.Schema({

    email: {

        type: String,
        Required: true, trim: true, minlength: 1, unique: true,
    
        validate: {
          validator: valid.isEmail,
          message: '{VALUE} is not a valid email'
        }
      },
      role: {
        type: String,
        enum: ['Admin', 'Coach', 'Candidat'],
        default: 'Candidat'
      },
      password: { type: String, Required: true, minlength: 8 },
      admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      candidat: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidats' },
      coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coachs' }


  
})
module.exports = mongoose.model('Users', usersSchema)