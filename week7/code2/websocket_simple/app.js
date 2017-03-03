var express = require("express");
var app = express();

// Set up a URL route
app.get("/", function(req, res) {
 res.send("Heroku Demo!");
});

// bind the app to listen for connections on a specified port
var port = process.env.PORT || 3000;
app.listen(port);

// // Render some console log output
// console.log("Listening on port " + port);

// var express = require("express");
// var app = express();

// // Set up a URL route
// app.get("/", function(req, res) {
//  res.sendFile(__dirname + '/index.html');
// });

// // bind the app to listen for connections on a specified port
// var port = process.env.PORT || 5000;
// app.listen(port);
// var server = app.listen(port);
// var io = require('socket.io')(server);

// // Render some console log output
// console.log("Listening on port " + port);

// setInterval(function() {
//       var i = Math.floor(Math.random() * 1000) + 1  
//       //emit data on a websocket called mysocket
//       io.sockets.emit('mysocket', i);
//       console.log(i);
// }, 10);






