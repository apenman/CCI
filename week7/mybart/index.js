var bart = require('bart').createClient({"interval":1000});
var count = 0;

bart.on('powl', function(estimates){
  //  console.log(estimates);
  //  console.log(++count + " ______________________");
  console.log("Next train going to " + estimates[0].destination);
});
