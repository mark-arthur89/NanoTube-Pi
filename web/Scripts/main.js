/* Contains the code for the app 
   Init and Event handlers - defintion
*/
var app = (function(){

	// Variables
	var socket;
	var MINS = 2;
	var seconds = MINS * 60;
	var timerId;

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
		$('body').delegate("#Start-Btn", "click", function(){

			// List server name
	  		socket = io('http://localhost');
			// Open socket connection with server
			OpenSocket(socket);

			$('#Settings-Screen').css('display','none');

		});

		// A click handler for restart
		$('body').delegate("#Shock-Score", "click", function(){
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
		 });


	  	socket.on('start', function (data) {
	    	console.log(data);
	    	// socket.emit('my other event', { my: 'data' });
	  	});

	  	// Event which captures shocks on nano tube
	  	socket.on('shock', function (data){
	  		// TODO : Capture data
	  		var score = data.score;
	  		$('#Shock-Score').html(score);
	  	});

	}

	// Start's the game - starts the timer and open's the GPIO PIN and starts receiving input signals
	// @Param : socketConnetion
	function StartGame(socket){
		// TODO : create a setTimeout function to countdown time
		var setTime = parseInt($('#time').html());
		MINS = Math.round(setTime);
		seconds = MINS * 60;

		var time = MINS * 60 * 1000;

		// Start game 
		socket.emit('start-game', { data: 'start game' });	

		setTimeout(function(){
			// Stop the game
			socket.emit('stop-game', { data: 'stop game' });
		}, time);

		timerId = setInterval(UpdateTime, 1000);

	}

	// Reset's the error counter value
	// @param : socketConnection
	function ResetGame(socket){
		socket.emit('reset-game', { data: 'reset game counter' });		
	}

	// Updates time on the UI
	function UpdateTime(){
		seconds = seconds - 1;

		if (seconds >= 0) {

			// Create a neat timer value
			var _mins = Math.floor( seconds / 60 );

			var subMin = _mins * 60;
			var _seconds = seconds - subMin;

			var _time = _mins == 0 ? _seconds + " Seconds" :  _mins + " Min " + _seconds + " Seconds";

			$('#Timer').html(_time);
		}

		if(seconds == 0){
			clearInterval(timerId);
		}
	}

	/************* End of Socket Methods ***********/


	return {

		Init: Init

	}

})();


app.Init();