var com = require("serialport");
var app = require('express')();

var server = app.listen(3000);
var io = require('socket.io')(server);

var five = require("johnny-five");
var boardOne = new five.Board();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

boardOne.on("ready", function() {
    var servo = new five.Servo(3);
    io.on('connection', function(socket) {
        socket.on('message', function(msg) {
            console.log(msg);
            servo.to(msg);
        });

    });
});


