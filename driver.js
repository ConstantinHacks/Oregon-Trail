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
PARTYSELECTSET = 11;
ROADSTORESET = 12;
ROADSTORESETCONFIRM = 13;
STATUSSET = 14;
VIEWINVENTORYSET = 15;
TRADESET = 16;
ACCEPTTRADESET = 17;
CANTTRADESET = 18;

//Costs of items in dollars at Matt's Store
OXENCOST = 40;
FOODCOST = 0.2;
CLOTHINGCOST = 10;
BAITBOXCOST = 2;
SPAREPARTCOST = 10;

//Costs of items in dollars at road store
OXENCOST_ROAD = 25;
CLOTHINGCOST_ROAD = 12.5;
BAITBOXCOST_ROAD = 2.5;
SPAREPARTCOST_ROAD = 12.5;
FOODCOST_ROAD = 0.25;

MAXOXEN = 20;
MAXCLOTHES = 99;
MAXBAIT = 99
MAXFOOD = 2000;
MAXSPAREPARTS = 3;

// Called when page loads

// global variables to determine what answers the system should expect from the user
var selectionSet;
// looking for a yes/no question
var yesNoQ = false;

var isBuying;
var maxInput;
var game;
var currentStore;
var itemForSale;

var sparePartIndex = 4;

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var supplies = ["Oxen","Pounds of Food","Sets of Clothing", "Buckets of bait","Wagon Wheels","Wagon Axles","Wagon Tongues"];

var paceNames = ["dummy","Steady", "Strenous", "Grueling"];

var rationNames = ["dummy","Filling","Meager","Bare Bones"];

var landmarks = [{name: "Independence", detail: "fort", distance: 0, multiplier: 0, branch: false, source: ""},
                 {name: "Kansas River", detail: "river", distance: 102, multiplier: 0, branch: false, source: "Landmarks/river.png"},
                 {name: "Big Blue River", detail: "river", distance: 83, multiplier: 0, branch: false, source: "Landmarks/river.png"},
                 {name: "Fort Kearney", detail: "fort", distance: 119, multiplier: 1, branch: false, source: "Landmarks/fort1.png"},
                 {name: "Chimney Rock", detail: "rock", distance: 250, multiplier: 0, branch: false, source: "Landmarks/chimney.png"},
                 {name: "Fort Laramie", detail: "fort", distance: 86, multiplier: 2, branch: false, source: "Landmarks/fort2.png"},
                 {name: "Independence Rock", detail: "rock", distance: 190, multiplier: 0, branch: false, source: "Landmarks/independence.png"},
                 {name: "South Pass", detail: "pass", distance: 102, multiplier: 0, branch: true, source: "Landmarks/southpass.png"},
                 {name: "Green River", detail: "river", distance: 57, multiplier: 0, branch: false, source: "Landmarks/river.png"},
                 {name: "Fort Bridger", detail: "fort", distance: 125, multiplier: 3, branch: false, source: "Landmarks/fort1.png"},
                 {name: "Soda Springs", detail: "springs", distance: 144, multiplier: 0, branch: false, source: "Landmarks/springs.png"},
                 {name: "Fort Hall", detail: "fort", distance: 57, multiplier: 4, branch: false, source: "Landmarks/fort2.png"},
                 {name: "Snake River", detail: "river", distance: 182, multiplier: 0, branch: false, source: "Landmarks/river.png"},
                 {name: "Fort Boise", detail: "fort", distance: 114, multiplier: 5, branch: false, source: "Landmarks/fort1.png"},
                 {name: "Blue Mountains", detail: "rock", distance: 160, multiplier: 0, branch: true, source: "Landmarks/mountains.png"},
                 {name: "Fort Walla Walla", detail: "fort", distance: 55, multiplier: 6, branch: false, source: "Landmarks/fort2.png"},
                 {name: "The Dalles", detail: "river", distance: 120, multiplier: 0, branch: true, source: "Landmarks/dalles.png"},
                 {name: "Willamette Valley", detail: "valley", distance:100, multiplier:0, branch: false, source: "Landmarks/valley.png"}
                ]

