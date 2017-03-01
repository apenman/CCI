//the child_process library let's us execute command line commands, https://nodejs.org/api/child_process.html
var exec = require('child_process').exec;
//This variable stores the command we want to execute, we are going to use the say command
var say = '"C:\\Program Files (x86)\\eSpeak\\command_line\\espeak.exe" ';

//let's make a function that speaks
function speak(whatosay){
	//speak the string
	exec(say + '\"' + whatosay + '\"');
	//log it to the console
	console.log(say + whatosay)
}
// call the function
speak("I just do this");
// speak("I just do this but " + process.platform + " rules");
