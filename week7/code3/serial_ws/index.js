var com = require("serialport");
var app = require('express')();

var server = app.listen(3000);
var io = require('socket.io')(server);

var serialPort = new com.SerialPort("/dev/cu.usbmodem1421", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
});

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

serialPort.on('open', function() {
    console.log('Port open');
});

serialPort.on('data', function(data) {
    io.sockets.emit('data',data);
    console.log(data);
});
