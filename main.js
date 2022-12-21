// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

// select letters contanier
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((letters) => {
  // create span
  let span = document.createElement("span");

  // create letter text node
  let theLetter = document.createTextNode(letters);

  // append letter to span
  span.appendChild(theLetter);

  // add class on span
  span.className = "letter-box";

  // append span to the letters container
  lettersContainer.appendChild(span);
});

// object of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "scala",
    "go",
    "fortran",
    "R",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Intersteller",
    "Inception",
    "Parasite",
    "Memento",
    "Coco",
    "Up",
    "Whiplash",
  ],
  people: [
    "Albert einstein",
    "Mahatma Ghandi",
    "Cleopatra",
    "Hitchcock",
    "Alexander",
  ],
  countries: ["Egypt", "Syria", "Qatar", "Yemen", "Palestine", "Bahrain"],
};

// get random property
let allKeys = Object.keys(words);

// random number depends on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// category
let randomPropName = allKeys[randomPropNumber];

// category words
let randomPropValue = words[randomPropName];

// random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// the chosen word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// create spans depend on word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    // add class to the span
    emptySpan.className = "has-space";
  }

  // add span to the letters guess contanier
  lettersGuessContainer.appendChild(emptySpan);
});

// select guess span
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get the clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        // set status to correct
        theStatus = true;

        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // outside loop

    // if letter is wrong

    if (theStatus != true) {
      // increase the wrong attempts
      wrongAttempts++;

      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endgame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
    }
  }
});

// end game function
function endgame() {
  // create popup div
  let div = document.createElement("div");

  // create text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );

  // append text to div;
  div.appendChild(divText);

  // add class on div
  div.className = "popup";

  // append to the body
  document.body.appendChild(div);
}