//creates a Trade object
function Trade(requestedItem,requestAmount,offeredItem,offeredAmount){
  this.requestedItem = requestedItem;
  this.requestAmount = requestAmount;
  this.offeredItem = offeredItem;
  this.offeredAmount = offeredAmount;
}

var currentTrade; //stores the trade object currently being offered

//Game Class initializes a new Game
function Game(occupation,money,selectionSet){
   this.occupation = occupation;
   this.money = money;
   this.selectionSet = selectionSet;
   this.nextDistance = 0;
   this.totalDistance = 0;
   this.pace = 1;
   this.ration = 1;
   this.currentTown = "Independence"
   this.weather = "Cool"
   this.landmarks = landmarks;
   //rest of the attributes added as they are entered.
}

//getDateString gets the in-game date and formats it appropriately for output
function getDateString(game){
  currentTime = new Date(game.date);
  return monthNames[currentTime.getMonth()] + " " +currentTime.getDate() + ", " + currentTime.getFullYear();
}

//Traveler Class initializes new travelers with name, at full health and without illness
function Traveler(name){
   this.name = name
   this.health = GOOD_HEALTH
   this.illness = "none"
}

//getHealthString determines the average health of the party and then returns the appropriate response
function getHealthString(game){
  totalHealth = 0;
  //get the total health of the party
  for(var i=0;i<game.party.length;i++){
    totalHealth += game.party[i].health;
  }
  //divides the total health by the number of remaining party members
  avgHealth = totalHealth/game.party.length;

  //determines and returns the appropriate response
  if (avgHealth > FAIR_HEALTH){
    return "Good"
  } else if(avgHealth > POOR_HEALTH){
    return "Fair"
  } else if(avgHealth > VERY_POOR_HEALTH){
    return "Poor"
  } else {
    return "Very Poor"
  }
}


$(document).ready(function(){
  $('#userInput').focus();
  $('#userInput').focusout(function(){console.log("unfocus"); $('#userInput').focus();});
});

console.log("here");

// End Trail Information (LearnAboutTheTrail.html)
//set info for the opening menu
function init() {
  selectionSet = MENUSET;
  yesNoQ = 0;
}

//set info for when a player begins the game
function createGame() {
  selectionSet = CREATEGAMESET;
  yesNoQ = 0;
}

//looks for keypresses
$(document).keypress(function(key) {
  //if we are looking for a user response
  if(selectionSet)
  {
	//if the user presses the enter key
    if(key.which == 13) {
	  //gets the input value
      var userInput = document.getElementById("userInput").value;
	  //parses the input
      parseText(userInput);
      // alert("selection was " + userInput);
	  //sets the input back to empty
      document.getElementById("userInput").value = ""; // resets input
    } 
  }
});

//Bootstrap Matt's store
function store(){
  //retrieves the current game
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  //initializes the store
  currentStore = new Items();
  document.getElementById("textBox").innerHTML = "Before leaving Independence you should buy equipment and supplies, you have "+ currentGame.money +" in cash, but don't have to spend it all now."
  document.getElementById("userInput").placeholder = "Press SPACE BAR to continue"
  document.getElementById("userInput").disabled = true
  selectionSet = STOREINTRO1
}

//Add Party Members to game object
function addPartyMembers(){

  var travelers = [];
  //creates travelers using the input names and then adds it to the traveler array
  travelers.push(new Traveler( $('#leaderName').val() ))
  travelers.push(new Traveler( $('#member2').val() ))
  travelers.push(new Traveler( $('#member3').val() ))
  travelers.push(new Traveler( $('#member4').val() ))
  travelers.push(new Traveler( $('#member5').val() ))

  console.log(travelers);
  //gets the current game info
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  //sets the party of the current game equal to the new travelers
  currentGame.party = travelers;

  //pick month departure date
  redirect('pickMonth.html',currentGame)
}

