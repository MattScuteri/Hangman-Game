const hangmanGame = {

	musicalInstruments: {
		guitar: {
			image: "guitar.png"
		},

		piano: {
			image: "piano.jpg"
		},

		bass: {
			image: "bass.jpg"
		},

		saxophone: {
			image: "saxophone.jpg"
		},

		trumpet: {
			image: "trumpet.jpg"
		},

		sitar: {
			image: "sitar.jpg"
		},

		theremin: {
			image: "theremin.jpg"
		},

		oud: {
			image: "oud.jpg"
		},

		triangle: {
			image: "triangle.jpg"
		},

		trombone: {
			image: "trombone.jpg"
		}
	},

	wordInPlay: null,
	wordLetters: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesses: 0,
	lettersGuessed: null,
	wins: 0,

	startGame: function() {
		let objKeys = Object.keys(this.musicalInstruments);
		this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
		this.wordLetters = this.wordInPlay.split("");
		this.rebuildWordView();
		this.updateTotalGuesses();
	},

	updatePage: function(letter) {
		if (this.guessesLeft === 0) {
			this.restartGame();
		} else {
			this.updateGuesses(letter);
			this.updateMatchedLetters(letter);
			this.rebuildWordView();

			if (this.updateWins() === true) {
				this.restartGame();
			}
		}
	},

	updateGuesses: function(letter) {
		if ((this.guessedLetters.indexOf(letter) === -1) && (this.wordLetters.indexOf(letter) === -1)) {
			this.guessedLetters.push(letter);
			this.guessedLetters--;

			document.querySelector("#num-guesses").innerHTML = this.guessesLeft;
			document.querySelector("#wrong-letters").innerHTML = this.guessedLetters.join(", ");
		}
	},

	updateTotalGuesses: function() {
		this.totalGuesses = 7
		this.guessesLeft = this.totalGuesses;

		document.querySelector("#num-guesses").innerHTML = this.guessesLeft;
	},

	updateMatchedLetters: function(letter) {
		for (let i = 0; i < this.wordLetters.length; i++) {
			if ((letter === this.wordLetters[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
				this.matchedLetters.push(letter);
			}
		}
	},

	rebuildWordView: function() {
		let wordView = "";
		for (let i = 0; i < this.wordLetters.length; i++) {
			if (this.matchedLetters.indexOf(this.wordLetters[i]) !== -1) {
				wordView += this.wordLetters[i];
			} else {
				wordView += "&nnsp;_&nbsp;";
			}
		}

		document.querySelector('#game-space').innerHTML = wordView;
	},

	restartGame: function() {
		document.querySelector("#wrong-letters").innerHTML = "";
		this.wordInPlay = null,
		this.wordLetters = [],
		this.matchedLetters = [],
		this.guessedLetters = [],
		this.guessesLeft = 0,
		this.totalGuesses = 0,
		this.lettersGuessed = null,
		this.startGame();
		this.rebuildWordView();
	},

	updateWins: function() {
		let win;

		if (this.matchedLetters.length === 0) {
			win = false;
		} else {
			win = true;
		}

		for (let i = 0; i < this.wordLetters.length; i++) {
			if (this.matchedLetters.indexOf(this.wordLetters[i]) === -1) {
				win = false;
			}
		}

		if (win) {
			this.wins = this.wins + 1;
			document.querySelector("#wins").innerHTML = this.wins;
			document.querySelector("#picture").innerHTML = "<img class='instrument-img' src='images/'" + this.musicalInstruments[this.wordInPlay].picture + "' alt='" + this.wordsToPick[this.wordInPlay].sound + "'>";

		return true;
		}
	return false;
	}
};

hangmanGame.startGame();