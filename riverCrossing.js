var SAFE_DEPTH = 3; //max depth to safely ford
var ROUGH_DEPTH = 5; //smallest penalty in case of failure
var SEVERE_DEPTH = 10; //larger penalty in case of failure
var CRITICAL_DEPTH = 15; //largest penalty in case of failure
var river;
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
game = JSON.parse(localStorage.getItem('currentGame'));
river = new River(game.landmarks[0].name);
game.date = new Date(JSON.parse(localStorage.getItem('currentGame')).date);

$(document).ready(function(){
	$("#name").html(game.landmarks[0].name + " Crossing");
  $("#date").html(monthNames[game.date.getMonth()]+" "+game.date.getDate()+", "+game.date.getFullYear());
	$("#text").html("You must cross the river in order to continue. The river at this point is currently "
		+ river.width + " feet across, and " + river.depth + " feet deep in the middle.<br><br>You may: <br><br>" +
		"1) Attempt to ford the river<br>2) Caulk the wagon and float across.<br>3) Wait and see if conditions improve.<br>4)"
		+ (river.ferry ? "Take a ferry." : "Hire an indian guide."));
	$('#userInput').focus();
  $('#userInput').focusout(function(){console.log("unfocus"); $('#userInput').focus();});
	
	$(document).keypress(function(key){
		if(key.which == 13)
		{
      var userInput = document.getElementById("userInput").value;
	  	//parses the input
	  	if(userInput == 1)
	  	{
	  		ford(river.depth)
	  	}
	  	if(userInput == 2)
	  	{
	  		caulk(river);
	  	}
	  	if(userInput = 3)
	  	{
	  		if(river.ferry)
	  		{
	  			ferry();
	  		}
	  		else
	  		{
	  			indian();
	  		}
	  	}
	  	//sets the input back to empty
      document.getElementById("userInput").value = ""; // resets input
		}
		if(key.which == 32)
		{
			redirect("status.html", game);
		}
	});

});

function River(name){
	if (name == "Kansas River")
	{
		this.width = Math.floor(Math.random() * (630 - 610 + 1) ) + 610;
		this.depth = Math.floor(Math.random() * (5 - 3 + 1) ) + 3;
		this.ferry = true;
	}
	else if(name == "Big Blue River")
	{
		this.width = Math.floor(Math.random() * (240 - 220 + 1) ) + 220;
		this.depth = Math.floor(Math.random() * (4.5 - 2.5 + 1) ) + 3;
		this.ferry = true;
	}
	else if(name == "Green River")
	{
		this.width = Math.floor(Math.random() * (1050 - 950 + 1) ) + 950;
		this.depth = Math.floor(Math.random() * (21 - 19 + 1) ) + 19;
		this.ferry = true;
	}
	else
	{
		this.width = Math.floor(Math.random() * (1050 - 950 + 1) ) + 950;
		this.depth = Math.floor(Math.random() * (10 - 6 + 1) ) + 6;
		this.ferry = false;
	}
	this.river = name;
}

function ford(depth){
	alert("begin ford");
	if(depth > SAFE_DEPTH){
		$("#text").html("The river is too deep to<br>ford. You lose:<br>");
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
			for(var i = 1; i < game.party.length; i++){
				if(lostPerson % 4 == 0){ 
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
		}
		if(lostClothes != 0){
			$("#text").append(lostClothes + " set of clothing<br>");
		}
		if(lostBait != 0){
			$("#text").append(lostBait + " bait<br>");
		}
		if(lostWagonParts.length != 0){
			for (part in lostWagonParts){
				$("#text").append(part + "<br>");
			}
		}
		if(lostFood != 0){
			$("#text").append(lostFood + " pounds of food<br>");
		}
		if(lostOxen != 0){
			$("#text").append(lostOxen + " oxen<br>");
		}
		if(lostPeople.length != 0){
			for (person in lostPeople){
				$("#text").append(person + "<br>");
			}
		}
	}
	else{
		//display success message
		var wet = Math.floor(Math.random()*100)+1;
		if(wet % 3 == 0){
			$("#text").html("Your supplies got wet.<br>Lose 1 day.");
			game.date = new Date(game.date)+1;
		}
		else{
			$("#text").html("It was a muddy crossing,<br>but you did not get<br>stuck.");
		}
	}
	$("#text").show();
}

function caulk(river){
	var feetTraveled = 0;
	var raftTips = river.depth;
	var noTrouble = true;
	while (feetTraveled < river.width){
		if(feetTraveled != 0 && feetTraveled % 75 == 0){
			if((Math.random()*100) < raftTips){
				$("#text").html("The wagon tipped over<br>while floating. You lose:<br>");
				var lostFood = 0;
				var lostBait = 0;
				var lostWagonParts = [];
				var lostClothes = 0;
				var lostOxen = 0;
				var lostPeople = [];
				//determine what is lost and display
				if(river.depth <= ROUGH_DEPTH){
					//see how much food/bait is lost
					lostFood = Math.floor(Math.random()*50);
					lostBait = Math.floor(Math.random()*50);
					game.inventory.food -= lostFood;
					game.inventory.bait -= lostBait;
					if(game.inventory.food < 0){ game.inventory.food = 0; }
					if(game.inventory.bait < 0){ game.inventory.bait = 0; }
					
				}
				else if(river.depth <= SEVERE_DEPTH){
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
					for(var i = 1; i < game.party.length; i++){
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
				}
				if(lostClothes != 0){
					$("#text").append(lostClothes + " set of clothing<br>");
				}
				if(lostBait != 0){
					$("#text").append(lostBait + " bait<br>");
				}
				if(lostWagonParts.length != 0){
					for (part in lostWagonParts){
						$("#text").append(part + "<br>");
					}
				}
				if(lostFood != 0){
					$("#text").append(lostFood + " pounds of food<br>");
				}
				if(lostOxen != 0){
					$("#text").append(lostOxen + " oxen<br>");
				}
				if(lostPeople.length != 0){
					for (person in lostPeople){
						$("#text").append(person + "<br>");
					}
				}
				noTrouble = false;
				feetTraveled = river.width;
			}
		}
		feetTraveled++;
	}
	if(noTrouble){
		//display no trouble message
		$("#text").html("You had no trouble<br>floating the wagon across.");
		$("userInput").css("display", "none");
		$("#prompt").css("display", "block");
	}
}

function ferry(){
	game.money -= 5;
	$("#text").html("You made it safely across");
	$("userInput").css("display", "none");
	$("#prompt").css("display", "block");
}

function indian(){
	game.inventory.clothing -= 3;
	$("#text").html("You made it safely across");
	$("userInput").css("display", "none");
	$("#prompt").css("display", "block");
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

function redirect(path,gameState){
	game.landmarks.splice(0,1);
	game.nextDistance = game.landmarks[0].distance;
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}