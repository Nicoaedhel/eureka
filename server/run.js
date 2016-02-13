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

	// Connected / Disconnect
	socket.on('chat connect', function(user){
		me = user;
		me.username = me.username.toLowerCase();
		me.avatar = gravatar.url(me.mail, {s: '20', r: 'x', d: 'retro'}, true);
		users.push(me);
		socket.emit('chat connect');
		io.emit('chat message', 'squarebot : Hi @'+me.username+' !');
		io.emit('chat users', users);
	});

	socket.on('disconnect', function () {
		if(me){
			io.emit('chat message', 'squarebot : Bye @'+me.username+' !');
			var index = users.indexOf(me);
			if (index > -1) {
				users.splice(index, 1);
			}
			io.emit('chat users', users);
		}
		
	});


	// Post msg
	socket.on('chat message', function(msg){
		io.emit('chat message', me.username +' : '+msg);
	});

	

});