// user picks which month to depart
function chooseMonth(){
  game = JSON.parse(localStorage.getItem('currentGame'));
  selectionSet = PICKMONTHSET; 
}

//returns a random number between 0 and maximumNum - 1
function getRandomNumber(maximumNum){
  return Math.floor(Math.random() * maximumNum); 
}

//called when the user is trading or looking at their inventory
function inventory(){

  //loads the current game info
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  //gets the player's inventory
  var inventory = currentGame.inventory;

  //if trading
  if(currentGame.selectionSet == TRADESET){
  console.log("Trade")
  //set what item a trader would be looking for
  var supplyIndex = getRandomNumber(supplies.length);
  var amountRequested;

  console.log(supplyIndex)

  var canTrade = true;

    //high quantity items like bait or food
    if(supplyIndex == 1 || supplyIndex == 3){
	  //set trader request amount to be between 1 and 250
      amountRequested = getRandomNumber(250) + 1; 
    } else {
	  //set trader request amount to be either 1 or 2
      amountRequested = getRandomNumber(2) + 1;
    }
  //check if the player has enough of the requested item to trade with the trader
  switch(supplyIndex+1){
    case 1:
        canTrade = currentGame.inventory.oxen > amountRequested 
        break;
    case 2:
        canTrade = currentGame.inventory.food > amountRequested 
        break;
      case 3:
        canTrade = currentGame.inventory.clothing > amountRequested 
      break;
        case 4:
        canTrade = currentGame.inventory.bait > amountRequested 
      break;
        case 5:
        canTrade = currentGame.inventory.wagonWheel > amountRequested 
      break;
        case 6:
        canTrade = currentGame.inventory.wagonAxle > amountRequested 
      break;
        case 7:
        canTrade = currentGame.inventory.wagonTongue > amountRequested 
      break;
      default:
      console.log("ERROR!")
      break;
    }
      //if the player is unable to trade (ie. does not have enough of the requested item) display info telling the player 
      if(!canTrade){
        document.getElementById("request").innerHTML = "You meet another emigrant who wants " + amountRequested + " " + supplies[supplyIndex];
        document.getElementById("requestResult").innerHTML = "You do not have this";
        selectionSet = CANTTRADESET;
        document.getElementById("userDirections").style.display = "block";

      } else { //if they are able to trade

        document.getElementById("userInput").style.display = "block";

        var offeredItem;
        var amountOffered;
		
		//determine what item the trader will offer, ensuring that it isn't the same item as what they are requesting
        do{
          offeredItem = getRandomNumber(supplies.length);
        }
        while(offeredItem == supplyIndex);

        //high quantity items like bait or food
        if(offeredItem == 1 || offeredItem == 3){
		  //set amount offered to be between 1 and 250
          amountOffered = getRandomNumber(250) + 1;
        } else {
		  //set amount offered to be either 1 or 2
          amountOffered = getRandomNumber(2) + 1;
        }
        //display the request to the player and ask if they are willing to trade
        document.getElementById("request").innerHTML = "You meet another emigrant who wants " + amountRequested + " " + supplies[supplyIndex] +". He will trade you "+ amountOffered + " " + supplies[offeredItem];
        document.getElementById("requestResult").innerHTML = "Are you willing to trade?"
        //create the trade and check for the player's answer
        yesNoQ = true;
        selectionSet = ACCEPTTRADESET;
        currentTrade = new Trade(supplyIndex,amountRequested,offeredItem,amountOffered);
      }

  } else if(currentGame.selectionSet == VIEWINVENTORYSET){ //if viewing the inventory, display how much money the player has
    console.log("View Supplies");
    document.getElementById("moneyLeft").style.display = "block";
    document.getElementById("moneyLeft").innerHTML = "Money left $" + currentGame.money.toFixed(2);
  } 
  //display everything in the player's inventory
  document.getElementById("oxenrow").innerHTML = "Oxen " + inventory.oxen;
  document.getElementById("foodrow").innerHTML = "Food " + inventory.food;
  document.getElementById("clothingrow").innerHTML = "Clothing " + inventory.clothing;
  document.getElementById("baitrow").innerHTML = "Bait " + inventory.bait;
  document.getElementById("wheelrow").innerHTML = "Wagon wheels " + inventory.wagonWheel;
  document.getElementById("axlerow").innerHTML = "Wagon axles " + inventory.wagonAxle;
  document.getElementById("tonguerow").innerHTML = "Wagon toungues " + inventory.wagonTongue;
  
}

