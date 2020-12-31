// user selects from rock, paper, scissors
// computer randomly selects a new move to battle user with
// display image based on each players choices
// keep track of scores
// display a winner for each background
// CACHED ELEMENT REFERENCES
//-Images
const pImgEl = document.getElementById("player");
const cImgEl = document.getElementById("computer");
//-Scores
const pScore = document.getElementById("player-score");
const cScore = document.getElementById("computer-score");
const tScore = document.getElementById("tie-score");

// STATE
//variables
let winner, results, scores;
// -Each players scores

// Winner
function getWinner() {
  // t for tie, p for player, c for computer
 if (results.p === results.c) {
   return "t";
 }
 // we can also use brackets to access a property in RPSLibrary that we'll set with a variable
 if (RPSLibrary[results.p].defeats === results.c) {
   return "p";
 }
 return "c";
}

// -The available weapons and which opponent they defeat
const RPS = ["rock", "paper", "scissors"];
// - Available images associated with each weapon
const RPSLibrary = {
  rock: {
    images: [
      {
        path: 'images/rock1.png',
        alt: 'a boulder'
      },
      {
        path: 'images/rock2.png',
        alt: 'another rock'
      }
  ],
  defeats: 'scissors'
  },
  paper: {
    images: [
      {
        path: 'images/paper1.png',
        alt: 'a paper'
      },
      {
        path: 'images/paper2.png',
        alt: 'another paper'
      }
    ],
    defeats: 'rock'
  },
  scissors: {
    images: [
      {
        path: 'images/scissors1.png',
        alt: 'a pair of scissors'
      },
      {
        path: 'images/scissors2.png',
        alt: 'another scissors'
      }
    ],
    defeats: 'paper'
  }
};


function render() {
  // select random images from our RPS library for p and c
  const pImgArr = RPSLibrary[results.p].images;
  const pLength = pImgArr.length;
  const pImg = pImgArr[Math.floor(Math.random() * pLength)];
  const cImgArr = RPSLibrary[results.c].images;
  const cLength = cImgArr.length;
  const cImg = cImgArr[Math.floor(Math.random() * cLength)];
  // update scores
  pScore.innerHTML = scores.p;
  cScore.innerHTML = scores.c;
  tScore.innerHTML = scores.t;
  // update images
  pImgEl.src = pImg.path;
  pImgEl.alt = pImg.alt;
  cImgEl.src = cImg.path;
  cImgEl.alt = cImg.alt;
  highlight();
  stopGame();
}


  // highlight the winner
function highlight() {
  if (winner === 'p') {
    pImgEl.style.borderColor = "gold";
    cImgEl.style.borderColor = "white";
    return;
  }
  if (winner === 'c') {
    pImgEl.style.borderColor = "white";
    cImgEl.style.borderColor = "gold";
    return;
  }
  pImgEl.style.borderColor = "white";
  cImgEl.style.borderColor = "white";
};

// EVENT LISTENERS
// -Clicking an attack
//add double click secret bomb
document.getElementById("rock-btn").addEventListener('click', handleTurnR);
document.getElementById("paper-btn").addEventListener('click', handleTurnP);
document.getElementById("scissors-btn").addEventListener('click', handleTurnS);

// FUNCTIONS
// -Computer's random choice
const randomPicker = () => {
  const weapon = RPS[Math.floor(Math.random() * 3)];
  return weapon
};
// -Determine winner
function handleResults () {
  results.c = randomPicker();
  winner = getWinner();
  scores[winner]++;
  console.log('turn taken', results, winner, scores);
  render();
}
function handleTurnR() {
  results.p = 'rock';
  handleResults();
}
function handleTurnP() {
  results.p = 'paper';
  handleResults();
}
function handleTurnS() {
  results.p = 'scissors';
  handleResults();
}
//Initialize(instantiate) scores and results objects?
function init() {
  scores = {
    p: 0,
    t: 0,
    c: 0
  };
  results = {
    p: '',
    c: ''
  };
  winner = null;
}
init();

// -Display the results

//only if user is beating computer play we are the champions otherwise I'm a loser
function playWin() {
  let audio = new Audio('sounds/champ.mp3');
  audio.play();
}
function playLose() {
  let audio = new Audio('sounds/loser.mp3');
  audio.play();
}
//after 5 games change background and play corresponding audio
const body = document.getElementById('body');

function stopGame() {
  let scoreTotal = scores.p + scores.c;
  while (scoreTotal == 3) {
    if (scores.p > scores.c) {
      return playWin();
    } else if (scores.p < scores.c){
      return playLose();
    }

  }
}
