//Contant Values for Travelar Health. Corresponds to high-score calculation values.
GOOD_HEALTH = 500;
FAIR_HEALTH = 400;
POOR_HEALTH = 300;
VERY_POOR_HEALTH = 200;

//Menu set constant declarations
MENUSET = 1;
CREATEGAMESET = 2;
PICKMONTHSET = 3;

// Called when page loads

// global variables to determine what answers the system should expect from the user
var selectionSet;
// looking for a yes/no question
var yesNoQ;


var game;


//Game Class
function Game(occupation,money){
   this.occupation = occupation;
   this.money = money;
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

$(document).keypress(function(key) {
    if(key.which == 13) {
      var userInput = document.getElementById("userInput").value;
      parseText(userInput);
      alert("selection was " + userInput);
      document.getElementById("userInput").value = ""; // resets input
    } 
});


function store(){
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  document.getElementById("textBox").innerHTML = "Before leaving Independence you should buy equipment and supplies, you have "+ currentGame.money +" in cash, but don't have to spend it all now."
}

function addPartyMembers(partyMembers){

  var travelers = [];

  travelers.push(new Traveler( $('#leaderName').val() ))
  travelers.push(new Traveler( $('#member2').val() ))
  travelers.push(new Traveler( $('#member3').val() ))
  travelers.push(new Traveler( $('#member4').val() ))
  travelers.push(new Traveler( $('#member5').val() ))

  console.log(travelers);

  var currentGame = JSON.parse(localStorage.getItem('currentGame'));

  currentGame.party = travelers;

  //pick month departure date
  redirect('pickMonth.html',currentGame)
}

function chooseMonth(){

  game = JSON.parse(localStorage.getItem('currentGame'));
  selectionSet = PICKMONTHSET; 
}

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
          game = new Game("Banker",1600);
          redirect('partyForm.html',game)
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 2, 1);
          redirect('store.html',game);
        }
        else
        {

        }
        break;
      case '2':
        //do stuff
        console.log("selection was " + text);
        if(selectionSet == MENUSET)
        {

        }else if(selectionSet == CREATEGAMESET) {
          console.log("Carpenter");
          game = new Game("Carpenter",800);
          redirect('partyForm.html',game)
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 3, 1);
          redirect('store.html',game);
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
          game = new Game("Farmer",400);
          redirect('partyForm.html',game)
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 4, 1);
          redirect('store.html',game);
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
          
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 5, 1);
          redirect('store.html',game);
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
          
        }else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 6, 1);
          redirect('store.html',game);
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


function redirect(path,gameState){
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
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
