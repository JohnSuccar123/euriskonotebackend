const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./MongoDBConnect/CreateMongoDBConnection')
const AuthRoute = require('./Routes/Auth.route')

const NoteRoute = require('./Routes/NoteRoute')

const CategoryRoute = require('./Routes/CategoryRoute')

const { verifyAccessToken} = require('./Tokens/VerifyAccessToken')
require('./Redis/RedisCreateConnection')



const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', verifyAccessToken, async(req, res, next) =>{
res.send("Welcome to Notes program")
})

app.use('/validation', AuthRoute)

app.use('/note', NoteRoute )

app.use('/category', CategoryRoute)



app.use(async (req, res, next) => {
  
   next(createError.NotFound('This route does not exist'))
})



app.use((err, req, res, next) => {
   res.status(err.status || 500)
   res.send({
       error: {
           status: err.status || 500,
           message: err.message
       }
   })
})
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

