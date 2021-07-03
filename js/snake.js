//Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

//Game functions
function main(cTime) {      //currenttime
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
  //console.log(ctime);
}
//collide function
 function isCollide(snake) 
 {
  //if snake  hit yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if snake hit into the wall
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0) {
    return true;
  }

}
function gameEngine() {
  //update snake array and food
  if (isCollide(snakeArr)) {
    gameoverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over,Press any Key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  //If you have eaten the food ,increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if(score>hiscore)
    {
      hiscoreval =score;
      localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HIScore:" + hiscoreval;
    }
    scoreBox.innerHTML ="Score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
  }
  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    }
    else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

}


//logics
musicSound.play();
let hiscore =localStorage.getItem("hiscore");
if(hiscore == 0)
{
  hiscoreval = 0;
  localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else
{
   hiscoreval = JSON.parse(hiscore);
   hiscoreBox.innerHTML = "HIScore:" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  inputDir = { x: 0, y: 1 }    //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
})