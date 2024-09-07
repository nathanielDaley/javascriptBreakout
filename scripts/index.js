const canvas = document.querySelector(".canvas");
/** @type {CanvasRenderingContext2D} */
const canvasContext = canvas.getContext("2d");

canvasContext.beginPath();
canvasContext.rect(20, 40, 50, 50);
canvasContext.fillStyle = "#FF0000";
canvasContext.fill();
canvasContext.closePath();
