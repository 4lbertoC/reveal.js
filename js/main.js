(function() {

	var quizJsSpeakerIdElement = $('.quizjs-speakerid');

	function onQuizJsStatusUpdate(data) {
		quizJsSpeakerIdElement.show();
		quizJsSpeakerIdElement.text(data.speakerId || '-');
	}

	function onQuizJsStatusReset() {
		quizJsSpeakerIdElement.hide();
		quizJsSpeakerIdElement.text('');
	}

	QuizJsMaster.connect('http://quizjs.herokuapp.com');
	QuizJsMaster.on('quizjs-state-update', onQuizJsStatusUpdate);
	QuizJsMaster.on('quizjs-state-reset', onQuizJsStatusReset);

	// Full list of configuration options available at:
	// https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		controls: true,
		progress: true,
		history: true,
		center: true,

		transition: 'slide', // none/fade/slide/convex/concave/zoom

		// Optional reveal.js plugins
		dependencies: [
			{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
			{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
			{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
			{ src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
			{ src: 'plugin/zoom-js/zoom.js', async: true },
			{ src: 'plugin/notes/notes.js', async: true }
		],

		keyboard: {
			// F
			70: FoodJs.showOrHidePic,
			// T
			84: QuizJsMaster.next,
			// R 
			82: QuizJsMaster.reset
		}
	});

	$(window).load(function() {
		$('.sparkley').sparkleh();
	});

})();