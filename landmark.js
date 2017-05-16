// reloads the game
game = JSON.parse(localStorage.getItem('currentGame'));
// casts game.date to a date because JSON.parse leaves it as string
game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

$("#landmark").attr("src", "Locations/"+game.landmarks[0].name+".png");

$(document).ready(function(){
  $("#loc").html(game.landmarks[0].name);
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear()); 
  $(document).keypress(function(key){
    if(key.which == 32)
      redirect("status.html",game);
  });
});

function redirect(path,gameState){
  //gameState.selectionSet = selectionSet;
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}