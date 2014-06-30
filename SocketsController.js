// Includes
var gpio = require("pi-gpio");
var PI-PIN = 16;
var pointCounter = 0;

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
	  	OpenPIConnection(socket);

	  });

	  // Reset Counter :
	  socket.on('reset-game', function(data) {

	  	console.log('Game Reset');
	  	// Reset the counter value
	  	ClosePIConnection();

	  });

	  socket.on('stop-game', function(data) {

	  	console.log('Close GPIO PIN');
	  	ClosePIConnection();

	  })

	  // Capture Disconnect event
	  socket.on('disconnect', function () {
	    socket.emit('disconnet-msg', { msg: 'Connection from the client is disconnected' });
	    // close GPIO Pin 
	    ClosePIConnection();

	  });

	});
}

/* Helper function */

// Closes the GPIO connection and resets the point counter
function ClosePIConnection(){
	/* gpio.close(PI-PIN);
	pointCounter = 0; */
}

/* Opens the GPIO connction and Listens to shock values on the PIN 
   @Param : SocketConnection Parameter
*/
function OpenPIConnection(socket) {

	/* gpio.open(PI-PIN, "input", function(err) {
  		// Read PIN Value
	    gpio.read(PI-PIN, function(err, value) {
		    if(err) throw err;
		  	if(value == 1 || value == "1") {
		  		pointCounter = pointCounter++;
		  		// broadcast count value back to the client
  				socket.emit('shock', { score : pointCounter });
		  	}
		});
	}); */

}

exports.OnSocketConnection = OnSocketConnection;