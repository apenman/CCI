var angle = 0.05;
var speed = 0.05;
var xScale, yScale;
var offsetX, offsetY;

function setup() {
  offsetX = windowWidth / 2;
  offsetY = windowHeight / 2;
  xScale = 200;
  yScale = 50;
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(255);

  xScale = map(mouseX, 0, windowWidth, 50, 500);
  yScale = map(mouseY, 0, windowHeight, 50, 500);
  // Draw path
  noFill();
  ellipse(windowWidth / 2, windowHeight / 2, xScale, yScale);

  var x = offsetX + sin(angle) * (xScale/2);
  var y = offsetY + cos(angle) * (yScale/2);

  // Draw orbiter
  fill(0);
  ellipse(x, y, 20, 20);
  angle += speed;
}
