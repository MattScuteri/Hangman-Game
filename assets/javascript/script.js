const hangmanGame = {

	musicalInstruments: {
		guitar: {
			image:
			sound:
		}

		piano: {
			image:
			sound:
		}

		bass: {
			image:
			sound:
		}

		saxophone: {
			image:
			sound:
		}

		trumpet: {
			image:
			sound:
		}

		sitar: {
			image:
			sound:
		}

		theremin: {
			image:
			sound:
		}

		oud: {
			image:
			sound:
		}

		triangle: {
			image:
			sound:
		}

		trombone: {
			image:
			sound:
		}
	};

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
				this.restartGame():
			}
		}
	},

	updateGuesses: function(letter) {
		if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
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
		for (let i = 0; i < this.lettersOfTheWord.length; i++) {
			if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
				this.matchedLetters.push(letter);
			}
		}
	},

	rebuildWordView: function() {
		let wordView = "";
		for (let i = 0; i < this.lettersOfTheWord.length; i++) {
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
				wordView += this.lettersOfTheWord[i];
			} else {
				wordView += "&nnsp;_&nbsp;";
			}
		}

		document.querySelector('#game-space').innerHTML = wordview;
	}

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

		for (let i = 0; i < this.lettersOfTheWord.length; i++) {
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
				win = false;
			}
		}

		if (win) {
			this.wins = this.wins + 1;
			document.querySelector("#wins").innerHTML = this.wins;
			document.querySelector("#sound").innerHTML = this.musicalInstruments[this.wordInPlay].sound;
			document.querySelector("#picture").innerHTML = "<img class='instrument-img' src='images/'" + this.wordsToPick[this.wordInPlay].picture + "' alt='" + this.wordsToPick[this.wordInPlay].sound + "'>";

			
		}
	}
}