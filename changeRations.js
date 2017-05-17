$(document).ready(function() {
	$(document).keypress(function(key) {
		if(key.which == 13) {
	      	var userInput = document.getElementById("userInput").value;
		  	game.rations = (userInput + 1)
		  	$(location).attr('href', 'status.html')
		}
	});
});