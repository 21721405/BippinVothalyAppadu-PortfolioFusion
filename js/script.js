// ========== ROCK PAPER SCISSORS GAME ==========
(() => {
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
  
    if (playerChoiceIcon && computerChoiceIcon) {
      document.querySelectorAll(".choice").forEach(choice => {
        choice.addEventListener("click", () => {
          clickSound.currentTime = 0;
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
    }
  })();
  
  // ========== RSS READER ==========
  (() => {
    const feed = document.getElementById("feed");
    const tagSelect = document.getElementById("tagSelect");
    const authorSelect = document.getElementById("authorSelect");
  
    if (feed && tagSelect && authorSelect) {
      let page = 1;
  
      function loadArticles(reset = false) {
        if (reset) {
          page = 1;
          feed.innerHTML = "Loading articles...";
        }
  
        const tag = tagSelect.value;
        const author = authorSelect.value;
  
        let url = `https://dev.to/api/articles?per_page=6&page=${page}`;
        if (tag) url += `&tag=${tag}`;
        if (author) url += `&username=${author}`;
  
        fetch(url)
          .then(res => res.json())
          .then(articles => {
            if (reset) feed.innerHTML = "";
  
            if (!articles.length) {
              feed.innerHTML = "<p>No articles found for this filter.</p>";
              return;
            }
  
            articles.forEach(article => {
              const card = document.createElement('a');
              card.className = 'rss-card';
              card.href = article.url;
              card.target = '_blank';
  
              card.innerHTML = `
                <img src="${article.cover_image || 'https://via.placeholder.com/400x180?text=No+Image'}" alt="Cover">
                <div class="rss-content">
                  <h3>${article.title}</h3>
                  <p>${article.description || 'No summary available.'}</p>
                  <div class="rss-meta">
                    <img src="${article.user.profile_image}" alt="${article.user.name}">
                    <span class="author">${article.user.name}</span>
                    <span>• ${new Date(article.published_at).toLocaleDateString()}</span>
                  </div>
                </div>
              `;
              feed.appendChild(card);
            });
          })
          .catch(() => {
            feed.innerHTML = "<p>❌ Could not load articles. Try again later.</p>";
          });
      }
  
      function loadMore() {
        page++;
        loadArticles(false);
      }
  
      document.querySelector(".controls button")?.addEventListener("click", () => loadArticles(true));
      document.querySelector(".load-more button")?.addEventListener("click", () => loadMore());
  
      // Initial load
      loadArticles();
    }
  })();
  

