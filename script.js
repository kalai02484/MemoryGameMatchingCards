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
