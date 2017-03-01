//the child_process library let's us execute command line commands, https://nodejs.org/api/child_process.html
var exec = require('child_process').exec;
//This variable stores the command we want to execute, we are going to use the say command
var say = 'say ';

//import express 
var express = require('express');
//create express object named app
var app = express();

//instantiate a server on port 3000
var server = app.listen(3000);
var io = require('socket.io')(server);

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//create a bart oobject that queries the API every 5 seconds
var bart = require('bart').createClient({"interval":20000});

//let's make a function that speaks
function speak(whatosay){
  //speak the string
  exec(say + whatosay);
  //log it to the console
  console.log(whatosay)
}

//on a request to / serve index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



function queryBart(){
//choose which bart staion to to monitor, station abbreviations are here: http://api.bart.gov/docs/overview/abbrev.aspx
bart.on('powl', function(estimates){
   //log the results to the console
   // console.log(estimates); 

   console.log(estimates[0].hexcolor);
   var hexcolor = estimates[0].hexcolor;

   io.sockets.emit('data', hexcolor);
   // store the results in some variables
   var nextTrainNorth = "next train in " + estimates[0].minutes;
   var destSouth = "Dest: " + estimates[0].destination;
   // call the function
   speak(nextTrainNorth + " minutes" + " destination is " + estimates[5].destination + " Direction is " + estimates[5].direction);
   }, 1000);
}

queryBart();

