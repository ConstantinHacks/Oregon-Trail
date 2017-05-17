$(document).ready(function() {
	$(document).keypress(function(key) {
		if(key.which == 13) {
			console.log("enter pressed")
	      	var userInput = document.getElementById("userInput").value;
		  	game.pace = (userInput + 1)
		  	$(location).attr('href', 'status.html')
		}
	});
});