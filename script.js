const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

const emojis = ["🍎", "🍌", "🍓", "🍇", "🍒", "🍉", "🥝", "🍋"];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle function
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Handle flipping
function flipCard(card, emoji) {
  if (flippedCards.length === 2 || card.classList.contains("flip")) return;
  
  card.classList.add("flip");
  flippedCards.push({ card, emoji });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [first, second] = flippedCards;
  if (first.emoji === second.emoji) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === emojis.length) {
      setTimeout(() => alert("You won!"), 300);
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove("flip");
      second.card.classList.remove("flip");
      flippedCards = [];
    }, 800);
  }
}

// Restart game
function restartGame() {
  matchedPairs = 0;
  flippedCards = [];
  createBoard();
}

restartBtn.addEventListener("click", restartGame);


// Create and display cards
function createBoard() {
  gameBoard.innerHTML = "";
  const shuffledEmojis = shuffle([...emojis, ...emojis]);
  shuffledEmojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back"></div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card, emoji));
    gameBoard.appendChild(card);
  });
  cards = document.querySelectorAll(".card");
}

// Initialize
createBoard();
