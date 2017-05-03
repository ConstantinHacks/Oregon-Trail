//Contant Values for Travelar Health. Corresponds to high-score calculation values.
GOOD_HEALTH = 500;
FAIR_HEALTH = 400;
POOR_HEALTH = 300;
VERY_POOR_HEALTH = 200;
//Menu set constant declarations
MENUSET = 1;
CREATEGAMESET = 2;
PICKMONTHSET = 3;
STOREINTRO1 = 4;
STOREINTRO2 = 5;
STOREINTRO3 = 6;
STOREINTRO4 = 7;
STOREMAINMENU = 8;
STOREOUTROSET = 9;
NOTENOUGHMONEYSET = 10;



//Costs of items in dollars
OXENCOST = 40;
FOODCOST = 0.2;
CLOTHINGCOST = 10;
baitBOXCOST = 2;
SPAREPARTCOST = 10;

// Called when page loads

// global variables to determine what answers the system should expect from the user
var selectionSet;
// looking for a yes/no question
var yesNoQ;
var isBuying;
var maxInput;
var game;
var currentStore;
var itemForSale;

var sparePartIndex = 4;

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
      // alert("selection was " + userInput);
      document.getElementById("userInput").value = ""; // resets input
    } 
});


function store(){
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  currentStore = new Items();
  document.getElementById("textBox").innerHTML = "Before leaving Independence you should buy equipment and supplies, you have "+ currentGame.money +" in cash, but don't have to spend it all now."
  document.getElementById("userInput").placeholder = "Press SPACE BAR to continue"
  document.getElementById("userInput").disabled = true
  selectionSet = STOREINTRO1
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

function purchase(amount){

  amount = parseInt(amount)

  switch(itemForSale){
    case 'oxen':
      currentStore.oxen = amount;
      break;
    case 'food':
      currentStore.food = amount;
      break;
     case 'clothing':
      currentStore.clothing = amount;
     break;
      case 'bait':
      currentStore.bait = amount;
     break;
     case 'spareparts':
      if(sparePartIndex == 1){
        currentStore.wagonWheel = amount
      } else if(sparePartIndex == 2){
        currentStore.wagonAxle = amount
      } else {
        currentStore.wagonTongue = amount;
      }  
     break;
  }
}

function notEnoughMoney(){
  selectionSet = NOTENOUGHMONEYSET
  document.getElementById("userInput").placeholder = "Press SPACE BAR to continue"
  document.getElementById("userInput").disabled = true
  document.getElementById("currentMoney").style.display = "none";
  document.getElementById("resultBox").style.display = "block"
  document.getElementById("resultText").innerHTML = "Okay, that comes out to a total of $" + currentStore.getBill + ". But I see that you only have $" +currentGame.money + " We'd better go over that list again."
}

function storeOutro(){
 selectionSet = STOREOUTROSET
  document.getElementById("userInput").placeholder = "Press SPACE BAR to continue"
  document.getElementById("userInput").disabled = true
  document.getElementById("choiceBox").style.display = "none";
 document.getElementById("currentMoney").style.display = "none";
  document.getElementById("resultBox").style.display = "block"
  document.getElementById("resultText").innerHTML = "Well then, you're ready to start. Good luck! You have a long and difficult journey ahead of you."
}


function handleSpareParts(){
  var part;

  switch(sparePartIndex){
    case 1:
    part = "wheel"
    break;
    case 2:
    part = "axle"
    break;
    case 3:
    part = "tongue"
    break;
  }

  document.getElementById("sparePartSale").style.display = "block";
  document.getElementById("sparePartSale").innerHTML = "wagon " +part+ " -$10 each";
  document.getElementById("userInput").placeholder = "Enter your purchase amount for wagon " + part + "s"
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
  } else if (isBuying){

    console.log("Buying this much " + text)
    console.log("SP INDEX:" + sparePartIndex);
    var buyingSpareParts = sparePartIndex != 4

    if(maxInput < text){
      alert("Your input can be at maximum " + maxInput)
    } else if(text < 1){
      alert("Your input needs to be at least 1")
    } 
    else {
      if(buyingSpareParts){
        purchase(text);
        sparePartIndex++;
        handleSpareParts()
        if(sparePartIndex == 4){
          storeOverview();
        }
      } else{
        purchase(text);
        storeOverview();
      }
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
        } else if(selectionSet == STOREMAINMENU){
          showItem("oxen");
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
        } else if(selectionSet == STOREMAINMENU){
          showItem("food");
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
        } else if(selectionSet == STOREMAINMENU){
          showItem("clothing");
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
        } else if(selectionSet == STOREMAINMENU){
          showItem("bait");
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
        }else if(selectionSet == STOREMAINMENU){
          sparePartIndex = 1
          showItem("spareparts");
          handleSpareParts()
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

function showItem(item){
  console.log(item)
  document.getElementById("choiceBox").style.display = "none"
  isBuying = true;
  itemForSale = item;

  var x = document.createElement("IMG");
  x.setAttribute("src", item+".png");
  x.setAttribute("id", "itemImage");
  document.getElementById("itemInfoDiv").appendChild(x);
  document.getElementById("itemInfoDiv").style.display = "block"

  document.getElementById("userInput").placeholder = "enter your purchase amount here"
  $("#userInput").attr('type','number');
  $("#userInput").attr('min','1');

  switch(item){
    case 'oxen':
      document.getElementById("itemInfo").innerHTML = "There are 2 oxen in a yoke;I recommend at least 3 yoke.I charge $40 a yoke.<br>How many yoke do you want?"
      maxInput = 9
      break;
    case 'food':
      document.getElementById("itemInfo").innerHTML = "I recommend you take at least 200 pounds of food for each person in your family. I see you have 5 people in all. You'll need flour, sugar, bacon, and coffee. My price is 20 cents a pound. <br> How many pounds of food do you want?"
      maxInput = 2000
     break;
     case 'clothing':
     document.getElementById("itemInfo").innerHTML = "You'll need warm clothing in the mountains. I recommend taking at least 2 sets of clothes per person. Each set is $10.00.<br> How many sets of clothes do you want?"
     maxInput = 99;
     break;
     case 'bait':
     document.getElementById("itemInfo").innerHTML = "You'll need worms for bait to fish along the way. I sell them by the dozen. I recommend taking at least 60 worms.<br>How many dozen worms do you want?"
      maxInput = 99;
     break;
     case 'spareparts':
     document.getElementById("itemInfo").innerHTML = "It's a good idea to have a few spare parts for your wagon. Here are the prices:"
     maxInput = 3;
     break;
  }
}

function redirect(path,gameState){
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}

function Items(){
  this.oxen = 0;
  this.food = 0;
  this.clothing = 0;
  this.bait = 0;
  this.wagonWheel = 0;
  this.wagonAxle = 0;
  this.wagonTongue = 0;
  this.getNumSpareParts = function(){
    console.log(this.wagonTongue+this.wagonAxle+this.wagonWheel);
    return this.wagonTongue+this.wagonAxle+this.wagonWheel;
  }
  this.getBill = function(){
    return this.oxen * OXENCOST + this.food * FOODCOST + this.clothing * CLOTHINGCOST +
      this.bait * baitBOXCOST + this.getNumSpareParts() * SPAREPARTCOST;
  }

}

function town(){
    var currentGame = JSON.parse(localStorage.getItem('currentGame'));
    console.log(currentGame);
}

function storeOverview(){
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  selectionSet = STOREMAINMENU;
  isBuying = false;

  if(document.getElementById("itemImage")){
    $("#itemImage").remove();
  }
  document.getElementById("sparePartSale").style.display = "none";
  document.getElementById("oxenrow").innerHTML = "Oxen $" + (currentStore.oxen * OXENCOST).toFixed(2);
  document.getElementById("foodrow").innerHTML = "Food $" + (currentStore.food * FOODCOST).toFixed(2);
  document.getElementById("clothingrow").innerHTML = "Clothing $" + (currentStore.clothing * CLOTHINGCOST).toFixed(2);
  document.getElementById("baitrow").innerHTML = "Bait $" + (currentStore.bait * baitBOXCOST).toFixed(2);
  document.getElementById("sparepartsrow").innerHTML = "Spare Parts $" + (currentStore.getNumSpareParts() * SPAREPARTCOST).toFixed(2);
  document.getElementById("currentMoney").innerHTML = "Amount you have: $" + currentGame.money.toFixed(2);
  document.getElementById("currentMoney").style.display = "block"; 

  document.getElementById("storeHeader").style.display = "block"
  document.getElementById("userInput").placeholder = "Which item would you like to buy?"
  document.getElementById("userInput").disabled = false
  document.getElementById("currentBillDiv").style.display = "block"
  document.getElementById("currentBill").innerHTML = "Total Bill: $" + currentStore.getBill().toFixed(2);
  document.getElementById("currentMoney").style.display = "block"
  document.getElementById("date").style.display = "block"
  document.getElementById("textBox").style.display = "block";
  document.getElementById("textBox").innerHTML = "Press SPACE BAR to leave the store";
  document.getElementById("ul2").style.display = "none"
  document.getElementById("greeting").style.display = "none"
  document.getElementById("list").style.display = "block"

  document.getElementById("itemInfoDiv").style.display = "none";
  document.getElementById("choiceBox").style.display = "block";


}

// How to call this function only when above userInput is 2?
// function optionTwo() {
// 	switchPage("choiceBox", "trailInfoPageOne");
// 	switchPage("userInput", "userDirections");

	$(document).keypress(function (e) {
	  if (e.keyCode === 0 || e.keyCode === 32) {
      var currentGame = JSON.parse(localStorage.getItem('currentGame'));
	    e.preventDefault()
	    console.log('Space pressed', selectionSet)
      switch(selectionSet){
        case STOREINTRO1:
          document.getElementById("textBox").innerHTML = "You can buy whatever you need at Matt's General Store"
          selectionSet++;
          break;
        case STOREINTRO2:
          document.getElementById("greeting").style.display = "block"
          document.getElementById("textBox").style.display = "none"
          document.getElementById("ul1").style.display = "block"
          selectionSet++;
          break;
        case STOREINTRO3:
          document.getElementById("ul1").style.display = "none"
          document.getElementById("ul2").style.display = "block"
          selectionSet++;
          break;
        case STOREINTRO4:
          selectionSet++;
          storeOverview();
          break;
        case STOREMAINMENU:
          if(currentStore.oxen == 0){
            alert("Remember you need oxen to pull your wagon!")
          } else if(currentStore.getBill > currentGame.money){
            notEnoughMoney();
          } else {
            storeOutro();
          }
          break;
        case NOTENOUGHMONEYSET:
          storeOverview();
          break;
        case STOREOUTROSET:
          currentGame.inventory = currentStore
          redirect("town.html",currentGame)
      }

	  }
	});
// }

// function switchPage(removeID, showID) {
// 	document.getElementById(removeID).style.display = 'none';
// 	document.getElementById(showID).style.display = 'block';
// }
