// reloads the game
game = JSON.parse(localStorage.getItem('currentGame'));
// global variables
// list of month names for display purposes
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
// distances to help move landmarks
var distances = [ "50%", "40%", "30%","20%", "10%", "0%"];
// list of illnesses
illnesses = ["cholera","exhaustion","measles","typhoid","dysentery"," a broken leg","a broken arm"];
// health constants
GOOD_HEALTH = 500;
FAIR_HEALTH = 400;
POOR_HEALTH = 300;
VERY_POOR_HEALTH = 200;
// variable to help with keypress handling
var atLandmark = false;
// ensure notification element is hidden every time entering this page
$("#notification").css("display", "none");
// load in the next distance
game.nextDistance = game.landmarks[0].distance;
var nextDistance;
var part;

function Tombstone(name,message){
  this.name = name;
  this.message = message;
}

var tombStone = new Tombstone;

// keypress handling and updating values when page loads
$(document).ready(function(){
  // variable to help with loop control when traveling
  nextDistance = game.nextDistance;
  game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);
  for(i=0; i<game.party.length; i++)
  {
    game.party[i].health = parseInt(game.party[i].health);
  }
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear());
  $("#next").html(game.nextDistance);
  $("#total").html(game.totalDistance);
  $("#food").html(game.inventory.food);
  $("#health").html(getHealthString(game));
  $("#weather").html(game.weather);
  $("#landmark").attr("src", game.landmarks[0].source);
  travel();
  $(document).keypress(function(key){
    if(key.which == 32 && !atLandmark)
    {
      $("#notification").css("display", "none");
      nextDistance = game.nextDistance;
      travel();
    }
    else if(key.which == 13 && !atLandmark)
    {
      redirect("status.html", game);
    }
    else if(key.which == 89 && atLandmark)
    {
      if(atLandmark)
      {
        redirect("landmark.html", game);
      }
      else
      {
        if(Math.floor(Math.random()))
        {
          $("#notification").html("You were able to successfully repair it.");
        }
        else
        {
          $("#notification").html("You were not able to repair it.");
          (part == 0) ? game.inventory.wagonAxle-- : (part == 1) ? game.inventory.wagonTongue-- : game.inventory.wagonWheel--;
        }
      }
    }
    else if(key.which == 78 && atLandmark)
   {
      alert("registered here");
   }
  });


});




async function travel()
{

  while(nextDistance > 0)
  {
 
    // if the distance to next landmark will be hit miles() would return a number
    // > game.nextDistance, thus the remaining distance should be subtracted from 
    // nextDistance and added to totalDistance, otherwise miles() returns the proper value
    //chaos function is random function for potential events occurring
    stop = chaos();
    if(stop)
    {
      nextDistance = 0;
      await sleep(50);
      continue;
    }
    // update health
    healthDegredation();
    movement = miles();
    await sleep(50);
    animation(movement);
    await sleep(1500);
    game.totalDistance += (game.nextDistance - movement < 0) ? game.nextDistance : movement;
    game.nextDistance -= (game.nextDistance - movement < 0) ? game.nextDistance : movement;
    game.date.setDate(game.date.getDate()+1);
    //console.log(game.party.length + " " + game.ration);
    game.inventory.food = Math.max(0, game.inventory.food - game.ration*game.party.length);
    $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear()); 
    //.slice(0,5)+(game.date.slice(5,7)+1)+game.date.slice(7,);
    $("#next").html(game.nextDistance);
    $("#total").html(game.totalDistance);
    $("#landmark").animate({left: distances[Math.floor(game.nextDistance/movement)]},500);
    $("#food").html(game.inventory.food);
    $("#health").html(getHealthString());
    $("weather").html(game.weather);
    nextDistance = game.nextDistance;
  }
  // nextDistance == 0, therefeore at a landmark, process landmark event 
  // bring up would you like to look around menu
  if(game.nextDistance == 0)
  {
    atLandmark = true;
    $("#notification").html("Would you like to take a look around? Shift+y/n");
    $("#notification").css("display", "block");
  }
}

function miles()
{
  //hours traveled * mph (# of oxen) = pace*4 
  return Math.round(game.pace*4*game.inventory.oxen*.1*(Math.random()*(1.15 - .85)+.85));
}


function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animation(movement)
{
  //alert(game.nextDistance + "\n"+miles()+"\n"+(game.nextDistance-miles()));
  for(i=0; i<Math.min(movement, game.nextDistance, 20); i++)
  {
    $('#travel').attr("src", "traveling2.png");
    await sleep(50);
    $('#travel').attr("src", "traveling1.png");
    await sleep(50);
    $('#travel').attr("src", "traveling.png");
    await sleep(50);
  }

}

