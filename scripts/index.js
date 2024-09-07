const canvas = document.querySelector(".canvas");
/** @type {CanvasRenderingContext2D} */
const canvasContext = canvas.getContext("2d");
const startButton = document.querySelector(".canvas__button");

let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let balldX = 2;
let balldY = -2;

const draw = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

  ballX += balldX;
  ballY += balldY;
};

const drawBall = () => {
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2);
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
  startButton.classList.add(".canvas__button_type_disabled");
});
