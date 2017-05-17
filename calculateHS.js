

function calculateHighScore(currentGame){
    var highScore = 0;

    for(var i=0;i < currentGame.party.length;i++){
        highScore += currentGame.party[i].health;
    }

    highScore += currentGame.party.getNumOxen() * 4;
    highScore += currentGame.party.getNumParts() * 2;
    highScore += currentGame.party.getNumClothing() * 2;
    highScore += (currentGame.party.getNumBullets()/50) * 2;
    highScore += (currentGame.party.getNumFood()/25) * 2;
    highScore += (currentGame.party.getNumBullets()/5) * 2;

    if (currentGame.occupation == "Carpenter"){
        highScore *= 2
    } else if(currentGame.occupation == "Farmer") {
        highScore *= 3
    }

    return highScore;
}