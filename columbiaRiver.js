$(document).ready(function(){
	var wag = document.getElementById("wagon");
	var wago = wag.getBoundingClientRect();
	console.log(wago.left + "px ");


	$(document).keydown(function(key) {
		wago = wag.getBoundingClientRect();
		if (key.keyCode == 37) { // left
			if (wago.left < 591.890625) {
				console.log("crashed right")
			} else {
				$("#wagon").animate({left: "-=10px"});
			}
		}
		if (key.keyCode == 39) { // right
			if (wago.left < 191.890625) {
				console.log("crashed left")				
			} else {
				$("#wagon").animate({left: "+=10px"});
			}
		}
	});
});
async function init() {
	var rock1 = document.getElementById("rock1");
	var rock2 = document.getElementById('rock2');
	var rock3 = document.getElementById('rock3');
	var rock4 = document.getElementById('rock4');
	var rock5 = document.getElementById('rock5');
	var rock6 = document.getElementById('rock6');
	var rock7 = document.getElementById('rock7');
	var rock8 = document.getElementById('rock8');
	var rock9 = document.getElementById('rock9');
	var rock10 = document.getElementById('rock10');
	var riverRocks = [rock1, rock2, rock3, rock4, rock5, rock6, rock7, rock8, rock9, rock10];
	var movingRocks = [];
	var iterations = 20;
	while (iterations > 0){ // runs until event happens
		if (Math.floor(Math.random() * 101) <= 20){
			var randRockIndex = Math.floor(Math.random() * riverRocks.length);
			riverRocks[randRockIndex].style.display = "block";
			movingRocks.push(randRockIndex);
		}

	// await sleep(1);
	moveRocks(movingRocks);
	iterations--;
	}
}

function moveRocks(movingRocks) {
	for (var i = 0; i < movingRocks.length; i++) {
		// console.log($('#rock'+(movingRocks[i]+1)))
		$('#rock'+(movingRocks[i]+1)).animate({top: '-=20px'});
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


