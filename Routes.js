var requestHandlers = require("./RequestHandlers");
var socketIO = require('socket.io'); 

function route(httpcontext) {
	
	var pathname = httpcontext.pathname;
	var handle = {};
	
	handle["/"] = requestHandlers.first;
	handle["/first"] = requestHandlers.first;
	handle["/second"] = requestHandlers.second;
	handle["/index"] = requestHandlers.index;

	if (typeof handle[pathname] === 'function') {
		handle[pathname](httpcontext);
	} else {
		console.log('no func avail');
	}

}


exports.route = route;