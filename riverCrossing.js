var SAFE_DEPTH = 3; //max depth to safely ford
var ROUGH_DEPTH = 5; //smallest penalty in case of failure
var SEVERE_DEPTH = 10; //larger penalty in case of failure
var CRITICAL_DEPTH = 15; //largest penalty in case of failure

function River(name, width, depth){
	this.name = name;
	this.width = width;
	this.depth = depth;
}
game = JSON.parse(localStorage.getItem('currentGame'));

function ford(depth){
	if(depth > SAFE_DEPTH){
		//determine what is lost and display
		if(depth <= ROUGH_DEPTH){
			//see how much food/bait is lost
			var lostFood = Math.floor(Math.random()*50);
			var lostBait = Math.floor(Math.random()*50);
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			if(game.inventory.food < 0){ game.inventory.food = 0; }
			if(game.inventory.bait < 0){ game.inventory.bait = 0; }
		}
		else if(depth <= SEVERE_DEPTH){
			//see how much food/bait/parts/clothing is lost
			var lostFood = Math.floor(Math.random()*100);
			var lostBait = Math.floor(Math.random()*200);
			var lostParts = Math.floor(Math.random()*100)+1;
			var lostClothes = Math.floor(Math.random()*5);
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			game.inventory.clothing -= lostClothes;
			if(lostParts % 3 == 0){ game.inventory.wagonWheel -= 1; }
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 3 == 0){ game.inventory.wagonAxle -= 1; }
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 3 == 0){ game.inventory.wagonTongue -= 1; }
			if(game.inventory.food < 0){ game.inventory.food = 0; }
			if(game.inventory.bait < 0){ game.inventory.bait = 0; }
			if(game.inventory.clothing < 0){ game.inventory.clothing = 0; }
			if(game.inventory.wagonWheel < 0){ game.inventory.wagonWheel = 0; }
			if(game.inventory.wagonAxle < 0){ game.inventory.wagonAxle = 0; }
			if(game.inventory.wagonTongue < 0){ game.inventory.wagonTongue = 0; }
		}
		else if(depth <= CRITICAL_DEPTH){
			//see how much food/bait/parts/clothing/oxen/people are lost
			var lostFood = Math.floor(Math.random()*500);
			var lostBait = Math.floor(Math.random()*1000);
			var lostParts = Math.floor(Math.random()*100)+1;
			var lostClothes = Math.floor(Math.random()*8);
			var lostOxen = Math.floor(Math.random()*3);
			var lostPerson = Math.floor(Math.random()*100)+1;
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			game.inventory.clothing -= lostClothes;
			game.inventory.oxen -= lostOxen;
			if(lostParts % 2 == 0){ game.inventory.wagonWheel -= 1; }
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 2 == 0){ game.inventory.wagonAxle -= 1; }
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 2 == 0){ game.inventory.wagonTongue -= 1; }
			for(var i = 0; i < game.party.length; i++){
				if(lostPerson % 5 == 0){ game.party[i].health = 0; }
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
			var lostFood = Math.floor(Math.random()*1500);
			var lostBait = Math.floor(Math.random()*2500);
			var lostParts = Math.floor(Math.random()*100)+1;
			var lostClothes = Math.floor(Math.random()*20);
			var lostOxen = Math.floor(Math.random()*15);
			var lostPerson = Math.floor(Math.random()*100)+1;
			game.inventory.food -= lostFood;
			game.inventory.bait -= lostBait;
			game.inventory.clothing -= lostClothes;
			game.inventory.oxen -= lostOxen;
			if(lostParts % 2 == 0){ game.inventory.wagonWheel -= 2; }
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 2 == 0){ game.inventory.wagonAxle -= 2; }
			lostParts = Math.floor(Math.random()*100)+1;
			if(lostParts % 2 == 0){ game.inventory.wagonTongue -= 2; }
			for(var i = 0; i < game.party.length; i++){
				if(lostPerson % 3 == 0){ game.party[i].health = 0; }
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
	}
	else{
		//display success message
	}
}

