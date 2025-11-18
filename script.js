const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

// Emoji list (each will appear twice)
const emojis = ["🍎", "🍋", "🍇", "🍉", "🍓", "🍒", "🥝", "🍌"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0; //Track how many matches are completed

// Simple shuffle using Fisher–Yates (easy + correct)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create game board
function createBoard() {
  gameBoard.innerHTML = "";
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  matchesFound = 0; //Reset match counter every game

  const cardsArray = shuffle([...emojis, ...emojis]);

  cardsArray.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-emoji", emoji);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back"></div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Handle card click
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

// Check if cards match
function checkMatch() {
  const match =
    firstCard.getAttribute("data-emoji") ===
    secondCard.getAttribute("data-emoji");

  if (match) {
    disableCards();
  } else {
    unflipCards();
  }
}

// If matched → keep face-up
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard = null;
  secondCard = null;

  matchesFound++; // Increase match count

  // If all pairs are matched → show win alert
  if (matchesFound === emojis.length) {
    setTimeout(() => {
      alert("Congratulations! You found all pairs!");
    }, 300);
  }
}

// If not matched → flip back
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 800);
}

// Restart game
restartBtn.addEventListener("click", createBoard);

// Start the game
createBoard();
