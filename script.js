let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector("#subt");
const userinput = document.querySelector("#guessField");
const guessslot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startover = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevguess = [];
let numguess = 1;
let playgame = true;

if (playgame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userinput.value);
    validateguess(guess);
  });
}

function validateguess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1");
  } else if (guess > 100) {
    alert("Please enter a number less than 100");
  } else {
    prevguess.push(guess);
    if (prevguess.length >= 10) {
      displayguess(guess);
      displaymessage(`Game over, the random number was ${randomNumber}`);
      endgame();
    } else {
      displayguess(guess);
      checkguess(guess);
    }
  }
}

function checkguess(guess) {
  if (guess === randomNumber) {
    displaymessage("You guessed it right");
    endgame();
  } else if (guess > randomNumber) {
    displaymessage("The number is too high");
  } else if (guess < randomNumber) {
    displaymessage("The number is too low");
  }
}

function displayguess(guess) {
  userinput.value = "";
  guessslot.innerHTML += `${guess} `;
  numguess++;
  remaining.innerHTML = `${11 - numguess}`;
}

function displaymessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function newgame() {
  userinput.value = "";
  userinput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h1 id="newgame">Start New Game</h1>`;
  startover.appendChild(p);
  playgame = false;

  const newgamebutton = document.querySelector("#newgame");
  newgamebutton.addEventListener("click", function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevguess = [];
    numguess = 1;
    guessslot.innerHTML = "";
    remaining.innerHTML = `${11 - numguess}`;
    userinput.removeAttribute("disabled");
    startover.removeChild(p);
    playgame = true;
  });
}

function endgame() {
  userinput.setAttribute("disabled", "");
  newgame();
}
