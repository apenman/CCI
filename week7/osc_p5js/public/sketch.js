/* USE TOUCHOSC LAYOUT: SIMPLE */

// Where is the circle
var x, y, rad=10, j, r=0, b=0, g=0, xPos=50;
var drawEllipse = true;
var drawSquare = false;
var trails = false;
var socket = io.connect(window.location.origin);

    socket.on('f1', function(data) {
        console.log(data);
        if(data[0] == '/1/fader2') r = map(data[1], 0, 1, 0, 255);
        else if(data[0] == '/1/fader3') g = map(data[1], 0, 1, 0, 255);
        else if(data[0] == '/1/fader4') b = map(data[1], 0, 1, 0, 255);
        else if(data[0] == "/1/fader1") rad = map(data[1], 0, 1, 0, 200);
        else if(data[0] == "/1/fader5") xPos = map(data[1], 0, 1, 0, windowWidth);
        else if(data[0] == "/1/toggle1" && data[1] == 1) {
          drawEllipse = true;
          drawSquare = false;
        }
        else if(data[0] == "/1/toggle2" && data[1] == 1) {
          drawEllipse = false;
          drawSquare = true;
        }
        else if(data[0] == "/1/toggle3" && data[1] == 1) {
          trails = true;
        }
        else if(data[0] == "/1/toggle3" && data[1] == 0) {
          trails = false;
        }
    });

function setup() {
  createCanvas(720, 400);
  // Starts in the middle
  x = width / 2;
  y = height;
}

function draw() {
  if(!trails) background(200);
  // Draw a circle
  noStroke();
  fill(color(r, b, g));
  if(drawEllipse)
    ellipse(xPos, y, rad, rad);
  else if(drawSquare)
    rect(xPos, y, rad, rad);

  // Jiggling randomly on the horizontal axis
  // Moving up at a constant speed
  y = y - 1;

  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
}
