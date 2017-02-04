/*
 * IDEAS:
 *  -Direction of click and drag determines (counter-)clockwise spin
 *  -Color changes when crossing paths of other orbits (???)
 *  -If balls hit, they switch direction
 *  -Toggle on and off drawing of paths
 *  -Draw line while dragging mouse to help show current circle being drawn
 *    -If line is too short, turn line red and fade out
 *  -Delete circles
*/

var currStartX, currStartY;
var circles;
var showPaths, colorize, collisionDetect;
var orbitRadius = 20;

function setup() {
  showPaths = true;
  colorize = false;
  collisionDetect = false;
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
  //console.log("PUSHING NEW AT: " + midX + ", " + midY);
  if(distance > 50)
    circles.push(new CoolCircle(midX, midY, distance))
  // Set currStart to 0
  currStartX = 0;
  currStartY = 0;
}

function keyTyped() {
  if (key === 'v')
    showPaths = !showPaths;
  else if (key === 'c')
    colorize = !colorize;
  else if (key === 'b')
    collisionDetect = !collisionDetect
}


function CoolCircle(x, y, diameter) {
  this.midPoint = createVector(x, y);
  this.diameter = diameter;
  this.angle = 0.05;
  this.speed = random(0.02, 0.05);
  this.color = color(random(255), random(255), random(255));
  // Determines direction of orbit
  this.clockwise = false;

  this.display = function() {
    this.angle += (this.speed);

    // Only show the orbit path if variable is true (toggle this view with 'v')
    if(showPaths) {
      stroke(0);
      noFill();
      ellipse(this.midPoint.x, this.midPoint.y, this.diameter);
    }

    var x = this.midPoint.x + (this.clockwise ? sin(this.angle) : cos(this.angle)) * (this.diameter/2);
    var y = this.midPoint.y + (this.clockwise ? cos(this.angle) : sin(this.angle)) * (this.diameter/2);

    // Draw orbiter (toggle color with 'c')
    if(colorize)
      fill(this.color);
    else
      fill(0);
    noStroke();
    ellipse(x, y, orbitRadius);
  }
}
