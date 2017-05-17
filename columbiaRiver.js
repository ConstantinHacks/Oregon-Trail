var wag;
var currentIter = 200;
var movingRocks;
var riverRocks;
game = JSON.parse(localStorage.getItem('currentGame'));

$(document).ready(function(){
	$("crash").hide();
	init();
	wag = document.getElementById("wagon");
	var wago = wag.getBoundingClientRect();
	console.log(wago.left + "px ");
	var stage = document.getElementById("gameStage");
	var stageBounds = stage.getBoundingClientRect();

	$(document).keydown(function(key) {
		wago = wag.getBoundingClientRect();
		if (key.keyCode == 37) { // left
			if (wago.left <= stageBounds.left) {
				console.log("crashed left")
				crash();
			} else {
				$("#wagon").animate({left: "-=5px"},1);
			}
		}
		if (key.keyCode == 39) { // right
			if (wago.right >= stageBounds.right) {
				console.log("crashed right")
				crash();
			} else {
				$("#wagon").animate({left: "+=5px"},1);
			}
		}
		if (key.keyCode == 32) {
			$("#crash").hide();			
			console.log("key press");
			console.log(currentIter);
			move();
		}
	});
});
function init() {
	wag = document.getElementById("wagon");
	riverRocks = [rock1, rock2, rock3, rock4, rock5, rock6, rock7, rock8, rock9, rock10];
	movingRocks = [];
	currentIter = 200;
	move();
}
async function move(){
	var iterations = currentIter;
	while (iterations > 0){ // runs until event happens
		console.log(iterations);
		if (Math.floor(Math.random() * 101) <= 20){
			var randRockIndex = Math.floor(Math.random() * riverRocks.length);
			$('#rock'+(randRockIndex+1)).show();
			movingRocks.push(randRockIndex);
		}
		var wagLoc = wag.getBoundingClientRect();
		for(var i = 0; i < movingRocks.length; i++){
			var rock = document.getElementById("rock"+(movingRocks[i]+1));
			var rockLoc = rock.getBoundingClientRect();
			var crashed = false;
			if(wagLoc.bottom <= rockLoc.bottom && wagLoc.bottom >= rockLoc.top){
				if(wagLoc.left >= rockLoc.left && wagLoc.left <= rockLoc.right){
					crashed = true;
				}
				else if(wagLoc.right <= rockLoc.right && wagLoc.right >= rockLoc.left){
					crashed = true;
				}
			}
			else if(wagLoc.top >= rockLoc.top && wagLoc.top <= rockLoc.bottom){
				if(wagLoc.left >= rockLoc.left && wagLoc.left <= rockLoc.right){
					crashed = true;
				}
				else if(wagLoc.right <= rockLoc.right && wagLoc.right >= rockLoc.left){
					crashed = true;
				}
			}
			if(crashed){
				currentIter = iterations;
				iterations = 0;
				crash();
				continue;
			}
		}

	await sleep(500);
	moveRocks(movingRocks);
	iterations--;
	}
}

function moveRocks(movingRocks) {
	for (var i = 0; i < movingRocks.length; i++) {
		// console.log($('#rock'+(movingRocks[i]+1)))
		$('#rock'+(movingRocks[i]+1)).animate({top: '-=20px'},10);
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function crash(){
				$("#crash").html("You have crashed. <br>You lost: <br>");
				var lostFood = 0;
				var lostBait = 0;
				var lostWagonParts = [];
				var lostClothes = 0;
				var lostOxen = 0;
				var lostPeople = [];
				lostFood = Math.floor(Math.random()*1500);
				lostBait = Math.floor(Math.random()*2500);
				var lostParts = Math.floor(Math.random()*100)+1;
				lostClothes = Math.floor(Math.random()*20);
				lostOxen = Math.floor(Math.random()*15);
				var lostPerson = Math.floor(Math.random()*100)+1;
				game.inventory.food -= lostFood;
				game.inventory.bait -= lostBait;
				game.inventory.clothing -= lostClothes;
				game.inventory.oxen -= lostOxen;
				if(lostParts % 2 == 0){ 
					game.inventory.wagonWheel -= 2; 
					lostWagonParts.push("2 wagon wheels");
				}
				lostParts = Math.floor(Math.random()*100)+1;
				if(lostParts % 2 == 0){ 
					game.inventory.wagonAxle -= 2; 
					lostWagonParts.push("2 wagon axles");
				}
				lostParts = Math.floor(Math.random()*100)+1;
				if(lostParts % 2 == 0){ 
					game.inventory.wagonTongue -= 2; 
					lostWagonParts.push("2 wagon tongues");
				}
				for(var i = 1; i < game.party.length; i++){
					if(lostPerson % 3 == 0){ 
						game.party[i].health = 0; 
						lostPeople.push(game.party[i].name+" (drowned)");
					}
					lostPerson = Math.floor(Math.random()*100)+1;
				}
				if(game.inventory.food < 0){ game.inventory.food = 0; }
				if(game.inventory.bait < 0){ game.inventory.bait = 0; }
				if(game.inventory.clothing < 0){ game.inventory.clothing = 0; }
				if(game.inventory.wagonWheel < 0){ game.inventory.wagonWheel = 0; }
				if(game.inventory.wagonAxle < 0){ game.inventory.wagonAxle = 0; }
				if(game.inventory.wagonTongue < 0){ game.inventory.wagonTongue = 0; }
				if(game.inventory.oxen < 0){ game.inventory.oxen = 0; }
				
				if(lostClothes != 0){
					$("#crash").append(lostClothes + " set of clothing<br>");
				}
				if(lostBait != 0){
					$("#crash").append(lostBait + " bait<br>");
				}
				if(lostWagonParts.length != 0){
					for (part in lostWagonParts){
						$("#crash").append(part + "<br>");
					}
				}
				if(lostFood != 0){
					$("#crash").append(lostFood + " pounds of food<br>");
				}
				if(lostOxen != 0){
					$("#crash").append(lostOxen + " oxen<br>");
				}
				if(lostPeople.length != 0){
					for (person in lostPeople){
						$("#crash").append(person + "<br>");
					}
				}
				$("#crash").show();
}