async function healthDegredation()
{
  var weatherEffect = 0;
  // is mild weather
  if(game.weather == "cool" || game.weather == "warm")
  {
    weatherEffect = 1;
  }
  // is severe weather
  else if(game.weather == "cold" || game.weather == "hot")
  {
    weatherEffect = 2;
  }
  // is snowy or rainy
  else
  {
    weatherEffect = 3;
  }
  for(i=0; i<game.party.length; i++)
  {
    //game.party[i].health = parseInt(game.party[i].health);
    if(game.party.length > 1 && i==0)
    {
      game.party[i].health = Math.max(game.party[i].health - ((4 - game.ration) + game.pace + game.party[i].illness + weatherEffect), 200);
    }
    else
    {
      game.party[i].health -= ((4 - game.ration) + game.pace + game.party[i].illness + weatherEffect);
      if(game.inventory.food == 0)
      {
        game.party[i].health -= 10;
      }
    }
    if(game.party[i].health <= 0)
    {
      $("#notification").html(game.party[i].name + " has died.")
      $("#notification").css("display", "block");
      await sleep(1500);
      $("#notification").css("display", "none");
    }
  }
}

function getHealthString(){
  totalHealth = 0;
  for(var i=0;i<game.party.length;i++){
    game.party[i].health = parseInt(game.party[i].health);
    totalHealth += game.party[i].health;
  }
  avgHealth = totalHealth/game.party.length;

  if (avgHealth > FAIR_HEALTH){
    return "Good"
  } else if(avgHealth > POOR_HEALTH){
    return "Fair"
  } else if(avgHealth > VERY_POOR_HEALTH){
    return "Poor"
  } else {
    return "Very Poor"
  }
}

//check if there is a tombstone at the given distance
function getIsTombStone(distance){
  console.log("GET TOMB STONE");
    $.ajax({
    url: "getTombStone.php",
    cache: false,
    data: {totalDistance: distance},
    success: function(result){
      tombStone = JSON.parse(result).name , JSON.parse(result).message;
      alert("You See a Tombstone\n" + JSON.parse(result).name + "\n" + JSON.parse(result).message);
      return JSON.parse(result) != null;
    },
    error: function(){
      return false
    }
  });
}

function makeTombStone(distance,playerName){
    console.log("Make Tomb Stone");
    $.ajax({
    url: "makeTombStone.php",
    cache: false,
    data: {totalDistance: distance,
      name: playerName,
      DOD: game.date,
      message: "They will be missed",
      ts: new Date()
  },
    success: function(result){
      console.log("result")
      // return JSON.parse(result) != null;
    },
    error: function(){
      // return false
    }
  });
}

function chaos()
{
  //returns a value in between 1 and 100
  num = Math.floor(Math.random()*100)+1;
  // 12/100 numbers from 1-100 are <= 12 so a 12% chance
  // an event happens
  if(num <= 12)
  {
    // breaks up events into 6 categories
    switch(num%6)
    {
      // stalls progression for some days
      case 0:
      // stalls days
        $("#notification").html("gets stuck");
        $("#notification").css("display", "block");
        break;
      // obtain fruit
      case 1:
        // finds 1-25 lbs of fruit
        amount = Math.floor(Math.random()*25)+1;
        // displays notification
        $("#notification").html("You found " + amount + " lbs of fruit");
        $("#notification").css("display", "block");
        game.inventory.food += amount;
        break;
      // party member catches disease
      case 2:
        // if the party has more than the leader remaining, leader cannot catch disease
        if(game.party.length > 1)
        {
          // gets a random number between 0 and part.length-1, then adds one to that index
          member = Math.floor(Math.random()*(game.party.length-1))+1;
          // updates the illness of member so health can be degredated properly in future travel iterations
          game.party[member].illness = 5;
          // randomly selects which illness is obtained. all are equally damaging
          ailment = Math.floor(Math.random()*illnesses.length);
          // displays notification
          $("#notification").html(game.party[member].name + " has " + illnesses[ailment]);
          $("#notification").css("display","block");
        }
        break;
      // bandits steal items      
      case 3:
        // selects a random item to steal from in inventory
        item = Math.floor(Math.random()*game.inventory.length);
        // gets a random number from what player has and steals at most half of that item and at least 1
        lost = Math.floor(Math.random(game.inventory[item]/2))+1;
        // displays notification
        $("#notification").html("Bandits stole " + lost + " of your ...");
        $("#notification").css("display","block");
        game.inventory
        break;
      // wagon part breaks
      case 4: 
        part = Math.floor(Math.random()*3);
        if(part == 0)
        {
          $("#notification").html("Your wagon axel has broken would you like to repair it? Shift+y/n");
          $("#notification").css("display","block");
          //look for input
        }
        else if(part == 1)
        {
          $("#notification").html("Your wagon axel has broken would you like to repair it? Shift+y/n");
          $("#notification").css("display","block");
          //look for input
        }
        else
        {
          $("#notification").html("Your wagon axel has broken would you like to repair it? Shift+y/n");
          $("#notification").css("display","block");   
          //look for input       
        }
        break; 
      // oxen dies   
      case 5:
        $("#notification").html("oxen dies tetxt");
        $("#notification").css("display", "block");
        game.inventory.oxen--;
        break;
    }
    return true;
  }
  return false;
}

function redirect(path,gameState){
  //gameState.selectionSet = selectionSet;
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}