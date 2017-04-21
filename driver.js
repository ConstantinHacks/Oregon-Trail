// Called when page loads
function init() {
	// document.getElementById("choiceBox").style.display = 'none';
	// document.getElementById("userInput").style.display = 'none';
	// document.getElementById("trailInfoPageTwo").style.display = 'none';


	document.getElementById("userDirections").style.display = 'none';
	document.getElementById("trailInfoPageOne").style.display = 'none';
	document.getElementById("trailInfoPageTwo").style.display = 'none';
}

// test?
$(document).keypress(function(key) {
  if(key.which == 13) {
  	var userInput = document.getElementById("userInput").value;
    alert("selection was " + userInput);
    document.getElementById("userInput").value = ""; // resets input
  } 
});

// How to call this function only when above userInput is 2?
// function optionTwo() {
// 	switchPage("choiceBox", "trailInfoPageOne");
// 	switchPage("userInput", "userDirections");

// 	$(document).keypress(function (e) {
// 	  if (e.keyCode === 0 || e.keyCode === 32) {
// 	    e.preventDefault()
// 	    console.log('Space pressed')
// 	    switchPage("trailInfoPageOne", "trailInfoPageTWo");
// 	  }
// 	});
// // }

// function switchPage(removeID, showID) {
// 	document.getElementById(removeID).style.display = 'none';
// 	document.getElementById(showID).style.display = 'block';
// }
