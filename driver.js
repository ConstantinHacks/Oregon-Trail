//Contant Values for Travelar Health. Corresponds to high-score calculation values.
GOOD_HEALTH = 500;
FAIR_HEALTH = 400;
POOR_HEALTH = 300;
VERY_POOR_HEALTH = 200;

//Menu set constant declarations
MENUSET = 1;
CREATEGAMESET = 2;

// Called when page loads

// global variables to determine what answers the system should expect from the user
var selectionSet;
// looking for a yes/no question
var yesNoQ;


var game;


//Game Class
function Game(occupation){
   this.occupation = occupation;
   //rest of the attributes added as they are entered.
}
//Traveler Class
function Traveler(name){
   this.name = name
   this.health = GOOD_HEALTH
   this.illness = "none" 
}

// Start Trail Information (LearnAboutTheTrail.html)
function docReady() {
	var divs = $('div[id^="content-"]').hide();
	i = 0;
	$(document).ready(function(){
		$(document).keypress(function (e) {
  			if (e.keyCode === 0 || e.keyCode === 32) {
  				e.preventDefault();
  				nextPage(divs,i);
        	}
        });
	});

function nextPage() { 
    divs.eq(i).fadeIn(400)
              .delay(5000)
              .fadeOut(400, nextPage(divs,i));

    i = ++i % divs.length; // increment i, 
                           //   and reset to 0 when it equals divs.length
};

}


// End Trail Information (LearnAboutTheTrail.html)

function init() {

  selectionSet = MENUSET;
  yesNoQ = 0;
}

function createGame() {

  selectionSet = CREATEGAMESET;
  yesNoQ = 0;
}
/*
$(document).ready(function(

  $(document).keypress(function(key) {
    if(key.which == 13) {
      var userInput = document.getElementById("userInput").value;
      parseText(userInput);
      alert("selection was " + userInput);
      document.getElementById("userInput").value = ""; // resets input
    } 
  });
/*
));*/


function parseText(text)
{
  // if it is a yes no question, parse differently
  if(yesNoQ)
  {
    if(text.match(/^y/))
    {
      console.log("selection was yes");
    }
    else if (text.match(/^n/))
    {
      console.log("selection was no");
    }
    else
    {
      console.log("selection didn't match");
    }
  }
  // otherwise matches a value 1-6
  else {
  	switch(text) {
      case '1':
        //do stuff
        console.log("selection was " + text);
        if(selectionSet == MENUSET) 
        {
        	$(location).attr('href', 'createGame.html')
        } 
        else if(selectionSet == CREATEGAMESET) {
          console.log("Banker");
          game = new Game("Banker");
        } else {

        }
        break;
      case '2':
        //do stuff
        console.log("selection was " + text);
        if(selectionSet == MENUSET)
        {

        }else if(selectionSet == CREATEGAMESET) {
          console.log("Carpenter");
          game = new Game("Carpenter");
        }
        else 
        {
          
        }
        break;
      case '3':
        console.log("selection was " + text);
        //do stuff
        if(selectionSet == MENUSET)
        {

        }else if(selectionSet == CREATEGAMESET) {
          console.log("Farmer");
          game = new Game("Farmer");
        }
        else
        {

        }
        break;
      case '4':
        //do stuff
        console.log("selection was " + text);
        if(selectionSet == MENUSET)
        {
          console.log("Learn More");
        }else if(selectionSet == CREATEGAMESET) {
          
        }
        else
        {
          
        }
        break;
      case '5':
        //do stuff
        console.log("selection was " + text);
        if(selectionSet == MENUSET)
        {

        }else if(selectionSet == CREATEGAMESET) {
          
        }
        else
        {
          
        }
        break;
      case '6':
        //do stuff
        console.log("selection was " + text);
        if(selectionSet == MENUSET)
        {

        }else if(selectionSet == CREATEGAMESET) {
          
        }
        else
        {
          
        }
        break;
      default:
        //do stuff
        console.log("selection was invalid");
        break;
    }
  }

}


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
