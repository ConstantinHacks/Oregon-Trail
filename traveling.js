game = JSON.parse(localStorage.getItem('currentGame'));
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
var distances = [ "50%", "40%", "30%","20%", "10%", "0%"];
game.selectionset = 

$(document).ready(function(){
  game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear());
  $("#next").html(game.nextDistance);
  $("#total").html(game.totalDistance);
  $("#food").html(game.inventory.food);

});
travel();

async function travel()
{
  while(game.nextDistance > 0)
  {
    // if the distance to next landmark will be hit miles() would return a number
    // > game.nextDistance, thus the remaining distance should be subtracted from 
    // nextDistance and added to totalDistance, otherwise miles() returns the proper value
    //alert("gonna switch");
    movement = miles();
    await sleep(50);
    animation(movement);
    await sleep(1500);
    console.log(game.nextDistance);
    console.log(movement);
    console.log(game.nextDistance - movement);
    console.log(game.totalDistance + movement);
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
    //await sleep(750);
    //alert('done');

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
  for(i=0; i<Math.min(movement, game.nextDistance); i++)
  {
    $('#travel').attr("src", "traveling2.png");
    await sleep(50);
    $('#travel').attr("src", "traveling1.png");
    await sleep(50);
    $('#travel').attr("src", "traveling.png");
    await sleep(50);
  }

}