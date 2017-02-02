var ghosts = [];
var spooky;
var numPieces = 10;

function setup() {
  spooky = loadSound('assets/boo.wav');
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(255);
  // Start from end of array so we can splice out with ease
  for(var i = ghosts.length-1; i >= 0; i--) {
    ghosts[i].move();
    // if ghost life is below zero, kill it and remove from array
    if(ghosts[i].life <= 0) {
      ghosts[i].kill();
      ghosts.splice(i, 1);
    }
    // else display
    else {
      ghosts[i].display();
    }
  }
}

function mouseClicked() {
  // Play spooky ghost sound
  if(spooky.isPlaying()) {
    spooky.stop();
  }
  spooky.play();
  // Make 5 new ghosts at random points
  for(var i = 0; i < 5; i++) {
    ghosts.push(new Ghost(random(windowWidth), random(windowHeight)));
  }
}

function Ghost(x, y) {
  this.pieces = [];
  this.life = 100;

  // make body pieces
  for(var i = 0; i < numPieces; i++) {
    this.pieces.push(new GhostPiece(x, y, 10, 115, 115, 115));
  }

  // make eyes
  // lil eye
  this.pieces.push(new GhostPiece(x, y, 15, 0, 0, 0));
  // big eye
  this.pieces.push(new GhostPiece(x, y, 25, 0, 0, 0));

  // make tongue
  this.pieces.push(new GhostPiece(x, y, 10, 232, 39, 49));

  this.move = function(){
    this.life -= 1;
    for(var i = 0; i < this.pieces.length; i++) {
      this.pieces[i].move();
    }
  }

  this.display = function() {
    for(var i = 0; i < this.pieces.length; i++) {
      this.pieces[i].display();
    }
  }

  this.kill = function() {
    this.pieces = [];
  }
}

function GhostPiece(x, y, size, r, g, b) {
  this.location = createVector(x, y);
  this.accel = createVector(random(2), random(2));
  this.fade = 100;

  this.display = function() {
    fill(r, g, b,this.fade);
    noStroke();
    ellipse(this.location.x, this.location.y, size);
  }

  this.move = function() {
    // Add random jitter to path
    var accelWithJitter = this.accel.add(createVector(random(-1, 1)/4, random(-1, 1)/4));
    this.location.add(accelWithJitter);
    this.fade -= 1;
  }
}
