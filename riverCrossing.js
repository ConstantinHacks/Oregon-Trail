var SAFE_DEPTH = 3; //max depth to safely ford
var ROUGH_DEPTH = 5; //smallest penalty in case of failure
var SEVERE_DEPTH = 10; //larger penalty in case of failure
var CRITICAL_DEPTH = 15; //largest penalty in case of failure

$("#notification").hide();
var notified = false; //bool to see if the notification is showing

function River(name, width, depth){
	this.name = name;
	this.width = width;
	this.depth = depth;
}
game = JSON.parse(localStorage.getItem('currentGame'));

function ford(depth){
	if(depth > SAFE_DEPTH){
		$("#notification").text("The river is too deep to\nford. You lose:\n");
		var lostFood = 0;
		var lostBait = 0;
		var lostWagonParts = [];
		var lostClothes = 0;
		var lostOxen = 0;
		var lostPeople = [];
		//determine what is lost and display
		if(depth <= ROUGH_DEPTH){
			//see how much food/bait is lost
			lostFood = Math.floor(Math.random()*50);
			lostBait = Math.floor(Math.random()*50);
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			if(game.inventory.food < 0){ game.inventory.food = 0; }
			if(game.inventory.bait < 0){ game.inventory.bait = 0; }
			
		}
		else if(depth <= SEVERE_DEPTH){
			//see how much food/bait/parts/clothing is lost
			lostFood = Math.floor(Math.random()*100);
			lostBait = Math.floor(Math.random()*200);
			var lostParts = Math.floor(Math.random()*100)+1;
			lostClothes = Math.floor(Math.random()*5);
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			game.inventory.clothing -= lostClothes;
			if(lostParts % 3 == 0){ 
				game.inventory.wagonWheel -= 1; 
				lostWagonParts.push("1 wagon wheel");
			}
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 3 == 0){ 
				game.inventory.wagonAxle -= 1; 
				lostWagonParts.push("1 wagon axle");
			}
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 3 == 0){ 
				game.inventory.wagonTongue -= 1; 
				lostWagonParts.push("1 wagon tongue");
			}
			if(game.inventory.food < 0){ game.inventory.food = 0; }
			if(game.inventory.bait < 0){ game.inventory.bait = 0; }
			if(game.inventory.clothing < 0){ game.inventory.clothing = 0; }
			if(game.inventory.wagonWheel < 0){ game.inventory.wagonWheel = 0; }
			if(game.inventory.wagonAxle < 0){ game.inventory.wagonAxle = 0; }
			if(game.inventory.wagonTongue < 0){ game.inventory.wagonTongue = 0; }
		}
		else if(depth <= CRITICAL_DEPTH){
			//see how much food/bait/parts/clothing/oxen/people are lost
			lostFood = Math.floor(Math.random()*500);
			lostBait = Math.floor(Math.random()*1000);
			var lostParts = Math.floor(Math.random()*100)+1;
			lostClothes = Math.floor(Math.random()*8);
			lostOxen = Math.floor(Math.random()*3);
			var lostPerson = Math.floor(Math.random()*100)+1;
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			game.inventory.clothing -= lostClothes;
			game.inventory.oxen -= lostOxen;
			if(lostParts % 2 == 0){ 
				game.inventory.wagonWheel -= 1; 
				lostWagonParts.push("1 wagon wheel");
			}
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 2 == 0){ 
				game.inventory.wagonAxle -= 1;
				lostWagonParts.push("1 wagon axle");
			}
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 2 == 0){ 
				game.inventory.wagonTongue -= 1; 
				lostWagonParts.push("1 wagon tongue");
			}
			for(var i = 0; i < game.party.length; i++){
				if(lostPerson % 5 == 0){ 
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
		}
		else{
			//see how much food/bait/parts/clothing/oxen/people are lost
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
			for(var i = 0; i < game.party.length; i++){
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
		}
		if(lostClothes != 0){
			$("#notification").append(lostClothes + " set of clothing\n");
		}
		if(lostBait != 0){
			$("#notification").append(lostBait + " bait\n");
		}
		if(lostWagonParts.length != 0){
			for (part in lostWagonParts){
				$("#notification").append(part + "\n");
			}
		}
		if(lostFood != 0){
			$("#notification").append(lostFood + " pounds of food\n");
		}
		if(lostOxen != 0){
			$("#notification").append(lostOxen + " oxen\n");
		}
		if(lostPeople.length != 0){
			for (person in lostPeople){
				$("#notification").append(person + "\n");
			}
		}
	}
	else{
		//display success message
		var wet = Math.floor(Math.random()*100)+1;
		if(wet % 3 == 0){
			$("#notification").text("Your supplies got wet.\nLose 1 day.");
			//simulate 1 day
		}
		else{
			$("#notification").text("It was a muddy crossing,\nbut you did not get\nstuck.");
		}
	}
	$("#notification").show();
	while(true){
		window.onkeyup = function(e){
			if(e.which == 32){
				$("#notification").hide();
				localStorage.setItem('currentGame', JSON.stringify(game));
				$(location).attr('href', 'traveling.html')
			}
		}
	}
}

