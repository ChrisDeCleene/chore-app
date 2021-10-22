const door1 = document.getElementById('door1');
const door2 = document.getElementById('door2');
const door3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
let openDoor1, openDoor2, openDoor3;
let numClosedDoors = 3;
let currentlyPlaying = false;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
    console.log('Game Over');
  } else if (isBot(door)) {
    gameOver();
  } else {
    return;
  }
};

const randomChoreDoorGenerator = () => {
  choreDoor = Math.floor(Math.random() * 6);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 2:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 3:
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 4:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
    case 5:
      openDoor3 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor2 = beachDoorPath;
      break;
  }
};

door1.onclick = () => {
  if(currentlyPlaying && !isClicked(door1)) {
    door1.src = openDoor1;
    playDoor(door1);
  }
};

door2.onclick = () => {
  if(currentlyPlaying && !isClicked(door2)) {
    door2.src = openDoor2;
    playDoor(door2);
  }
};

door3.onclick = () => {
  if(currentlyPlaying && !isClicked(door3)) {
    door3.src = openDoor3;
    playDoor(door3);
  }
};

startButton.onclick = () => {
  startRound();
};

const startRound = () => {
  if(!currentlyPlaying) {
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
  }
};

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    getYourScore();
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    score = 0;
    currentStreak.innterHTML = score;
  }
  currentlyPlaying = false;
};

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
}

startRound();