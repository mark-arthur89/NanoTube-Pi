/* Contains the code for the app 
   Init and Event handlers - defintion
*/
var app = (function(){

	// Variables

	// Methods
	var Init = function(){
		console.log('In Main');

		$(document).ready(function(){
			RegisterEvents();
		});

	}



	/* Helper Methods */

	/*  
		List's All the events that need's to be associated with elements
	*/
	function RegisterEvents(){

	}

	// Sample socket method
	function socket() {

	  		console.log('On click');

	  		var socket = io('http://localhost');

			  socket.on('news', function (data) {
			    console.log(data);
			    // socket.emit('my other event', { my: 'data' });
			  });


			  socket.on('start', function (data) {
			    console.log(data);
			    // socket.emit('my other event', { my: 'data' });
			  });

	  }


	return {

		Init: Init

	}

})();


app.Init();