var ghosts = [];

function setup() {
  createCanvas(windowWidth,windowWidth);
}

function draw() {
  background(255);
  for(var i = ghosts.length-1; i >= 0; i--) {
    console.log("Ghost at " + i + ": ", ghosts[i]);
    ghosts[i].move();
    if(ghosts[i].fade <= 0) {
      ghosts.splice(i, 1);
    }
    else {
      ghosts[i].display();
    }
  }
}

function mouseClicked() {
  for(var i = 0; i < 5; i++) {
    //console.log("Making new " + i);
    ghosts.push(new Ghost(random(windowWidth), random(windowHeight)));
  }
}

function Ghost(x, y) {
  this.location = createVector(x, y);
  this.fade = 50;

  this.display = function() {
    ellipse(this.location.x, this.location.y, 10, 10);
  }
  this.move = function() {
    this.location.add(createVector(random(1), random(1)));
    this.fade -= 1;
  }
}
