var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var temperature = new five.Temperature({
    pin: "A0",
    controller: "TMP36"
  });

  temperature.on("change", function() {
    console.log("celsius: %d", this.C);
    console.log("fahrenheit: %d", this.F);
    console.log("kelvin: %d", this.K);
  });
});