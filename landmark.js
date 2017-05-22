// reloads the game
game = JSON.parse(localStorage.getItem('currentGame'));
// casts game.date to a date because JSON.parse leaves it as string
game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function calculateHighScore(){
    var currentGame = game

    var highScore = 0;

    for(var i=0;i < currentGame.party.length;i++){
        highScore += currentGame.party[i].health;
    }

    highScore += currentGame.inventory.oxen * 4;
    highScore += currentGame.inventory.wagonAxle * 2;
    highScore += currentGame.inventory.wagonTongue * 2;
    highScore += currentGame.inventory.wagonWheel * 2;
    highScore += currentGame.inventory.clothing * 2;
    highScore += (currentGame.inventory.bait/50) * 2;
    highScore += (currentGame.inventory.food/25) * 2;

    if (currentGame.occupation == "Carpenter"){
        highScore *= 2
    } else if(currentGame.occupation == "Farmer") {
        highScore *= 3
    }

    return highScore;
}

// displays appropriate landmark
//$("#landmark").attr("src", "Locations/"+game.landmarks[0].name+".png");
$(document).ready(function(){
  $("#landmark").attr("src", "Locations/"+game.landmarks[0].name+".png");

  console.log(game.landmarks[0].name);
  if(game.landmarks[0].name == "Willamette Valley"){
    alert("You won! Your high score is:" + calculateHighScore())
  }

  $("#loc").html(game.landmarks[0].name);
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear()); 
  $(document).keypress(function(key){
    if(key.which == 32)
    {
      // if the landmark is a river, splicing is taken care of at river crossing
      if(game.landmarks[0].detail != "river")
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