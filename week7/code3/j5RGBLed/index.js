var com = require("serialport");
var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('public'));

var FONTS = require('cfonts');

var io = require('socket.io')(server);

var five = require("johnny-five");
var boardOne = new five.Board();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

boardOne.on("ready", function() {
    var led = new five.Led.RGB({
        pins: {
            red: 10,
            green: 11,
            blue: 9,
            isAnode: true
        }
    });

    io.on('connection', function(socket) {
        socket.on('message', function(msg) {
            led.on();
            led.color(msg);
            var fonts = new FONTS({
                'text': msg, //text to be converted
                'font': 'block', //define the font face
                'colors': '', //define all colors
                'background': 'Black', //define the background color
                'letterSpacing': 1, //define letter spacing
                'space': true, //define if the output text should have empty lines on top and on the bottom
                'maxLength': '10' //define how many character can be on one line
            });

        });

    });
});
