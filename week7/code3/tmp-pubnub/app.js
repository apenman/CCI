//Import Twitter and J5 modules
var five = require("johnny-five");
var temperature;

var pubnub = require("pubnub")({
    ssl: true, // <- enable TLS Tunneling over TCP
    publish_key: "pub-c-cac4998d-3a3c-4e69-a15b-c37b67659b4e",
    subscribe_key: "sub-c-637e8586-cf9d-11e4-8902-02ee2ddab7fe"
});

    pubnub.subscribe({
        channel: "Channel-p9uoju3qs",
    });

//set up a new j5 board
var board = new five.Board();

board.on("ready", function() {
    temperature = new five.Temperature({
        controller: "TMP36",
        pin: "A0"
    });
    temperature.on("change", function() {
    console.log("fahrenheit: %d", this.F);

    var obj = "temprature at my computer is " + this.F.toString();
    console.log(obj);
    pubnub.publish({ 
    channel   : 'Channel-p9uoju3qs',
    message   : obj,
    callback  : function(e) {  },
    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!"); }
    });

    });
    
});
