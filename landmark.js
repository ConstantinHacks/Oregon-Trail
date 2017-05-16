// reloads the game
game = JSON.parse(localStorage.getItem('currentGame'));
// casts game.date to a date because JSON.parse leaves it as string
game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

// displays appropriate landmark
$("#landmark").attr("src", "Locations/"+game.landmarks[0].name+".png");

$(document).ready(function(){
  $("#loc").html(game.landmarks[0].name);
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear()); 
  $(document).keypress(function(key){
    if(key.which == 32)
    {
      // if the landmark is a river, splicing is taken care of at river crossing
      if(game.landmarks[0].detail != "")//river")
      {
        //removes first element of landmarks to indicate moving on to next landmark
        game.landmarks.splice(0,1);
      }
      redirect("status.html",game);
    }
  });
});

function redirect(path,gameState){
  //gameState.selectionSet = selectionSet;
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}