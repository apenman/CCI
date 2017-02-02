var angle = 0.05;
var speed = 0.05;
var scalar = 100;
var offsetX, offsetY;

function setup() {
  offsetX = windowWidth / 2;
  offsetY = windowHeight / 2;
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(255);

  // Draw path
  noFill();
  ellipse(windowWidth / 2, windowHeight / 2, 200);

  var x = offsetX + sin(angle) * scalar;
  var y = offsetY + cos(angle) * scalar;

  // Draw orbiter
  fill(0);
  ellipse(x, y, 20, 20);
  angle += speed;
}
