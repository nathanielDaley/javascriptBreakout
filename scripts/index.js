const canvas = document.querySelector(".canvas");
/** @type {CanvasRenderingContext2D} */
const canvasContext = canvas.getContext("2d");

canvasContext.beginPath();
canvasContext.rect(20, 40, 50, 50);
canvasContext.fillStyle = "#FF0000";
canvasContext.fill();
canvasContext.closePath();

canvasContext.beginPath();
canvasContext.arc(240, 160, 20, 0, Math.PI * 2, false);
canvasContext.fillStyle = "green";
canvasContext.fill();
canvasContext.closePath();

canvasContext.beginPath();
canvasContext.rect(160, 10, 100, 40);
canvasContext.strokeStyle = "rgb(0 0 255 / 50%)";
canvasContext.stroke();
canvasContext.closePath();