function caulk(river){
	var feetTraveled = 0;
	var raftTips = river.depth;
	var noTrouble = true;
	while (feetTraveled < river.width){
		if(feetTraveled != 0 && feetTraveled % 25 == 0){
			if((Math.random()*100) < raftTips){
				$("#notification").text("The wagon tipped over\nwhile floating. You lose:\n");
				var lostFood = 0;
				var lostBait = 0;
				var lostWagonParts = [];
				var lostClothes = 0;
				var lostOxen = 0;
				var lostPeople = [];
				//determine what is lost and display
				if(depth <= ROUGH_DEPTH){
					//see how much food/bait is lost
					lostFood = Math.floor(Math.random()*50);
					lostBait = Math.floor(Math.random()*50);
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					if(game.inventory.food < 0){ game.inventory.food = 0; }
					if(game.inventory.bait < 0){ game.inventory.bait = 0; }
					
				}
				else if(depth <= SEVERE_DEPTH){
					//see how much food/bait/parts/clothing is lost
					lostFood = Math.floor(Math.random()*100);
					lostBait = Math.floor(Math.random()*200);
					var lostParts = Math.floor(Math.random()*100)+1;
					lostClothes = Math.floor(Math.random()*5);
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					game.inventory.clothing -= lostClothes;
					if(lostParts % 3 == 0){ 
						game.inventory.wagonWheel -= 1; 
						lostWagonParts.push("1 wagon wheel");
					}
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 3 == 0){ 
						game.inventory.wagonAxle -= 1; 
						lostWagonParts.push("1 wagon axle");
					}
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 3 == 0){ 
						game.inventory.wagonTongue -= 1; 
						lostWagonParts.push("1 wagon tongue");
					}
					if(game.inventory.food < 0){ game.inventory.food = 0; }
					if(game.inventory.bait < 0){ game.inventory.bait = 0; }
					if(game.inventory.clothing < 0){ game.inventory.clothing = 0; }
					if(game.inventory.wagonWheel < 0){ game.inventory.wagonWheel = 0; }
					if(game.inventory.wagonAxle < 0){ game.inventory.wagonAxle = 0; }
					if(game.inventory.wagonTongue < 0){ game.inventory.wagonTongue = 0; }
				}
				else if(depth <= CRITICAL_DEPTH){
					//see how much food/bait/parts/clothing/oxen/people are lost
					lostFood = Math.floor(Math.random()*500);
					lostBait = Math.floor(Math.random()*1000);
					var lostParts = Math.floor(Math.random()*100)+1;
					lostClothes = Math.floor(Math.random()*8);
					lostOxen = Math.floor(Math.random()*3);
					var lostPerson = Math.floor(Math.random()*100)+1;
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					game.inventory.clothing -= lostClothes;
					game.inventory.oxen -= lostOxen;
					if(lostParts % 2 == 0){ 
						game.inventory.wagonWheel -= 1; 
						lostWagonParts.push("1 wagon wheel");
					}
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 2 == 0){ 
						game.inventory.wagonAxle -= 1;
						lostWagonParts.push("1 wagon axle");
					}
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 2 == 0){ 
						game.inventory.wagonTongue -= 1; 
						lostWagonParts.push("1 wagon tongue");
					}
					for(var i = 0; i < game.party.length; i++){
						if(lostPerson % 5 == 0){ 
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
				}
				else{
					//see how much food/bait/parts/clothing/oxen/people are lost
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
					for(var i = 0; i < game.party.length; i++){
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
				}
				if(lostClothes != 0){
					$("#notification").append(lostClothes + " set of clothing\n");
				}
				if(lostBait != 0){
					$("#notification").append(lostBait + " bait\n");
				}
				if(lostWagonParts.length != 0){
					for (part in lostWagonParts){
						$("#notification").append(part + "\n");
					}
				}
				if(lostFood != 0){
					$("#notification").append(lostFood + " pounds of food\n");
				}
				if(lostOxen != 0){
					$("#notification").append(lostOxen + " oxen\n");
				}
				if(lostPeople.length != 0){
					for (person in lostPeople){
						$("#notification").append(person + "\n");
					}
				}
				noTrouble = false;
				$("#notification").show();
				notified = true;
				while(notified){
					window.onkeyup = function(e){
						if(e.which == 32){
							$("#notification").hide();
							notified = false;
						}
					}
				}
			}
		}
		feetTraveled++;
	}
	if(noTrouble){
		//display no trouble message
		$("#notification").text("You had no trouble\nfloating the wagon across.");
		$("#notification").show();
		while(true){
			window.onkeyup = function(e){
				if(e.which == 32){
					$("#notification").hide();
					localStorage.setItem('currentGame', JSON.stringify(game));
					$(location).attr('href', 'traveling.html')
				}
			}
		}
	}
}

function ferry(){
	game.money -= 5;
	//show animation/display success message
}

function indian(){
	game.inventory.clothing -= 3;
	//show animation/display success message
}

function waitForConditions(river){
	var depthChange = (Math.random() * 0.3) + 0.1;
	if(game.weather == "rainy" || game.weather == "snowy"){
		river.depth += depthChange;
		river.width += depthChange*10;
	}
	else{
		river.depth -= depthChange;
		river.width -= depthChange*10;
	}
}

function getInfo(){
	//display what info on fording and caulking, as well as ferries and the indian if they are available

}