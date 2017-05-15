$(document).ready(function(){
	$("#continue").hide();
	$("#content").text("");
	currentGame = JSON.parse(localStorage.getItem('currentGame'));
	fishing();
});
var hooked = false;
var currentGame;
async function fishing(){
	var bitechance = 65;
	currentGame.inventory.bait -= 1;
	var time = Math.floor((Math.random() * 10) + 3);
	var dots = 0;
	while (dots < time){
		$("#content").append(".");
		await sleep(500);
		dots++;
	}
	var bite = Math.floor((Math.random() * 100) + 1);
	if (bite > bitechance){
		$("#content").text("Not even a nibble...");
	}
	else{
		$("#content").append("Oh! A bite!");
		var wait = (Math.floor((Math.random() * 3) + 1)) * 40;
		var count = 0;
		while (count < wait){
			//checks if enter is pressed
			window.onkeyup = function(e){
				if(e.which == 13){
					hooked = true;
				}
			}
			if (hooked){
				break;
			}
			await sleep(25);
			count++;
		}
		if (hooked){
			hooked = false;
			var fishWeight = Math.floor((Math.random() * 30) + 1);
			$("#content").text("Congrats! You caught a "+fishWeight+"lb fish!");
			currentGame.inventory.food += fishWeight;
		}
		else{
			$("#content").text("It got away...");
		}
	}	
	await sleep(2000);
	$("#content").text("Would you like to continue fishing? (yes/no)");
	$("#continue").show();
};

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
};

function parseResponse(){
	if($("#response").val() == "yes" || $("#response").val() == "Yes" || $("#response").val() == "y" || $("#response").val() == "Y"){
		localStorage.setItem('currentGame', JSON.stringify(currentGame));
		$(location).attr('href', 'fishing.html')
	}
	else{
		localStorage.setItem('currentGame', JSON.stringify(currentGame));
		$(location).attr('href', 'status.html')
	}
}