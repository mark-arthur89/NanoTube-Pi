var http = require("http");
var fs = require('fs');

function first(httpcontext){
	// return 'first function';
	var request = httpcontext.req;
	var response = httpcontext.res;

	//return 'second function' + value;
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("In First Function");
	response.end();
}

function second(httpcontext) {
	
	var request = httpcontext.req;
	var response = httpcontext.res;

	//return 'second function' + value;
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("In Second Function");
	response.end();
}

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

exports.first = first;
exports.second = second;
exports.index = index;