/* Import Modules */

var http = require('http');
var url = require("url");
var fs = require('fs');
var socketIO = require('socket.io'); 
var routes = require("./Routes");
var socketController = require("./SocketsController");

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

	var pathname = url.parse(req.url).pathname;	
	// call route func
	var httpContext = { req : req, res : res, pathname : pathname, io : io };
	
	routes.route(httpContext);
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
socketController.OnSocketConnection(io);