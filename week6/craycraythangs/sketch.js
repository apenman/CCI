var createCray = [];
var horizontalSpeed = 10;
var verticalSpeed = 10;
var velocity = 0.1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i=0; i<200; i++) {
    createCray.push(new Cray(random(windowWidth), random(windowHeight), 10));
  }
}

function draw() {
  background(0);
  createCray.forEach(function(cray) {
    cray.move();
    cray.display();
  })
}

function Cray(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  this.move = function() {
    this.x += random(-horizontalSpeed,horizontalSpeed)*velocity;
    this.y += random(-verticalSpeed,verticalSpeed)*velocity;
  }

  this.display = function() {
    fill(this.r, this.g, this.b);
    ellipse(this.x,this.y,this.size,this.size);
  }
}
