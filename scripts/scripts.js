const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guesses = document.querySelector(".guesses-text b");
const game = document.querySelector(".game-modal");

let currentWord = "";
let incorrectGuesses = 0;
let correctLetters = 0;
const maxGuesses = 6;

const getRandoWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toUpperCase();
    document.querySelector(".hint-text b").innerHTML = hint
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}

const restartGame = () => {
    game.classList.remove("show");
    incorrectGuesses = 0;
    correctLetters = 0;
    guesses.innerText = `${incorrectGuesses} / ${maxGuesses}`
    document.querySelector(".hangman").src = `images/hangman-${incorrectGuesses}.svg`;
    keyboard.querySelectorAll("button").forEach((button) => {
        button.classList.remove("disabled");
        button.disabled = false;
    })
    getRandoWord();
}

const gameOver = (won) => {
    game.classList.add("show");
    const message = won ? `You found the word` : `The correct word was`;
    game.querySelector("img").src = `images/${won ? "winner" : "loser"}.gif`;
    game.querySelector("h4").innerText = won ? "WINNER" : "LOSER";
    game.querySelector("p").innerHTML = `${message}: <b>${currentWord}</b>`;
    game.querySelector("p b").style.color = won ? "green" : "red";


    document.querySelector(".play-again").addEventListener("click", () => {
        restartGame();
    })
}

const guessLetter = (button, clicked) => {
    button.classList.add("disabled");
    button.disabled = true;

    if (currentWord.includes(clicked)) {
        [...currentWord].forEach((letter, i) => {
            if (letter === clicked) {
                correctLetters++;
                wordDisplay.querySelectorAll("li")[i].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[i].classList.add("guessed");
            }
        })

        if (correctLetters === currentWord.length) return gameOver(true);
    } else {
        incorrectGuesses++;
        guesses.innerText = `${incorrectGuesses} / ${maxGuesses}`;
        document.querySelector(".hangman").src = `images/hangman-${incorrectGuesses}.svg`;

        if (incorrectGuesses === maxGuesses) return gameOver(false);
    }
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", (e) => guessLetter(e.target, button.innerText));
}

getRandoWord();
