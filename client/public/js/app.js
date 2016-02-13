var socket = io.connect('http://localhost:8000');

// Connect 
$('#connect').click(function(event){
	event.preventDefault();
	socket.emit('chat connect', {
		username : '@'+$('form.insert-connect').find('[name="username"]').val(),
		mail : $('form.insert-connect').find('[name="mail"]').val()
	});
	return false;
});

// If connect
socket.on('chat connect', function(user){
	$('#panel-start').addClass('removed');
	$('#menu').removeClass('removed');
	$('#content').removeClass('removed');
	$('#m').focus();
});

// Add users
socket.on('chat users', function(users){
	$('#users').empty();
	for (user in users) {
		$('#users').append($('<li>').text(users[user].username));
	};
	
});

// msg to server
$('form#insert-text').submit(function(event){
	event.preventDefault();
	socket.emit('chat message',$('#m').val());
	$('#m').val('');
	$('#m').focus();
	return false;
});

// display msg
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});