// Includes
// var gpio = require("pi-gpio");
var PI_PIN = 11;
var PI_PIN_2 = 13;
var PI_PIN_3 = 15;
var READ_DURATION = 100;
var pointCounter = 0;
var pointCounter_2 = 0;
var pointCounter_3 = 0;

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
	/* gpio.close(PI_PIN);
	gpio.close(PI_PIN_2);
	gpio.close(PI_PIN_3);
	pointCounter = 0;
	pointCounter_2 = 0;
	pointCounter_3 = 0; */
}

/* Opens the GPIO connction and Listens to shock values on the PIN 
   @Param : SocketConnection Parameter
*/
function OpenPIConnection(socket) {

	// Open Pin
	/* gpio.open(PI_PIN, "input", function(err) {
  		// Read PIN Value
	    console.log('GPIO PIN open - PIN No is '+ PI_PIN);
	});

	gpio.open(PI_PIN_2, "input", function(err) {
  		// Read PIN Value
	    console.log('GPIO PIN open - PIN No is '+ PI_PIN_2);
	});

	gpio.open(PI_PIN_3, "input", function(err) {
  		// Read PIN Value
	    console.log('GPIO PIN open - PIN No is '+ PI_PIN_3);
	});

	// Read Values on a set timer schedule
	setInterval(function() {
		gpio.read(PI_PIN, function(err, value) {
			if(err) {
				console.log('Error : ', err);
				// Close PIN to flush value and Re-open the PIN
				FlushandResetPIN();
			} 

			// Read value from PIN
			if(value == 1 || value == "1") {
		  		pointCounter = pointCounter + 1;
		  		// broadcast count value back to the client
				console.log('Count is' +pointCounter);
  				socket.emit('shock', { score : pointCounter });
		  	}
		});

		gpio.read(PI_PIN_2, function(err, value) {
			if(err) {
				console.log('Error : ', err);
				// Close PIN to flush value and Re-open the PIN
				FlushandResetPIN();
			} 

			// Read value from PIN
			if(value == 1 || value == "1") {
		  		pointCounter_2 = pointCounter_2 + 1;
		  		// broadcast count value back to the client
				console.log('Count is S2' +pointCounter_2);
  				socket.emit('shock-2', { score : pointCounter_2 });
		  	}
		});

		gpio.read(PI_PIN_3, function(err, value) {
			if(err) {
				console.log('Error : ', err);
				// Close PIN to flush value and Re-open the PIN
				FlushandResetPIN();
			} 

			// Read value from PIN
			if(value == 1 || value == "1") {
		  		pointCounter_3 = pointCounter_3 + 1;
		  		// broadcast count value back to the client
				console.log('Count is S3' +pointCounter_3);
  				socket.emit('shock-3', { score : pointCounter_3 });
		  	}
		});

	}, READ_DURATION) */

}

/* 
	Resets the PIN and Opens it again
*/
function FlushandResetPIN() {
	/* gpio.close(PI_PIN);
	gpio.open(PI_PIN, "input", function(err) {
		console.log('PIN flushed and Re-opened again'+ PI_PIN)
	});

	gpio.open(PI_PIN_2, "input", function(err) {
		console.log('PIN flushed and Re-opened again'+ PI_PIN_2)
	})

	gpio.open(PI_PIN_3, "input", function(err) {
		console.log('PIN flushed and Re-opened again'+ PI_PIN_3)
	})

	*/
}

exports.OnSocketConnection = OnSocketConnection;