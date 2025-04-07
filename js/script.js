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
    const feedSourceSelect = document.getElementById("feedSource");
  
    const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
    const feedUrls = {
      devto: "https://dev.to/api/articles",
      bbc: "https://feeds.bbci.co.uk/news/rss.xml",
      mozilla: "https://hacks.mozilla.org/feed/"
    };
  
    let page = 1;
    let rssCache = []; // cache for RSS sources
    const batchSize = 6;
    let currentRssIndex = 0;
  
    function renderArticles(articles, isDevto = false) {
      const nextBatch = isDevto ? articles : articles.slice(currentRssIndex, currentRssIndex + batchSize);
  
      nextBatch.forEach(article => {
        const card = document.createElement("a");
        card.className = "rss-card";
        
        card.innerHTML = `
          <img src="${article.cover_image || article.thumbnail || 'https://via.placeholder.com/400x180?text=No+Image'}" alt="Cover">
          <div class="rss-content">
            <h3>${article.title}</h3>
            <p>${article.description || article.contentSnippet || 'No summary available.'}</p>
            <div class="rss-meta">
             ${article.author ? `<span class="author">${article.author}</span>` : ""}
             <span>• ${new Date(article.pubDate || article.published_at).toLocaleDateString()}</span>
          </div>
          <a href="${article.url || article.link}" target="_blank" class="read-more-link">Read More →</a>
         </div>
        `;
        feed.appendChild(card);
      });
  
      if (!isDevto) currentRssIndex += batchSize;
    }
  
    function loadArticles(reset = false) {
      const source = feedSourceSelect.value;
      const isDevto = source === "devto";
      const tag = tagSelect.value;
      const author = authorSelect.value;
  
      // Toggle Load More visibility
      document.querySelector(".load-more").style.display = "block";
  
      if (reset) {
        feed.innerHTML = "Loading articles...";
        page = 1;
        currentRssIndex = 0;
        rssCache = [];
      }
  
      if (isDevto) {
        let url = `${feedUrls.devto}?per_page=6&page=${page}`;
        if (tag) url += `&tag=${tag}`;
        if (author) url += `&username=${author}`;
  
        fetch(url)
          .then(res => res.json())
          .then(data => {
            if (reset) feed.innerHTML = "";
            if (!data || !data.length) {
              feed.innerHTML = "<p>No articles found.</p>";
              return;
            }
            renderArticles(data, true);
          })
          .catch(() => {
            feed.innerHTML = "<p>❌ Could not load Dev.to articles.</p>";
          });
  
      } else {
        if (rssCache.length && !reset) {
          renderArticles(rssCache);
          return;
        }
  
        fetch(`${apiUrl}${feedUrls[source]}`)
          .then(res => res.json())
          .then(data => {
            if (reset) feed.innerHTML = "";
            if (!data.items || !data.items.length) {
              feed.innerHTML = "<p>No articles found.</p>";
              return;
            }
            rssCache = data.items;
            renderArticles(rssCache);
          })
          .catch(() => {
            feed.innerHTML = "<p>❌ Could not load RSS feed.</p>";
          });
      }
    }
  
    function loadMore() {
      const source = feedSourceSelect.value;
      if (source === "devto") {
        page++;
        loadArticles(false);
      } else if (rssCache.length > currentRssIndex) {
        renderArticles(rssCache);
      }
    }
  
    document.querySelector(".controls button")?.addEventListener("click", () => loadArticles(true));
    document.querySelector(".load-more button")?.addEventListener("click", () => loadMore());
  
    loadArticles(true);
  })();
  
  
  

