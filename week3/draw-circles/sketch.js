/*
 * IDEAS:
 *  -Direction of click and drag determines (counter-)clockwise spin
 *  -Color changes when crossing paths of other orbits (???)
 *  -If balls hit, they switch direction
 *  -Toggle on and off drawing of paths
 *  -Draw line while dragging mouse to help show current circle being drawn
 *    -If line is too short, turn line red and fade out
 *  -Delete suns
*/

var currStartX, currStartY;
var suns;
var showPaths, colorize, collisionDetect;
var orbitRadius = 20;

function setup() {
  showPaths = true;
  colorize = false;
  collisionDetect = false;
  suns = [];
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(255);
  for(var i = 0; i < suns.length; i++) {
    suns[i].moveOrbiters();
    suns[i].display();
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
  // Add sun to suns arr
  //console.log("PUSHING NEW AT: " + midX + ", " + midY);
  if(distance > 50)
    suns.push(new Sun(midX, midY, distance))
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


function Sun(x, y, diameter) {
  this.midPoint = createVector(x, y);
  this.diameter = diameter;
  this.orbiters = [new Orbiter()];

  this.display = function() {
      // Only show the orbit path if variable is true (toggle this view with 'v')
      if(showPaths) {
        stroke(0);
        noFill();
        ellipse(this.midPoint.x, this.midPoint.y, this.diameter);
    }

    for(var i = 0; i < this.orbiters.length; i++) {
      // Orbiters draw based off midpoint of sun
      this.orbiters[i].display(this.midPoint.x, this.midPoint.y);
    }
  }

  this.moveOrbiters = function() {
    for(var i = 0; i < this.orbiters.length; i++) {
      // Orbiters move based off angle; sun diameter is requiredo
      this.orbiters[i].move(this.diameter);
    }
  }
}

function Orbiter() {
  this.color = color(random(255), random(255), random(255));
  this.angle = 0.05;
  this.speed = random(0.02, 0.05);
  this.midPointOffset = createVector();
  // Determines direction of orbit
  this.clockwise = false;

  this.display = function(x, y) {
    // Draw orbiter (toggle color with 'c')
    if(colorize)
      fill(this.color);
    else
      fill(0);
    noStroke();
    ellipse(x+this.midPointOffset.x, y+this.midPointOffset.y, orbitRadius);
  }

  this.move = function(sunDiameter) {
    this.angle += (this.speed);
    this.midPointOffset.x = (this.clockwise ? sin(this.angle) : cos(this.angle)) * (sunDiameter/2);
    this.midPointOffset.y = (this.clockwise ? cos(this.angle) : sin(this.angle)) * (sunDiameter/2);
  }
}
