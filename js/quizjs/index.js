var express		= require('express');
var fs			= require('fs');
var io			= require('socket.io');
var crypto		= require('crypto');

var app			= express.createServer();
var staticDir	= express.static;

io				= io.listen(app);

var opts = {
	port: 1950,
	baseDir : __dirname + '/../../'
};

var registeredIds = 0;

var winner = undefined;

io.sockets.on('connection', function(socket) {
	console.log('new connection!');
	socket.emit('quizjs-registered', {quizJsClientId: registeredIds++});

	socket.on('quizjs-button-pressed', function(data) {
		if(typeof winner === 'undefined') {
			winner = data.quizJsClientId;
			console.log(winner + ' is winner!');
		}

		var data = {
			socketId: data.socketId,
			quizJsClientId: winner
		}

		io.sockets.emit('quizjs-button-result', data);
	});

	socket.on('quizjs-reset-requested', function(data) {
		winner = undefined;

		console.log('winner reset');
		var data = {
			socketId: data.socketId
		}

		io.sockets.emit('quizjs-reset', data);
	});
});

// Actually listen
app.listen(opts.port || null);

var brown = '\033[33m',
	green = '\033[32m',
	reset = '\033[0m';

console.log( brown + "reveal.js:" + reset + " Multiplex running on port " + green + opts.port + reset );