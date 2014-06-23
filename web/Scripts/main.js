/* Contains the code for the app 
   Init and Event handlers - defintion
*/
var app = (function(){

	// Variables
	var socket;

	// Methods
	var Init = function(){

		$(document).ready(function(){
			RegisterEvents();
		});

	}



	/* Helper Methods */

	/*  
		List's All the events that need's to be associated with elements
	*/
	function RegisterEvents(){

		// A click handler for start
		$('body').delegate("#socket-open", "click", function(){

			// List server name
	  		socket = io('http://localhost');
			// Open socket connection with server
			OpenSocket(socket);

		});

		// A click handler for restart
		$('body').delegate("#socket-close", "click", function(){
			ResetGame(socket);
		});

	}

	// TODO : Do some interactive stuff on page load
	function OnPageLoad(){

	}



	/************ Socket Methods ***************/

	// Sample socket method
	//@param : socketConnection 
	function OpenSocket(socket) {

	  		console.log('Opening socket connection with server');

	  		// Define socket events
	  		SocketEvents(socket);

	  		StartGame(socket);

	}

	// Contains a list of all socket events that the client need to listen too
	// @param : socketConnection param
	function SocketEvents(socket){

		socket.on('connection-set', function (data) {
		    console.log(data);
		    // socket.emit('my other event', { my: 'data' });
		 });


	  	socket.on('start', function (data) {
	    	console.log(data);
	    	// socket.emit('my other event', { my: 'data' });
	  	});

	  	// Event which captures shocks on nano tube
	  	socket.on('shock', function (data){
	  		// TODO : Capture data
	  	});

	}

	// Start's the game - starts the timer and open's the GPIO PIN and starts receiving input signals
	// @Param : socketConnetion
	function StartGame(socket){
		// TODO : create a setTimeout function to countdown time

		socket.emit('start-game', { data: 'start game' });

	}

	// Reset's the error counter value
	// @param : socketConnection
	function ResetGame(socket){

		socket.emit('reset-game', { data: 'reset game counter' });		

	}

	/************* End of Socket Methods ***********/


	return {

		Init: Init

	}

})();


app.Init();