//bootstrap the store when along the road
function roadStore(){
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  selectionSet = ROADSTORESET

  isBuying = false;
  //display the road store info
  document.getElementById("itemBuying").style.display = "none";
  document.getElementById("oxenrow").innerHTML = "Oxen " + OXENCOST_ROAD + " per ox";
  document.getElementById("foodrow").innerHTML = "Food " + FOODCOST_ROAD + " per pound"
  document.getElementById("clothingrow").innerHTML = "Clothing " + CLOTHINGCOST_ROAD + " per set";
  document.getElementById("baitrow").innerHTML = "Bait " + BAITBOXCOST_ROAD + " per bucket";
  document.getElementById("wheelrow").innerHTML = "Wagon wheels " + SPAREPARTCOST_ROAD + " per wheel";
  document.getElementById("axlerow").innerHTML = "Wagon axles " + SPAREPARTCOST_ROAD + " per axle";
  document.getElementById("tonguerow").innerHTML = "Wagon toungues " + SPAREPARTCOST_ROAD + " per toungue";
  document.getElementById("moneyAmount").innerHTML = "You have $" + currentGame.money.toFixed(2) + " to spend";
}

//prepare to purchase from matt's store
function purchase(amount){

  amount = parseInt(amount)
  //add the selected item and amount to the store
  switch(itemForSale){
    case 'oxen':
      currentStore.oxen = amount*2;
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

//prepare to purchase from a store on the road
function purchaseFromRoad(amount){

  var currentGame = JSON.parse(localStorage.getItem('currentGame'));

  amount = parseInt(amount)

  //check if the player can afford what they want and that they will not exceed the max carry amount of an item
  switch(itemForSale){
    case 'oxen':
      if(amount * OXENCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.oxen > MAXOXEN){
        alert("You can't have more than " + MAXOXEN + " oxen");
      }else {
        currentGame.money -= amount * OXENCOST_ROAD;
        currentGame.inventory.oxen += amount;
      }
      break;
    case 'pounds':
      if(amount * FOODCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.food > MAXFOOD){
        alert("You can't have more than " + MAXFOOD + " pounds of food");
      } else {
        currentGame.money -= amount * FOODCOST_ROAD;
        currentGame.inventory.food += amount;
      }      
      break;
     case 'sets':
      if(amount * CLOTHINGCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.clothing > MAXCLOTHES){
        alert("You can't have more than " + MAXCLOTHES + " sets of clothes");
      } else {
        currentGame.money -= amount * CLOTHINGCOST_ROAD;
        currentGame.inventory.clothing += amount;
      }     
      break;
      case 'buckets':
      if(amount * BAITBOXCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.bait > MAXBAIT){
        alert("You can't have more than " + MAXBAIT + " buckets of bait");
      } else {
        currentGame.money -= amount * BAITBOXCOST_ROAD;
        currentGame.inventory.bait += amount;
      }
     break;
     case 'wheels':
      if(amount * SPAREPARTCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.wagonWheel > MAXSPAREPARTS){
        alert("You can't have more than " + MAXSPAREPARTS + " of any type of spare part");
      } else {
        currentGame.money -= amount * SPAREPARTCOST_ROAD;
        currentGame.inventory.wagonWheel += amount;
      } 
     break;
    case 'axles':
      if(amount * SPAREPARTCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.wagonAxle > MAXSPAREPARTS){
        alert("You can't have more than " + MAXSPAREPARTS + " of any type of spare part");
      } else {
        currentGame.money -= amount * SPAREPARTCOST_ROAD;
        currentGame.inventory.wagonAxle += amount;
      } 
     break;
    case 'tongues':
      if(amount * SPAREPARTCOST_ROAD > currentGame.money){
        alert("You can't afford that")
      } else if(amount + currentGame.inventory.wagonTongue > MAXSPAREPARTS){
        alert("You can't have more than " + MAXSPAREPARTS + " of any type of spare part");
      } else {
        currentGame.money -= amount * SPAREPARTCOST_ROAD;
        currentGame.inventory.wagonTongue += amount;
      } 
     break;
  }

  console.log(currentGame.inventory);

  roadStore();
}
//called when the user leaves matt store with too large a bill 
//displays an output telling the player that they cannot afford everything
function notEnoughMoney(){
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));

  document.getElementById("choiceBox").style.display = "none";

  selectionSet = NOTENOUGHMONEYSET
  document.getElementById("userInput").placeholder = "Press SPACE BAR to continue"
  document.getElementById("userInput").disabled = true
  document.getElementById("currentMoney").style.display = "none";
  document.getElementById("resultBox").style.display = "block"
  document.getElementById("resultText").innerHTML = "Okay, that comes out to a total of $" + currentStore.getBill() + ". But I see that you only have $" +currentGame.money + " We'd better go over that list again."
}

