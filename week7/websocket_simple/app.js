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

setInterval(function() {
      var i = Math.floor(Math.random() * 1000) + 1  
      io.sockets.emit('mysocket', i);
      console.log(i);
}, 10);






