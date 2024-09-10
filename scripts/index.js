const canvas = document.querySelector(".canvas");
/** @type {CanvasRenderingContext2D} */
const canvasContext = canvas.getContext("2d");
const startButton = document.querySelector(".canvas__button");

let interval = 0;

const objectColor = "#0095DD";

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

//Brick variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

//For keyboard interaction
let rightPressed = false;
let leftPressed = false;

const draw = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  //If the ball is going to go past the left or right walls
  //reverse the X direction
  if (
    ballX + balldX > canvas.width - ballRadius ||
    ballX + balldX < ballRadius
  ) {
    balldX = -balldX;
  }

  //If the ball is going to go past the top wall or hits the paddle
  //reverse the Y direction
  //If the ball hits the bottom of the screen Game Over
  if (ballY + balldY < ballRadius) {
    balldY = -balldY;
  } else if (
    ballY + balldY + paddleHeight > canvas.height - ballRadius &&
    ballX >= paddleX &&
    ballX <= paddleX + paddleWidth
  ) {
    balldY = -balldY;
  } else if (ballY + balldY > canvas.height - ballRadius) {
    alert("Game Over");
    document.location.reload();
    clearInterval(interval);
  }

  // Update ball position
  ballX += balldX;
  ballY += balldY;

  //Change paddle based on left or right keyboard key pressed
  if (rightPressed) {
    paddleX = Math.min(paddleX + paddleDX, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - paddleDX, 0);
  }

  //Draw objects
  drawBricks(objectColor);
  drawBall(objectColor);
  drawPaddle(objectColor);
};

//Draw functions
const drawBall = (color) => {
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  canvasContext.fillStyle = color;
  canvasContext.fill();
  canvasContext.closePath();
};

const drawPaddle = (color) => {
  canvasContext.beginPath();
  canvasContext.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  canvasContext.fillStyle = color;
  canvasContext.fill();
  canvasContext.closePath();
};

const drawBricks = (color) => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      canvasContext.beginPath();
      canvasContext.rect(brickX, brickY, brickWidth, brickHeight);
      canvasContext.fillStyle = color;
      canvasContext.fill();
      canvasContext.closePath();
    }
  }
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
  interval = setInterval(draw, 10);
}

//When Start Button is clicked
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startGame();
});

//When keyboard keys are pressed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
