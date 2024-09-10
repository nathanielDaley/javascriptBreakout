const canvas = document.querySelector(".canvas");
/** @type {CanvasRenderingContext2D} */
const canvasContext = canvas.getContext("2d");
const startButton = document.querySelector(".canvas__button");

const ballRadius = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let balldX = 2;
let balldY = -2;

const draw = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

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
};

const drawBall = () => {
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  canvasContext.fillStyle = "#0095DD";
  canvasContext.fill();
  canvasContext.closePath();
};

function startGame() {
  setInterval(draw, 10);
}

startButton.addEventListener("click", () => {
  startGame();
  startButton.disabled = true;
});