//user successfully checks out matt's store
//displays an output sending the player off on their journey
function storeOutro(){
 selectionSet = STOREOUTROSET
  document.getElementById("userInput").placeholder = "Press SPACE BAR to continue"
  document.getElementById("userInput").disabled = true
  document.getElementById("choiceBox").style.display = "none";
 document.getElementById("currentMoney").style.display = "none";
  document.getElementById("resultBox").style.display = "block"
  document.getElementById("resultText").innerHTML = "Well then, you're ready to start. Good luck! You have a long and difficult journey ahead of you."
}

//function handling a user buying multiple parts
function handleSpareParts(){
  var part;
  //determines which part is being bought
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
  //displays the correct part for purchase
  document.getElementById("sparePartSale").style.display = "block";
  document.getElementById("sparePartSale").innerHTML = "wagon " +part+ " -$10 each";
  document.getElementById("userInput").placeholder = "Enter your purchase amount for wagon " + part + "s"
}

//handles an accepted trade by adjusting the player's inventory appropriately
function acceptTrade(trade){
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));

    console.log("Before Trade: " + JSON.stringify(currentGame.inventory));
	//remove the requested amount of the requested item from the player's inventory
    switch(trade.requestedItem + 1){
      case 1:
        currentGame.inventory.oxen -= trade.requestAmount;
        break;
      case 2:
        currentGame.inventory.food -= trade.requestAmount;
        break;
      case 3:
        currentGame.inventory.clothing -= trade.requestAmount;
      break;
        case 4:
        currentGame.inventory.bait -= trade.requestAmount;
      break;
        case 5:
        currentGame.inventory.wagonWheel -= trade.requestAmount;
      break;
        case 6:
        currentGame.inventory.wagonAxle -= trade.requestAmount;
      break;
        case 7:
        currentGame.inventory.wagonTongue -= trade.requestAmount;
      break;
      default:
      console.log("ERROR!")
      break;
    }
	//add the amount of the offered item to the player's inventory
    switch(trade.offeredItem + 1){
      case 1:
        currentGame.inventory.oxen += trade.offeredAmount;
        break;
      case 2:
        currentGame.inventory.food += trade.offeredAmount;
        break;
      case 3:
        currentGame.inventory.clothing += trade.offeredAmount;
      break;
        case 4:
        currentGame.inventory.bait += trade.offeredAmount;
      break;
        case 5:
        currentGame.inventory.wagonWheel += trade.offeredAmount;
      break;
        case 6:
        currentGame.inventory.wagonAxle += trade.offeredAmount;
      break;
        case 7:
        currentGame.inventory.wagonTongue += trade.offeredAmount;
      break;
      default:
      console.log("ERROR!")
      break;
    }

    console.log("After Trade: " + JSON.stringify(currentGame.inventory));
	//return to main status page
    redirect("status.html",currentGame);
}

