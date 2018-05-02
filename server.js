const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      path        = require('path'),
      socket      = require('socket.io'),
      MongoClient = require('mongodb').MongoClient;

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// Set Static Path
app.use('/assets', express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => {
  res.render ('index', { title: 'MongoChat' })
})

// Page not found error404
app.get('/*', (req, res) => {
  res.render ('error404', { title: 'Error404' })
})

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mongoChat';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);
  
  // Connect to socket.io
  const io = socket(server); 
  io.sockets.on('connection', (socket) => {
    console.log('Socket succesfully connected...');
    
    // Get chat from mongo collection
    let chat = db.collection('chat'); 
    chat.find().limit(100).sort({_id:1}).toArray(function(err, res) {
      if (err) throw err;
    })

    socket.on('event', (data) => {
      io.sockets.emit('event', data)
    })
  })
})

// Server start
const server = app.listen ('3000', () => console.log('Server started on port 3000...'));