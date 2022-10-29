const express = require('express')
const router = express.Router()
const NoteController = require('../controllers/NoteController')
const TagController = require('../controllers/SearchTag')

router.post('/create', NoteController.CreateNote)

router.post('/view', NoteController.ViewNotes)

router.post('/update', NoteController.UpdateNotes)

router.post('/delete', NoteController.DeleteNote )

router.post('/searchtag', TagController.SearchTag)





module.exports = router