//Install Modules
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

var io = require('socket.io')(server);

var five = require("johnny-five"),
  board, potentiometer;

board = new five.Board();

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Do this when arduino is ready
board.on("ready", function() {
  var controller = process.argv[2] || "GP2Y0A02YK0F";


  var proximity = new five.IR.Proximity({
    controller: controller,
    pin: "A0"
  });

  proximity.on("data", function() {
    if(this.inches != "Infinity" && this.inches <= 80){
      io.sockets.emit('data', {val: this.inches});
    }
    console.log(this.inches);

  });

});

