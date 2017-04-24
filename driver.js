// Called when page loads

// global variables to determine what answers the system should expect from the user
var selectionSet;
// looking for a yes/no question
var yesNoQ;

function init() {
	// document.getElementById("choiceBox").style.display = 'none';
	// document.getElementById("userInput").style.display = 'none';
	// document.getElementById("trailInfoPageTwo").style.display = 'none';


	document.getElementById("userDirections").style.display = 'none';
	document.getElementById("trailInfoPageOne").style.display = 'none';
	document.getElementById("trailInfoPageTwo").style.display = 'none';

  selectionSet = 1;
  yesNoQ = 0;
}

// test?
$(document).keypress(function(key) {
  if(key.which == 13) {
  	var userInput = document.getElementById("userInput").value;
    parseText(userInput);
    alert("selection was " + userInput);
    document.getElementById("userInput").value = ""; // resets input
  } 
});

function parseText(text)
{
  // if it is a yes noi question, parse differently
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
  else
  {
    switch(text)
    {
      case '1':
        //do stuff
        console.log("selection was " + text);
        if(state == 1)
        {

        }
        else
        {

        }
        break;
      case '2':
        //do stuff
        console.log("selection was " + text);
        if(state == 1)
        {

        }
        else
        {
          
        }
        break;
      case '3':
        console.log("selection was " + text);
        //do stuff
        if(state == 1)
        {

        }
        else
        {

        }
        break;
      case '4':
        //do stuff
        console.log("selection was " + text);
        if(state == 1)
        {

        }
        else
        {
          
        }
        break;
      case '5':
        //do stuff
        console.log("selection was " + text);
        f(state == 1)
        {

        }
        else
        {
          
        }
        break;
      case '6':
        //do stuff
        console.log("selection was " + text);
        f(state == 1)
        {

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
