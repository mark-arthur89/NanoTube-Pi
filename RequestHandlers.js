var http = require("http");
var fs = require('fs');
var socketController = require("./SocketsController");


// Variables

// A sample request handler
function first(httpcontext){
	// return 'first function';
	var request = httpcontext.req;
	var response = httpcontext.res;

	//return 'second function' + value;
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("In First Function");
	response.end();
}

// Loads the initial page request handler
function index(httpcontext) {
	
	var request = httpcontext.req;
	var response = httpcontext.res;
	
	fs.readFile(__dirname + '/index.html',
	  function (err, data) {
		if (err) {
		  response.writeHead(500);
		  return response.end('Error loading index.html');
		}

		response.writeHead(200);
		response.end(data); 
	});
	
}

// Load's static content onto the page
function static(httpcontext) {

	var request = httpcontext.req;
	var response = httpcontext.res;
	var pathname = httpcontext.pathname;

	fs.readFile(__dirname + '/' + pathname,
	  function (err, data) {
		if (err) {
		  response.writeHead(500);
		  return response.end('Error loading index.html');
		}

		response.writeHead(200);
		response.end(data); 
	});


}

exports.first = first;
exports.index = index;
exports.static = static;