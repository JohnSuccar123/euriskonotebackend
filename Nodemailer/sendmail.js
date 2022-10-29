var nodemailer = require('nodemailer')
const user = require('../Models/UserModel')


var sendmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'johnny.h.succar@gmail.com',
        pass: 'pass123'
    },
    tls: {
        rejectUnauthorized: false
    }
})

var mail = {
    from: '"Welcome to the Notes App !" <johnny.h.succar@gmail.com>',
    to: user.email,
    subject: 'Greetings',
    html: `<h3> Greetings, this is the notes App where you can create 
    ,delete, edit, and read notes including grouping them by categories</h3>
    `
      

}

module.exports = {sendmail, mail}