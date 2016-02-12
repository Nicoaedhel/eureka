var http = require('http'),

httpServer = http.createServer();

httpServer.listen(8000, function(){
	console.log('Server running at http://localhost:8000');
});
var users = [];
var io = require('socket.io')(httpServer);
var gravatar = require('gravatar');


io.on('connection', function(socket){
	
	var me;

	// Connected / Disconect
	socket.on('chat connect', function(user){
		me = user;
		me.avatar = gravatar.url(me.mail, {s: '20', r: 'x', d: 'retro'}, true);
		users.push(me);
		socket.emit('chat connect');
		io.emit('chat message', 'ChatSquare : hello '+me.username+' !');
		io.emit('chat users', users);
	});


	// Post msg
	socket.on('chat message', function(msg){
		io.emit('chat message', me.username +' : '+msg);
	});

});