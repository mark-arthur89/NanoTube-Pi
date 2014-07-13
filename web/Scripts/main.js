/* Contains the code for the app 
   Init and Event handlers - defintion
*/
var app = (function(){

	// Variables
	var socket;
	var MINS = 2;
	var seconds = MINS * 60;
	var timerId;
	var gameover_STATUS = false;

	// Methods
	var Init = function(){

		OnPageLoad();

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

			gameover_STATUS = false;

			$('#Settings-Screen').addClass('hidden');
			$('#Settings-Screen').css('height', '0%');
			$('#Settings-Screen .left-block').addClass('hidden');
			$('#Settings-Screen .right-block').addClass('hidden');

		});

		// A click handler for restart
		$('body').delegate("#Shock-Score", "click", function(){
			ResetGame(socket);
		});

		// Nav item click
		$('body').delegate(".Nav-Item", "click", function(){
			$('#Settings-Screen').removeClass('hidden');
			$('#Settings-Screen').animate({ height: "70%" }, 1000, function() {
				$('#Settings-Screen .left-block').removeClass('hidden');
				$('#Settings-Screen .right-block').removeClass('hidden');
			});
		});

	}

	// TODO : Do some interactive stuff on page load
	function OnPageLoad(){

		$('#Settings-Screen').animate({ height: "70%" }, 1000, function() {
			$('#Settings-Screen .left-block').removeClass('hidden');
			$('#Settings-Screen .right-block').removeClass('hidden');
		});

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
	  		if(!gameover_STATUS) {
	  			var score = data.score;
	  			$('#Shock-Score').html(score);
	  		}
	  	});

	  	// Score for Team -2
	  	socket.on('shock-2', function (data){
	  		// TODO : Capture data
	  		if(!gameover_STATUS) {
	  			var score = data.score;
	  			$('#Shock-Score-2').html(score);
	  		}
	  	});

	  	// Score for Team -3
	  	socket.on('shock-3', function (data){
	  		// TODO : Capture data
	  		if(!gameover_STATUS) {
	  			var score = data.score;
	  			$('#Shock-Score-3').html(score);
	  		}
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
			gameover_STATUS = true;
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

			var _time = _mins == 0 ? _seconds + " Seconds" :  _mins + " Mins " + _seconds + " Seconds";

			if(seconds == 0)
				_time = "Game Over";

			// Flash background once for the last 10 seconds
			if(seconds <= 10) {
				if(seconds % 2 == 0)
					$('#Main-Body').css('background-color', '#FFF');
				else
					$('#Main-Body').css('background-color', '#FF0000');
			}

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