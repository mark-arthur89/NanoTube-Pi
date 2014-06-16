/* Import Modules */

var http = require('http');
var fs = require('fs');
var socketIO = require('socket.io'); 

/* Start Server */
var io;
StartServer();

// var io = require('socket.io')(app);


// Helper Methods

/*
    Serves request's and response's to clients
    Callback method for http.createServer()
*/
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data); 
  });
}

/*
  Start's the server and set's the init values
*/
function StartServer(){
  var app = http.createServer(handler);
  io = socketIO(app);
  app.listen(8888);
}


// Socket Helpers

/* 
  On Connection Establish Event
*/
io.on('connection', function (socket) {

  // Emit's an event
  socket.emit('news', { hello: 'world' });

  // Receives an event
  socket.on('my other event', function (data) {
    console.log(data);
  });

  // broadcast an event

});