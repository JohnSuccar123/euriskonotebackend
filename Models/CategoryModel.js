const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    CreationDate: {
        type: Date,
        default: Date.now(),
    },
    
    // linkcategory: {                        In case we need the category, this is how we link it to the NoteModel    
    //    type: Schema.Types.ObjectId,
    //    ref:'Mycategorylist',
    //    required: true,
    //  },


    
}, {timestamps: true})










const Mycategorylist = mongoose.model('Mycategorylist', categorySchema);
module.exports = Mycategorylist;