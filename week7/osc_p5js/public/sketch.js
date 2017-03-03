// Where is the circle
var x, y, r, j;

var socket = io.connect(window.location.origin);

    socket.on('data', function(data) {
        console.log(data);
        r = map(data, 0, 1, 0, 200);
    });


function setup() {
  createCanvas(720, 400);
  // Starts in the middle
  x = width / 2;
  y = height;
}

function draw() {
  background(200);
  

  // Draw a circle
  stroke(50);
  fill(100);
  ellipse(x, y, r, r);
  
  // Jiggling randomly on the horizontal axis
  x = x + random(-1, 1);
  // Moving up at a constant speed
  y = y - 1;
  
  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
}