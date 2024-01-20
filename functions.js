// FUNCTIONS

// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

function runGame() {
  // Logic
  moveHeli();
  moveWalls();
  checkCollisions();
  distance++;

  // Draw
  drawGame();
}

function moveHeli() {
  // Accelerate upward if mouse is pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }
  // Apply gravity
  heli.speed += heli.a;

  // Constrain speed
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move by its speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Increase wall speed as the game progresses
  wallSpeed += 0.001;

  // Wall 1
  wall1.x += -wallSpeed;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }

  // Wall 2
  wall2.x += -wallSpeed;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }

  // Wall 3
  wall3.x += -wallSpeed;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }
}

function checkCollisions() {
  // Collision with top and bottom green
  if (heli.y < 50 || heli.y + heli.h > cnv.height - 50) {
    gameOver();
    setTimeout(reset, 2000);
  }

  // Collision with walls
  if (
    heli.x < wall1.x + wall1.w &&
    heli.x + heli.w > wall1.x &&
    heli.y + heli.h > wall1.y &&
    heli.y < wall1.y + wall1.h
  ) {
    gameOver();
    setTimeout(reset, 2000);
  } else if (
    heli.x < wall2.x + wall2.w &&
    heli.x + heli.w > wall2.x &&
    heli.y + heli.h > wall2.y &&
    heli.y < wall2.y + wall2.h
  ) {
    gameOver();
    setTimeout(reset, 2000);
  } else if (
    heli.x < wall3.x + wall3.w &&
    heli.x + heli.w > wall3.x &&
    heli.y + heli.h > wall3.y &&
    heli.y < wall3.y + wall3.h
  ) {
    gameOver();
    setTimeout(reset, 2000);
  }
}
function gameOver() {
  explosion.play();
  state = "gameover";
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);

  // Best Distance Text
  ctx.font = "20px Consolas";
  if (distance > best) {
    best = distance;
  }
  ctx.fillText("BEST: " + best, cnv.width - 150, cnv.height - 15);
}

// Helper functions
function reset() {
  state = "start";
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    a: 0.7,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };

  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };

  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };

  //reset distance
  distance = 0;
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText("DISTANCE: " + distance, 25, cnv.height - 15);
  ctx.fillStyle = "green";
  ctx.fillRect(cnv.width - 250, cnv.height - 50, 200, 50);
  ctx.fillStyle = "black";
  ctx.fillText("BEST: " + best, cnv.width - 250, cnv.height - 15);
  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}

function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}
