const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      path       = require('path'),
      socket     = require('socket.io')
      mongo      = require('mongodb').MongoClient

// View Engine
app.set ('views', path.join(__dirname, 'views'))
app.set ('view engine', 'ejs')

// Body Parser Middleware
app.use (bodyParser.json())
app.use (bodyParser.urlencoded({ extended: false}))

// Set Static Path
app.use ('/assets', express.static(path.join(__dirname, 'public')))

// Routes
app.get ('/', (req, res) => {
  res.render ('index', { title: 'MongoChat' })
})

// Page not found error404
app.get ('/*', (req, res) => {
  res.render ('error404', { title: 'Error404' })
})

// Server start
const server = app.listen ('3000', () => console.log('Server started on port 3000...'))

// Mongo Connection 
mongo.connect('mongodb://127.0.0.1/mongo-chat', (err, db) => { 
  if (err) { 
    throw err
  }
  console.log('MongoDB Connected...')

  // Socket setup
  const io = socket(server)
  io.sockets.on('connection', (socket) => {
    console.log('Socket succesfully connected on', socket.id)
    // let chat = db.collection('chats'); //

    // Create function to send status
    sendStatus = function(s) {
      socket.emit('status', s)
    }
 
    socket.on('chat', (data) => {
      io.sockets.emit('chat', data)
    })
  })
})