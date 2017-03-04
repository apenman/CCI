var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var led = new five.Led(6);
    led.pulse({
        easing: "linear",
        duration: 3000,
        cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
        keyFrames: [0, 10, 0, 50, 0, 255],
        onstop: function() {
            console.log("Animation stopped");
        }
    });
});
