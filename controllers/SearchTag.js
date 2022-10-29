
const Note = require('../Models/NoteModel')


const SearchTag = async (req, res, next) => {
    const tag = req.body.tag
    try {
        const notes = await Note.find({ tag: { $in: [tag]}})
        res.json(notes)
    } catch (err) {
        res.status(500).json(err)
    }
}
    


    module.exports = { SearchTag }