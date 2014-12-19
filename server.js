var app = require('express')();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var port = process.env.PORT || 8080;
server.listen(port);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', function(req, res) {
	res.sendFile(__dirname + '/style.css');
});
app.get('/script.js', function(req, res) {
 	res.sendFile(__dirname + '/script.js');
});
app.get('/webrtc.io.js', function(req, res) {
	res.sendFile(__dirname + '/webrtc.io.js');
});

var folks = 0;
server.on('connection', function (socket){
    folks++;
    socket.on('close', function () {
        folks--;
    });
});

app.get('/status', function(req, res) {
	if (folks >= 2) {res.json({'online': 'yes'});}
	else {res.json({'online': 'no'});}
});

webRTC.rtc.on('chat_msg', function(data, socket) {
var roomList = webRTC.rtc.rooms[data.room] || [];
	for (var i = 0; i < roomList.length; i++) {
		var socketId = roomList[i];
		if (socketId !== socket.id) {
			var soc = webRTC.rtc.getSocket(socketId);
			if (soc) {
				soc.send(JSON.stringify({
				"eventName": "receive_chat_msg",
				"data": {
				"messages": data.messages,
				"color": data.color
				}
			}), function(error) {
				if (error) {
				console.log(error);
				}
			});
		}
	}
}
});