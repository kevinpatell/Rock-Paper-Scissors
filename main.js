document.addEventListener('DOMContentLoaded', function () {
  
  const images = document.getElementsByClassName('img');
  
  let rpsGame = (yourChoice) => {
    let humanChoice, botChoice;
    humanChoice = yourChoice.target.id;
    botChoice = randomBotRpsChoice(randomBotIntChoice());
    results = decideWinnner(humanChoice, botChoice);
    message = resultMessage(results);
    score = scoreCard(results);
    displayResult(humanChoice, botChoice, message);
  };
  
  for(i=0; i<images.length; i++) {
    images[i].addEventListener('click', rpsGame);
  }
  
  let randomBotIntChoice = () =>  Math.floor((Math.random()) * 9);
  
  let randomBotRpsChoice = (number) => {
    gameChoices = ['rock', 'paper', 'scissors','paper', 'scissors', 'rock', 'scissors', 'rock', 'paper'];
    return gameChoices[number];
  };
  
  let decideWinnner = (humanChoice, botChoice) => {
    let gameScenarios = { 
      'rock': 
      {
        'scissors': 1, 
        'rock': 0.5, 
        'paper': 0 
      },
      'paper': {
        'rock': 1,
        'paper': 0.5,
        'scissors': 0
      },
      'scissors': {
        'paper': 1,
        'scissors': 0.5,
        'rock': 0
      },
    };
    
    let humanScore = gameScenarios[humanChoice][botChoice];
    let botScore = gameScenarios[botChoice][humanChoice];
    
    return [humanScore, botScore];
  };
  
  let resultMessage = ([humanScore, botScore]) => {
    let firstmsg = 'You'; 
    if (humanScore === 0) {
      return {'message': firstmsg + ' Lost !', 'color': 'red'};
    } else if (humanScore === 0.5) {
      return {'message': firstmsg  + ' Tied','color': 'yellow'
    };
  } else {
    return {
      'message': firstmsg + ' Won','color': 'green'};
    }
  };
  
  let humanScoreCard = 0;
  let botScoreCard = 0;
  let scoreCard = ([humanScore, botScore]) => {
    if (humanScore === 1) {
      humanScoreCard++;
      botScoreCard = botScoreCard;
    } else if (humanScore === 0) {
      botScoreCard++;
      humanScoreCard = humanScoreCard; 
    } 
    return [humanScoreCard, botScoreCard];
  };
  
  let displayResult = (humanImageChoice, botImageChoice, resultMessage) => {
    let imagesDatabase = {
      'rock': document.getElementById('rock').src,
      'paper': document.getElementById('paper').src,
      'scissors': document.getElementById('scissors').src,
    };
    
    document.getElementById('human-selection').innerHTML = "";
    document.getElementById('bot-selection').innerHTML= "";
    
    let humanBox = document.createElement('div');
    let botBox = document.createElement('div');
    humanBox.setAttribute('class', 'human-choice choices');
    botBox.setAttribute('class', 'bot-choice choices');
    
    humanBox.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150>";
    botBox.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150'>";
    humanBox.style.padding = "70px";
    botBox.style.padding = "70px";
    document.getElementById('human-selection').appendChild(humanBox);
    document.getElementById('bot-selection').appendChild(botBox);
    
    let msg = document.getElementById('message');
    msg.innerHTML= "<h3 style='color: " + resultMessage.color + "; ; font-size:2rem;'>" + resultMessage.message;

    document.getElementById('game').style.padding="1.7rem 0 6rem 0";

    document.getElementById('human-score').innerHTML = humanScoreCard;
    document.getElementById('bot-score').innerHTML = botScoreCard;
  };
});
