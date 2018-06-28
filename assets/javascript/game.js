
var player = {
    wins: 0,
    losses: 0,
    guessesLeft: 8,
    guesses: [],
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    duplicateGuess: false,

    clearGuesses: function () {
        this.guesses.length = 0;
    },
    addGuess: function (guess) {
        this.guesses.push(guess)
    },
    checkDuplicateGuess: function (guess) {
        if (this.guesses.indexOf(guess) >= 0) {
            duplicateGuess = true;
        } else {
            duplicateGuess = false;
        }
    },
    // isLetter: function (guess) {
    //     if (this.letters.indexOf(guess >= 0)) {
    //         validGuess = true;
    //     } else {
    //         validGuess = false;
    // //FIXME alert does not pop up
    //         alert("Choose a letter!")
    //     }
    // }
}

var computer = {
    hiddenWords: ["first word", "another word"],
    chosenWord: "",
    hiddenLetters: '',
    space: ' ',
    
    chooseWord: function () {
        chosenWord = this.hiddenWords[Math.floor(Math.random() * this.hiddenWords.length)];
        console.log(chosenWord);
    },
    disguiseWord: function (word) {
        this.hiddenLetters = "";
        for (i = 0; i < word.length; i++) {
            if (this.space.includes(word[i])) {
                this.hiddenLetters += word[i];
            } else {
                this.hiddenLetters += "-";
            }
        }
        console.log(this.hiddenLetters);
    },
}

const resetGame = function () {
    player.guessesLeft = 8;
    computer.chooseWord();
    player.clearGuesses();
    computer.disguiseWord(this.chosenWord);
    updateDOM();
};

const isLetter = function (guess) {
    if (player.letters.indexOf(guess >= 0)) {
        player.validGuess = true;
        console.log("valid guess is true");
    } else {
        player.validGuess = false;
        console.log("valid guess is false");
//FIXME alert does not pop up
        alert("Choose a letter!")
    }
}

// method to unhide correctly guessed letters
const checkCorrectGuess = function (guess) {
    var space = " ";
    computer.hiddenLetters = "";

    for (i=0; i < chosenWord.length; i++) {
        if (player.guesses.indexOf(chosenWord[i]) >= 0 ) {
            computer.hiddenLetters += chosenWord[i];
        } else if (space.includes(chosenWord[i])) {
                computer.hiddenLetters += chosenWord[i];
            } else {
            computer.hiddenLetters += "-";
        }
    }
};

// method to check for incorrect letters and update guessesLeft
// if else method to check for game won or lost
const checkGameOver = function () {
    if (!computer.hiddenLetters.includes("-")) {
        alert("You Guessed Correctly!");
        resetGame();        
        player.wins++;
    }
    else if (player.guessesLeft <= 0) {
        alert("You lose! Play Again!");
        player.losses++;
        resetGame();
    }
};

const checkIncorrectGuess = function (guess) {
    if (!chosenWord.includes(guess)) {
        --player.guessesLeft;
    }
};

const updateDOM = function () {
    document.querySelector("#wins").innerHTML = player.wins;
    document.querySelector("#losses").innerHTML = player.losses;
    document.querySelector("#guesses-remaining").innerHTML = player.guessesLeft;
    document.querySelector("#guesses").innerHTML = player.guesses.join(", ");
    document.querySelector("#hidden-word").innerHTML = computer.hiddenLetters;
}

// Start Game
resetGame();

document.onkeyup = function (event) {
    var userGuess = event.key.toLowerCase();
    isLetter(userGuess);
    player.checkDuplicateGuess(userGuess);
    player.addGuess(userGuess);
    checkCorrectGuess();
    checkIncorrectGuess(userGuess);
    checkGameOver();
    updateDOM();
    if (validGuess) {
        console.log("Is letter is true");
    } else if (!validGuess) {
        console.log("isLetter is False");
    }
}