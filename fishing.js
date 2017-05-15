$(document).ready(function(){
	fishing();
});

async function fishing(){
	var bitechance = 65;
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
		//return to menu screen
	}
	else{
		$("#content").append("Oh! A bite!");
		var wait = (Math.floor((Math.random() * 6) + 1) + 15)/40;
		var count = 0;
		var hooked = false;
		while (count < wait){
			//insert keylistener
			//if clicked set hooked to true and break;
			delay(1000/40);
			count++;
		}
		if (hooked){
			//randomize fish size, add food weight to bag, return to menu
		}
		else{
			$("#content").text("It got away...");
			//return to menu screen
		}
	}	
};

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
};