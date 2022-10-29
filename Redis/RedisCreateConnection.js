const redis = require('redis')

const NotesAppRedis = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
})

NotesAppRedis.on('connect', () => {
  console.log('Notes app connected to Redis')
})

NotesAppRedis.on('error', (err) => {
  console.log("An error occurred trying to connect to Redis")
  
})

NotesAppRedis.on('end', () => {
  console.log('You have disconnected from Redis')
})

process.on('SIGINT', () => {
    NotesAppRedis.quit()
})

module.exports = NotesAppRedis