//handles all text input
function parseText(text)
{
  var currentGame = JSON.parse(localStorage.getItem('currentGame'));
  // if it is a yes no question, parse differently
  if(yesNoQ)
  {
	//if the response begins with 'y', treat as a yes
    if(text.match(/^y/))
    {
      console.log("selection was yes");
	  //accept the trade
      switch(selectionSet){
        case ACCEPTTRADESET:
          acceptTrade(currentTrade);
          break;
      }
    }
    else if (text.match(/^n/)) //if the response begins with 'n', treat as a no
    {
      console.log("selection was no");
	  //return to the main status page
      switch(selectionSet){
        case ACCEPTTRADESET:
          redirect("status.html",currentGame);
          break;
      }
    }
    else
    {
      console.log("selection didn't match");
    }
  } else if (isBuying && selectionSet == STOREMAINMENU){
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
  } else if( isBuying && selectionSet == ROADSTORESETCONFIRM){
      console.log("Buying from road");
      purchaseFromRoad(text);
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
          game = new Game("Banker",1600),selectionSet;
          selectionSet=PARTYSELECTSET;
          redirect('partyForm.html',game)
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 2, 1);
          redirect('store.html',game);
        } else if(selectionSet == STOREMAINMENU){
          showItem("oxen");
        } else if(selectionSet == ROADSTORESET){
          showRoadItem("oxen");
        } else if(selectionSet == STATUSSET){
          if(currentGame.landmarks[0].detail == "river")
          {
            currentGame.landmarks.splice(0,1);
            redirect('riverCrossing.html',currentGame)
          }
          redirect('traveling.html',currentGame);
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
          game = new Game("Carpenter",800),selectionSet;
          selectionSet=PARTYSELECTSET;
          redirect('partyForm.html',game)
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 3, 1);
          redirect('store.html',game);
        } else if(selectionSet == STOREMAINMENU){
          showItem("food");
        } else if(selectionSet == ROADSTORESET){
          //food
          showRoadItem("pounds");
        } else if(selectionSet == STATUSSET){
          selectionSet = VIEWINVENTORYSET
          redirect("inventory.html",currentGame);
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
          game = new Game("Farmer",400,selectionSet);
          selectionSet=PARTYSELECTSET;
          redirect('partyForm.html',game)
        } else if(selectionSet == PICKMONTHSET) {
          game.date = new Date(1848, 4, 1);
          redirect('store.html',game);
        } else if(selectionSet == STOREMAINMENU){
          showItem("clothing");
        } else if(selectionSet == ROADSTORESET){
          //clothing
          showRoadItem("sets");
        } else if(selectionSet == STATUSSET){
          redirect('map.html',currentGame);
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
        } else if(selectionSet == ROADSTORESET){
          //bait
          showRoadItem("buckets");
        } else if(selectionSet == STATUSSET){
          //TODO change pace
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
        } else if(selectionSet == ROADSTORESET){
          showRoadItem("wheels");
        } else if(selectionSet == STATUSSET){
          //TODO change ration
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
          
        }else if(selectionSet == ROADSTORESET){
          showRoadItem("axles");
        } else if(selectionSet == STATUSSET){
          //TODO rest
        }
        else
        {
          
        }
        break;
      case '7':
      if(selectionSet == ROADSTORESET){
          showRoadItem("tongues");
      } else if(selectionSet == STATUSSET){
        selectionSet = TRADESET;
        redirect("inventory.html",currentGame);
      }else {

      }
      break;
      case '8':
      if(selectionSet == STATUSSET){
        //TODO Talk
      }
      break;
      case '9':
      if(selectionSet == STATUSSET){
        redirect("roadStore.html",currentGame);
      }
      break;
      default:
        //do stuff
        console.log("selection was invalid");
        break;
    }
  }

}

