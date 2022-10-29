const mongoose = require('mongoose')
const Schema = mongoose.Schema


const NoteSchema = new Schema({

   subject: {
    type: String,
    required: true,
   },

   material: {
    type: String,

   },

   comments: {
    type: String,
   },

  
  
   DateOfCreation: {
    type: Date,
    default: Date.now(),
},

    tag: {
    type: String,
    required: true,
    
}

// linkcategory: {                     This is the reference into the CategoryModel in case we need it.
    //    type: Schema.Types.ObjectId,
    //    ref:'Mycategorylist',
    //    required: true,
    //  },

}, {timestamps: true})



const Note = mongoose.model('note', NoteSchema)

module.exports = Note

   




