const createError = require('http-errors')
const User = require('../Models/UserModel')
const {authSchema } = require('../JoiSchema/SchemaJoiValidation')


const { signAccessToken } = require('../Tokens/SignAccessToken')

const { signRefreshToken } = require('../middleware/SignRefreshToken')

const { verifyAccessToken } = require('../Tokens/VerifyAccessToken')

const sendMailToUser = require('../Nodemailer/sendmail')




module.exports = {
    NoteAppRegisterUser: async(req, res, next) => {
        var SuccessRegisterMessage = "User has Successfully Registered ! Here are the details of his Access and Refresh Tokens: "

    
        try {
           
       
        const NoteRegisterUser = await authSchema.validateAsync(req.body)
        
         const EmailExists = await User.findOne({email: NoteRegisterUser.email})
         if (EmailExists) throw createError.Conflict(`This email in our Notes app is already registered ${NoteRegisterUser.email}`)
    
         const user = new User(NoteRegisterUser)
         const NoteUserSave = await user.save()
         const accessToken = await signAccessToken(NoteUserSave.id)
         const refreshToken = await signRefreshToken(NoteUserSave.id)
    
         res.send({SuccessRegisterMessage, accessToken, refreshToken, user})
    
         
        } catch (error){
            if(error.isJoi === true) error.status = 422
            next(error)
        }
    },

   NoteAppUserLogin:  async(req, res, next) => {
    

    try {
        var SuccessMessage = "User has been Logged in Successfully ! Here is the Access Token and Refresh Token:"
    
        const NoteLoginUser = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: NoteLoginUser.email})
    
        if(!user) throw createError.NotFound("User not registered")
    
        const isMatch = await user.isValidPassword(NoteLoginUser.password)
        if(!isMatch) throw createError.Unauthorized('Username/password not valid')
    
        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)
    
    
        res.send({SuccessMessage, accessToken, refreshToken, user})
      
    } catch(error){
        if(error.isJoi === true) return next(createError.BadRequest('You have provided an either incorrect email or password in our Notes App Login, try again :)'))
        next(error)
    }
},
    
     NoteAppUserLogout: async(req, res, next) => {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: result.email})
        
             
        try {
          
            const updatedUser = await User.findByIdAndUpdate(user.id, {accessToken: null}, {new: true})
            res.send('User has been Logged out')
        } catch(error){
            res.sendStatus(204)
            next(error)
        }
    },
    
    
    }
