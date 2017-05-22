game = JSON.parse(localStorage.getItem('currentGame'));

$(document).ready(function() {
	$(document).keypress(function(key) {
		if(key.which == 13) {
	      	var userInput = document.getElementById("userInput").value;
		  	game.pace = (Number(userInput))
		  	redirect("status.html", game);
		}
	});
});

function redirect(path,gameState){
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}