// Includes

// Methods
function OnSocketConnection(io) {

	io.on('connection', function (socket) {
	  // Emit's an event
	  socket.emit('connection-set', { info: 'Connection Established with client' });

	  // Receives an event
	  socket.on('my other event', function (data) {
	    console.log(data);
	  });

	  // broadcast an event
	  // TODO : Place the GPIO Connection open PIN
	  socket.on('start-game', function(data) {

	  	console.log('Game Started');
	  	// Open GPIO pin 

	  	// broadcast count value back to the client
	  	socket.emit('shock', { value : '' });

	  });

	  // Reset Counter :
	  socket.on('reset-game', function(data) {

	  	console.log('Game Reset');
	  	// Reset the counter value

	  });

	  // Capture Disconnect event
	  socket.on('disconnect', function () {
	    socket.emit('disconnet-msg', { msg: 'Connection from the client is disconnected' });

	    // close GPIO Pin 

	  });

	});
}

exports.OnSocketConnection = OnSocketConnection;