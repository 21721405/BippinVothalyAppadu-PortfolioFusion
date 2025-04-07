const choices = ["rock", "paper", "scissors"];
const emojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

let playerScore = 0;
let computerScore = 0;

const playerChoiceIcon = document.getElementById("playerChoiceIcon");
const computerChoiceIcon = document.getElementById("computerChoiceIcon");
const gameResultText = document.getElementById("gameResult");
const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const resetBtn = document.getElementById("resetGame");
const clickSound = document.getElementById("clickSound");


document.querySelectorAll(".choice").forEach(choice => {
  choice.addEventListener("click", () => {
    clickSound.currentTime = 0; // Rewind so it can play again fast
    clickSound.play();
    const playerChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();

    updateChoices(playerChoice, computerChoice);
    const result = getResult(playerChoice, computerChoice);
    updateScores(result);
    updateResultText(result);
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  playerChoiceIcon.textContent = "❔";
  computerChoiceIcon.textContent = "❔";
  gameResultText.textContent = "Game Result";
});

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateChoices(player, computer) {
  playerChoiceIcon.textContent = emojis[player];
  computerChoiceIcon.textContent = emojis[computer];
}

function getResult(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) return "win";
  return "lose";
}

function updateScores(result) {
  if (result === "win") playerScore++;
  if (result === "lose") computerScore++;

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
}

function updateResultText(result) {
  if (result === "win") {
    gameResultText.textContent = "You Win!";
    gameResultText.style.color = "#2ecc71";
  } else if (result === "lose") {
    gameResultText.textContent = "You Lose!";
    gameResultText.style.color = "#e74c3c";
  } else {
    gameResultText.textContent = "It's a Draw!";
    gameResultText.style.color = "#f1c40f";
  }
}

