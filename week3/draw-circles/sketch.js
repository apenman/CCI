/*
 * IDEAS:
 *  -Direction of click and drag determines (counter-)clockwise spin
 *  -Color changes when crossing paths of other orbits (???)
 *  -If balls hit, they switch direction
 *  -If line is too short, turn line red and fade out -- need to create fading line constructor for this
 *  -Delete suns
 *  -Turn all coordinates to vectors
*/
var currStartX, currStartY;
var suns;
var showPaths, colorize, collisionDetect, nightMode;
var orbitRadius = 20;

function setup() {
  showPaths = true;
  colorize = false;
  collisionDetect = false;
  nightMode = false;
  suns = [];
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(nightMode ? 0 : 255);

  // Draw a line if mouse is being dragged to create
  if(mouseIsPressed) {
    stroke(nightMode ? 255: 0);
    line(currStartX, currStartY, mouseX, mouseY);
  }

  // Get our system going!
  for(var i = 0; i < suns.length; i++) {
    suns[i].moveOrbiters();
    // Actual collision detection works, changing orbit direction does not
    if(collisionDetect)
      suns[i].checkCollisions();
    suns[i].display();
  }
}

function mousePressed() {
  // Log starting point for sun
  if(!currStartX && !currStartY) {
    currStartX = mouseX;
    currStartY = mouseY;
  }
}

function mouseReleased() {
  // Calc distance from currStart to (mouseX, mouseY) -- we're going to draw a sun
  var distance = dist(currStartX, currStartY, mouseX, mouseY);
  var midX = lerp(currStartX, mouseX, .5);
  var midY = lerp(currStartY, mouseY, .5);
  // Add sun to suns arr
  if(distance > 50)
    suns.push(new Sun(midX, midY, distance, (currStartX > mouseX ? false : true)))
  // Reset currStart to 0
  currStartX = 0;
  currStartY = 0;
}

function keyTyped() {
  // Toggle path view
  if (key === 'v')
    showPaths = !showPaths;
  // Toggle colorizer
  else if (key === 'c')
    colorize = !colorize;
  // Toggle collision detection
  else if (key === 'b')
    collisionDetect = !collisionDetect
  else if (key === 'n')
    nightMode = !nightMode
}

// Sun object is the main circle, has 1 or more orbiters (hardcoded to 1 now)
function Sun(x, y, diameter, clockwiseOrbit) {
  this.midPoint = createVector(x, y);
  this.diameter = diameter;
  this.orbiters = [new Orbiter(clockwiseOrbit)];

  this.display = function() {
      // Only show the orbit path if variable is true (toggle this view with 'v')
      if(showPaths) {
        stroke(nightMode ? 255: 0);
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

  this.checkCollisions = function() {
    for(var i = 0; i < suns.length; i++) {
      // Check if itself and that the radiuses can possible intersect
      if(this.midPoint != suns[i].midPoint &&
        this.midPoint.dist(suns[i].midPoint) < (this.diameter / 2 + suns[i].diameter / 2 + orbitRadius)) {
          for(var j = 0; j < this.orbiters.length; j++) {
            this.orbiters[j].checkSunCollisions(this.midPoint, suns[i]);
          }
      }
    }
  }
}

// Orbiters orbit around the center point of their sun
function Orbiter(clockwiseOrbit) {
  this.color = color(random(255), random(255), random(255));
  this.angle = 0.05;
  this.speed = random(0.02, 0.05);
  // Orbit's current location offset from the sun's midpoint
  this.midPointOffset = createVector();
  // Determines direction of orbit
  this.clockwise = clockwiseOrbit;

  this.display = function(x, y) {
    // Draw orbiter (toggle color with 'c')
    if(colorize)
      fill(this.color);
    else
      fill(nightMode ? 255 : 0);
    noStroke();
    ellipse(x+this.midPointOffset.x, y+this.midPointOffset.y, orbitRadius);
  }

  this.move = function(sunDiameter) {
    this.angle += (this.speed);
    this.midPointOffset.x = (this.clockwise ? sin(this.angle) : cos(this.angle)) * (sunDiameter/2);
    this.midPointOffset.y = (this.clockwise ? cos(this.angle) : sin(this.angle)) * (sunDiameter/2);
  }

  // Checks against all of a sun's orbiters
  // If collision is detected switch this.clockwise
  this.checkSunCollisions = function(midPoint, sun) {
    for(var i = 0; i < sun.orbiters.length; i++) {
      var myLocation = p5.Vector.add(midPoint, this.midPointOffset);
      var theirLocation = p5.Vector.add(sun.midPoint, sun.orbiters[i].midPointOffset);
      var distance = myLocation.dist(theirLocation);
      if(distance <= orbitRadius)
        // We have hit
        this.clockwise = !this.clockwise;
    }
  }
}