function caulk(river){
	var feetTraveled = 0;
	var raftTips = river.depth;
	var noTrouble = true;
	while (feetTraveled < river.width){
		if(feetTraveled != 0 && feetTraveled % 25 == 0){
			if((Math.random()*100) < raftTips){
				//determine what is lost and display
				if(river.depth <= ROUGH_DEPTH){
					//see how much food/bait is lost
					var lostFood = Math.floor(Math.random()*50);
					var lostBait = Math.floor(Math.random()*50);
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					if(game.inventory.food < 0){ game.inventory.food = 0; }
					if(game.inventory.bait < 0){ game.inventory.bait = 0; }
				}
				else if(river.depth <= SEVERE_DEPTH){
					//see how much food/bait/parts/clothing is lost
					var lostFood = Math.floor(Math.random()*100);
					var lostBait = Math.floor(Math.random()*200);
					var lostParts = Math.floor(Math.random()*100)+1;
					var lostClothes = Math.floor(Math.random()*5);
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					game.inventory.clothing -= lostClothes;
					if(lostParts % 3 == 0){ game.inventory.wagonWheel -= 1; }
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 3 == 0){ game.inventory.wagonAxle -= 1; }
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 3 == 0){ game.inventory.wagonTongue -= 1; }
					if(game.inventory.food < 0){ game.inventory.food = 0; }
					if(game.inventory.bait < 0){ game.inventory.bait = 0; }
					if(game.inventory.clothing < 0){ game.inventory.clothing = 0; }
					if(game.inventory.wagonWheel < 0){ game.inventory.wagonWheel = 0; }
					if(game.inventory.wagonAxle < 0){ game.inventory.wagonAxle = 0; }
					if(game.inventory.wagonTongue < 0){ game.inventory.wagonTongue = 0; }
				}
				else if(river.depth <= CRITICAL_DEPTH){
					//see how much food/bait/parts/clothing/oxen/people are lost
					var lostFood = Math.floor(Math.random()*500);
					var lostBait = Math.floor(Math.random()*1000);
					var lostParts = Math.floor(Math.random()*100)+1;
					var lostClothes = Math.floor(Math.random()*8);
					var lostOxen = Math.floor(Math.random()*3);
					var lostPerson = Math.floor(Math.random()*100)+1;
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					game.inventory.clothing -= lostClothes;
					game.inventory.oxen -= lostOxen;
					if(lostParts % 2 == 0){ game.inventory.wagonWheel -= 1; }
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 2 == 0){ game.inventory.wagonAxle -= 1; }
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 2 == 0){ game.inventory.wagonTongue -= 1; }
					for(var i = 0; i < game.party.length; i++){
						if(lostPerson % 5 == 0){ game.party[i].health = 0; }
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
					var lostFood = Math.floor(Math.random()*1500);
					var lostBait = Math.floor(Math.random()*2500);
					var lostParts = Math.floor(Math.random()*100)+1;
					var lostClothes = Math.floor(Math.random()*20);
					var lostOxen = Math.floor(Math.random()*15);
					var lostPerson = Math.floor(Math.random()*100)+1;
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					game.inventory.clothing -= lostClothes;
					game.inventory.oxen -= lostOxen;
					if(lostParts % 2 == 0){ game.inventory.wagonWheel -= 2; }
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 2 == 0){ game.inventory.wagonAxle -= 2; }
					lostParts = Math.floor(Math.random()*100)+1;
					if(lostParts % 2 == 0){ game.inventory.wagonTongue -= 2; }
					for(var i = 0; i < game.party.length; i++){
						if(lostPerson % 3 == 0){ game.party[i].health = 0; }
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
				noTrouble = false;
			}
		}
		feetTraveled++;
	}
	if(noTrouble){
		//display no trouble message
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