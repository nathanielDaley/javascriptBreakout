const canvas = document.querySelector(".canvas");
/** @type {CanvasRenderingContext2D} */
const canvasContext = canvas.getContext("2d");
const startButton = document.querySelector(".canvas__button");

//Ball variables
const ballRadius = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let balldX = 2;
let balldY = -2;

//Paddle variables
const paddleHeight = 10;
const paddleWidth = 75;
const paddleDX = 7;

let paddleX = (canvas.width - paddleWidth) / 2;

//For keyboard interaction
let rightPressed = false;
let leftPressed = false;

const draw = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  //If the ball is going to go past the left or right walls
  //reverse the X direction
  if (
    ballX + balldX > canvas.width - ballRadius ||
    ballX + balldX < ballRadius
  ) {
    balldX = -balldX;
  }

  //If the ball is going to go past the top or bottom walls
  //reverse the Y direction
  if (
    ballY + balldY > canvas.height - ballRadius ||
    ballY + balldY < ballRadius
  ) {
    balldY = -balldY;
  }

  ballX += balldX;
  ballY += balldY;

  //Change paddle based on left or right keyboard key pressed
  if (rightPressed) {
    paddleX = Math.min(paddleX + paddleDX, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - paddleDX, 0);
  }
};

//Draw functions
const drawBall = () => {
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  canvasContext.fillStyle = "#0095DD";
  canvasContext.fill();
  canvasContext.closePath();
};

const drawPaddle = () => {
  canvasContext.beginPath();
  canvasContext.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  canvasContext.fillStyle = "#0095DD";
  canvasContext.fill();
  canvasContext.closePath();
};

//Keyboard functions
const keyDownHandler = (evt) => {
  if (evt.key === "Right" || evt.key === "ArrowRight") {
    rightPressed = true;
  } else if (evt.key === "Left" || evt.key === "ArrowLeft") {
    leftPressed = true;
  }
};

function keyUpHandler(evt) {
  if (evt.key === "Right" || evt.key === "ArrowRight") {
    rightPressed = false;
  } else if (evt.key === "Left" || evt.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function startGame() {
  setInterval(draw, 10);
}

//When Start Button is clicked
startButton.addEventListener("click", () => {
  startGame();
  startButton.disabled = true;
});

//When keyboard keys are pressed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
