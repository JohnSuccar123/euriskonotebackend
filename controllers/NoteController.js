
const Note = require('../Models/NoteModel')
const { noteJoiSchema } = require('../JoiSchema/SchemaJoiValidation')


const CreateNote = async (req, res, next) => {
    try{
        var Notemessage = "Note Successfully created for the user!"
        const { error } = noteJoiSchema.validate(req.body)
        if(error) {
            res.status(400).json({
                message: error.details[0].message
            })
        }
        else {
            let mynote = new Note({
                subject: req.body.subject,
                material: req.body.material,
                comments: req.body.comments,
                tag: req.body.tag,
                
            }) 
            let note = await Note.findOne({subject: req.body.subject})
            if(note) {
                res.status(400).json({
                    message: "Note already exists"
                })
            }
            else {
                mynote.save()    
                res.send({Notemessage, mynote})  
            }
        }
    }
    catch(error) {
        res.status(420).json({
        message: "Unable to create a note"
        })
    }
    
}

const ViewNotes = async (req, res, next) => 
    {
        try {
            const response = await Note.find()
            if(response.length === 0) {
                res.json({
                    message: "No Notes Found, please create note"
                })
            } else {
                res.json({
                    response
                })
            }
        } catch (error) {
            res.status(424).json({
                message: "Error, unable to View the Notes"
                })
                
            }
        }
    

   
        const UpdateNotes = async (req, res, next) => {
            var updatemessage = "The Note has been successfully Updated Here are the details :)  "
            try{
                
                let noteID = req.body.noteID
                let DataUpdate = {
                    subject: req.body.subject,
                    material: req.body.material,
                    comments: req.body.comments,
                    tag: req.body.tag,
    
                }
    
                const updatednotes = await Note.findByIdAndUpdate(noteID, {$set: DataUpdate})
                const viewnotess = await Note.findById(noteID)
                res.json({updatemessage, viewnotess})
            } catch (error) {
                res.status(500).json({
                    message: 'Error in Updating the Note',
                })
                
            }
        }
    const DeleteNote = async (req, res, next) => {
        try {
            let noteID = req.body.noteID;
            await Note.findByIdAndRemove(noteID);
            res.json({
                message: 'Note Deleted Successfully'
            })
        } catch (error) {
           
                res.status(428).json({
                    message: 'Error Updating the Notes',
            })
        }
        }

    

module.exports = { CreateNote, ViewNotes, UpdateNotes, DeleteNote}