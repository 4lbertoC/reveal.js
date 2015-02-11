(function() {
	var trivia = Reveal.getConfig().trivia;
	var multiplex = Reveal.getConfig().multiplex;
	var socketId = multiplex.id;
	var socket = io.connect(trivia.url);

	var TriviaClient = {

		CSS_BUTTON_PRESSED: 'pressed',

		CSS_BUTTON_WINNER: 'winner',

		button: document.querySelector('.triviaButton'),

		canPressButton: false,

		id: undefined,

		init: function() {
			TriviaClient.button.addEventListener('click', TriviaClient.onTriviaButtonClick);
		},

		reset: function() {
			TriviaClient.canPressButton = true;
			TriviaClient.button.classList.remove('pressed');
			TriviaClient.button.classList.remove('winner');
		},

		onTriviaButtonClick: function() {
			if(!TriviaClient.button.classList.contains(TriviaClient.CSS_BUTTON_PRESSED)) {
				TriviaClient.button.classList.add(TriviaClient.CSS_BUTTON_PRESSED);

				var data = {
					socketId: multiplex.id,
					triviaClientId: TriviaClient.id
				}

				socket.emit('trivia-button-pressed', data);
			} else {
				var data = {
					socketId: multiplex.id
				}

				socket.emit('trivia-reset-requested', data);
			}
		}

	};

	socket.on('trivia-button-result', function(data) {
		if (data.socketId !== socketId) { return; }

		if (data.triviaClientId === TriviaClient.id) {
			TriviaClient.button.classList.add(TriviaClient.CSS_BUTTON_WINNER);
		} else {
			TriviaClient.button.classList.add(TriviaClient.CSS_BUTTON_PRESSED);
		}
	});

	socket.on('trivia-reset', function(data) {
		// ignore data from sockets that aren't ours
		if (data.socketId !== socketId) { return; }
		if( window.location.host === 'localhost:1950' ) return;

		console.log('resetting');
		TriviaClient.reset();
	});

	socket.on('trivia-registered', function(data) {
		if( window.location.host === 'localhost:1950' ) return;

		TriviaClient.id = data.triviaClientId;
		console.log('registered with id ' + TriviaClient.id);
		TriviaClient.init();
	});
}());
