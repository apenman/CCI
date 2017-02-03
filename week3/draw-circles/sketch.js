/*
 * IDEAS:
 *  -Direction of click and drag determines (counter-)clockwise spin
 *  -Random colored orbits
 *    -Color changes when crossing paths of other orbits
 *  -If balls hit, they switch direction
 *  -Toggle on and off drawing of paths
 *  -Draw line while dragging mouse to help show current circle being drawn
 *    -If line is too short, turn line red and fade out
 *  -Delete circles
*/

var currStartX, currStartY;
var circles;
var dir = 1;
var showPaths;

function setup() {
  showPaths = true;
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

function keyTyped() {
  if (key === 'v')
    showPaths = !showPaths;a
}


function CoolCircle(x, y, diameter) {
  this.location = createVector(x, y);
  this.diameter = diameter;
  this.angle = 0.05;
  this.speed = random(0.02, 0.05);

  this.display = function() {
    console.log("DISP");
    this.angle += this.speed;

    // Only show the orbit path if variable is true (toggle this view with 'v')
    if(showPaths) {
      noFill();
      ellipse(this.location.x, this.location.y, this.diameter);
    }

    var x = this.location.x + sin(this.angle) * (this.diameter/2);
    var y = this.location.y + cos(this.angle) * (this.diameter/2);

    // Draw orbiter
    fill(0);
    ellipse(x, y, 20, 20);
  }
}
