var Twitter = require('twitter')
var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');
var message;

var client = new Twitter({
  consumer_key: 'H7WE4DmlhgyqhJtJXKVVeSCxd',
  consumer_secret: '5v5e1RrQOspeUzLm7XqoLny8PPoPCnTakIgR2Qc3K1JHURNCWn',
  access_token_key: '3035181914-VdvXFCCouAD5BN7brkmMnv95U842QhljYTSj9x6',
  access_token_secret: '4XtCCHgqnDu6WWJ7aC0qjV24xDbzhAaEYvI6ZjUuqZwgv'
})



// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

function sendTweet(){
	io.sockets.emit('tweet', message);
}

// Send current time every 10 secs
//setInterval(sendTweet, 100);

client.stream('statuses/filter', {
  // laughing crying emoji: the most popular emoji
  track: 'art'
}, function(tweetStream) {

  // `tweetStream` will emit a "data" event whenever
  // a new tweet is posted. These will be in the same format
  // as seen in the first example.
  tweetStream.on('data', function(tweet) {
    console.log(tweet.text)
    io.sockets.emit('tweet',{message: tweet.text});

  })
})

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome!' });

    socket.on('i am client', console.log);
});

app.listen(3000);
