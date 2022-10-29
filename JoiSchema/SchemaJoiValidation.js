const { allow } = require('@hapi/joi')
const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
})

const noteJoiSchema = Joi.object({
    subject: Joi.string().max(500).min(8).required(),
    material: Joi.string().min(2).required(),
    comments: Joi.string().max(300).required(),
    tag: Joi.string().required(),
  
    

})

const categoryJoiSchema = Joi.object({
    name: Joi.string().max(50).min(3).required()
})



module.exports = {
    authSchema, noteJoiSchema, categoryJoiSchema
}