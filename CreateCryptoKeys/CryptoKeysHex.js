const crypto = require('crypto')

const key1 = crypto.randomBytes(32).toString('hex')

console.table({key1})



//This is what I used to generate for the authentication for the Notes app
