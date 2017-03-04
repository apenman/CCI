var x, y, b;
var socket = io.connect(window.location.origin);
var osc;

socket.on('mysocket', function(data) {
    incoming = data.split(',');
    x = map(incoming[0], 0, 1023, 0, width);
    y = map(incoming[1], 0, 1023, 0, height);
    b = incoming[2];
    if(b==0)
      fill(random(255),random(255),random(255));
    // console.log(incoming);
});

function setup() {
    frameRate(60);
    createCanvas(1024, 768);
    // Starts in the middle
    x = width / 2;
    y = height / 2;

    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(x);
    osc.amp(y);
    osc.start();
}

function draw() {
    background(color(map(x,0,1024, 0, 255), 0,map(y, 0, 768, 0, 255)));
    textSize(32);
    fill(255);
    text(x, 0, 32);
    text(y, 0, 64);
    osc.freq(x);
    osc.amp(y);
    // Draw a circle
    stroke(50);
    // fill(x, x, x);
    // background(y, y, y);
    ellipse(x, y, 50, 50);
    // Jiggling randomly on the horizontal axis
    x = x + random(-1, 1);
    // Moving up at a constant speed
    y = y - 1;
    // Reset to the bottom
    if (y < 0) {
        y = height;
    }
}
