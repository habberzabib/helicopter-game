// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";
let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let mouseIsPressed = false;

// Global variables (reset)
let state;
let heli;
let wall1;
let wall2;
let wall3;
let distance = 0;
let bestDistance = 0;
let wallSpeed = 3; // Initial wall speed
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// EVENTS

document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mouseup", mouseUpHandler);

function mouseDownHandler() {
  mouseIsPressed = true;

  // Play propeller
  propeller.currentTime = 0;
  propeller.play();

  // Start game on mouse down
  if (state === "start") {
    state = "gameon";
  }
}

function mouseUpHandler() {
  mouseIsPressed = false;
  propeller.pause();
}
