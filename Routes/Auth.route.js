const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/Auth.controller')

router.post('/register', AuthController.NoteAppRegisterUser )

router.post('/login', AuthController.NoteAppUserLogin )

router.delete('/logout', AuthController.NoteAppUserLogout)




module.exports = router