game = JSON.parse(localStorage.getItem('currentGame'));
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

$(document).ready(function(){
  game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear());
  $("#next").html(game.nextDistance);
  $("#total").html(game.totalDistance);

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
    await sleep(50);
    animation();
    await sleep(1500);
    game.totalDistance += game.nextDistance - miles() < 0 ? game.nextDistance : miles();
    game.nextDistance -= game.nextDistance - miles() < 0 ? game.nextDistance : miles();
    game.date.setDate(game.date.getDate()+1);
    $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear()); 
    //.slice(0,5)+(game.date.slice(5,7)+1)+game.date.slice(7,);
    $("#next").html(game.nextDistance);
    $("#total").html(game.totalDistance);
    //await sleep(750);
    //alert('done');

  }
}

function miles()
{
  //hours traveled * mph (# of oxen) = pace*4 
  return game.pace * 4 * Math.round(game.inventory.oxen*.2);
}


function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animation()
{
  //alert(game.nextDistance + "\n"+miles()+"\n"+(game.nextDistance-miles()));
  for(i=0; i<Math.min(miles(), game.nextDistance); i++)
  {
    $('#landmark').animate({left: 50+'%'});
    await sleep(50);
    $('#travel').attr("src", "traveling2.png");
    await sleep(50);
    $('#travel').attr("src", "traveling1.png");
    await sleep(50);
    $('#travel').attr("src", "traveling.png");
    await sleep(50);
  }
}