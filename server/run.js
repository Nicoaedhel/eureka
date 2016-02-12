var http = require('http'),

httpServer = http.createServer();

httpServer.listen(8000, function(){
	console.log('Server running at http://localhost:8000');
});

var io = require('socket.io')(httpServer);
io.on('connection', function(socket){
	console.log('Nouveau utilisateur');
	socket.on('chat message', function(msg){
		console.log('Nouveau message : '+msg);
		io.emit('chat message', msg);
	});
});