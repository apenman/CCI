var currStartX, currStartY;
var circles;
var dir = 1;

function setup() {
  circles = [];
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(255);
  for(var i = 0; i < circles.length; i++) {
    circles[i].display();
  }
}

function mousePressed() {
  if(!currStartX && !currStartY) {
    currStartX = mouseX;
    currStartY = mouseY;
  }
}

function mouseReleased() {
  // When mouse is released
  // Calc distance from currStart to (mouseX, mouseY)
  var distance = dist(currStartX, currStartY, mouseX, mouseY);
  var midX = lerp(currStartX, mouseX, .5);
  var midY = lerp(currStartY, mouseY, .5);
  // Add circle to circles arr
  console.log("PUSHING NEW AT: " + midX + ", " + midY);
  if(distance > 50)
    circles.push(new CoolCircle(midX, midY, distance))
  // Set currStart to 0
  currStartX = 0;
  currStartY = 0;
}

function CoolCircle(x, y, diameter) {
  this.location = createVector(x, y);
  this.diameter = diameter;
  this.angle = 0.05;
  this.speed = random(0.02, 0.05);

  this.display = function() {
    console.log("DISP");
    this.angle += this.speed;
    noFill();
    ellipse(this.location.x, this.location.y, this.diameter);

    var x = this.location.x + sin(this.angle) * (this.diameter/2);
    var y = this.location.y + cos(this.angle) * (this.diameter/2);

    // Draw orbiter
    fill(0);
    ellipse(x, y, 20, 20);
  }
}
