var osc = require('node-osc');

//import express
var express = require('express');
//create express object named app
var app = express();

//instantiate a server on port 3000
var server = app.listen(3000);
var io = require('socket.io')(server);

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//on a request to / serve index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Connect to server, Our device
var oscServer = new osc.Server(8000, '192.168.8.100');

//When we recieve a message send it as a web socket
oscServer.on("message", function(msg, rinfo) {
    console.log("TUIO message:");
    console.log(msg);
    var ctrl = msg[0];
    var val = msg[1];

    io.sockets.emit('data', val);
});