function status(){
    var currentGame = JSON.parse(localStorage.getItem('currentGame'));
    selectionSet = STATUSSET;
    console.log(currentGame);
    document.getElementById("date").innerHTML = getDateString(currentGame);
    document.getElementById("town").innerHTML = currentGame.currentTown;
    document.getElementById("weather").innerHTML = "Weather: " +currentGame.weather;
    document.getElementById("health").innerHTML = "Health: "+ getHealthString(currentGame);
    document.getElementById("pace").innerHTML = "Pace: "+paceNames[currentGame.pace]
    document.getElementById("rations").innerHTML = "Rations: " +rationNames[currentGame.ration];
}

function showRoadItem(item){
  isBuying = true;
  itemForSale = item;
  selectionSet = ROADSTORESETCONFIRM
  document.getElementById("itemBuying").innerHTML = "How Many " + item + " ?";
  document.getElementById("itemBuying").style.display = "block";

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
  gameState.selectionSet = selectionSet;
  localStorage.setItem('currentGame', JSON.stringify(gameState));
  $(location).attr('href', path)
}
//defines item class used in stores and inventories
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
    return this.oxen/2 * OXENCOST + this.food * FOODCOST + this.clothing * CLOTHINGCOST +
      this.bait * BAITBOXCOST + this.getNumSpareParts() * SPAREPARTCOST;
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

  document.getElementById("resultBox").style.display = "none"

  document.getElementById("sparePartSale").style.display = "none";
  document.getElementById("oxenrow").innerHTML = "Oxen $" + (currentStore.oxen * OXENCOST).toFixed(2);
  document.getElementById("foodrow").innerHTML = "Food $" + (currentStore.food * FOODCOST).toFixed(2);
  document.getElementById("clothingrow").innerHTML = "Clothing $" + (currentStore.clothing * CLOTHINGCOST).toFixed(2);
  document.getElementById("baitrow").innerHTML = "Bait $" + (currentStore.bait * BAITBOXCOST).toFixed(2);
  document.getElementById("sparepartsrow").innerHTML = "Spare Parts $" + (currentStore.getNumSpareParts() * SPAREPARTCOST).toFixed(2);
  document.getElementById("currentMoney").innerHTML = "Amount you have: $" + currentGame.money.toFixed(2);
  document.getElementById("currentMoney").style.display = "block"; 

  document.getElementById("storeHeader").style.display = "block"
  document.getElementById("userInput").placeholder = "Which item would you like to buy?"
  document.getElementById("userInput").disabled = false
  document.getElementById("userInput").focus(); // added by Kwame (removes the placeholder but autofocuses)
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

	$(document).keypress(function (e) {
	  if (e.keyCode === 32) {
      var currentGame = JSON.parse(localStorage.getItem('currentGame'));
	    //e.preventDefault();
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
          } else if(currentStore.getBill() > currentGame.money){
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
          //matt sells oxen in pairs
          currentGame.inventory.oxen *= 2;
          currentGame.money = currentGame.money - currentStore.getBill();
          redirect("landmark.html",currentGame);
          break;
        case CANTTRADESET:
          redirect("status.html",currentGame);
      }

	  }
	});
// }

// function switchPage(removeID, showID) {
// 	document.getElementById(removeID).style.display = 'none';
// 	document.getElementById(showID).style.display = 'block';
// }
