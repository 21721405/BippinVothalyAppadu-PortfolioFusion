// ========== STEP 4: Parameterized function ==========
function changeColour(color) {
    const square = document.getElementById("square");
    if (square) {
      square.style.backgroundColor = color;
    }
  }
  
  // ========== STEP 8: Buzzword Generator ==========
  const buzzwords = [
    "Synergize scalable solutions",
    "Leverage strategic frameworks",
    "Optimize cross-functional alignment",
    "Empower agile innovation",
    "Streamline customer-centric design",
    "Drive data-driven disruption",
    "Monetize digital ecosystems",
    "Deliver robust KPIs",
    "Facilitate frictionless onboarding",
    "Harness the power of AI"
  ];
  
  function showRandomBuzzword() {
    const words = document.getElementById("words");
    if (words) {
      const random = Math.floor(Math.random() * buzzwords.length);
      words.textContent = buzzwords[random];
    }
  }
  
  // ========== STEP 5–8: DOM Handling ==========
  document.addEventListener("DOMContentLoaded", () => {
    const square = document.getElementById("square");
    const words = document.getElementById("words");
  
    if (square) {
      square.addEventListener("click", () => {
        changeColour("red");
        showRandomBuzzword();
      });
  
      square.addEventListener("mouseover", () => changeColour("green"));
      square.addEventListener("mouseout", () => changeColour("gray"));
    }
  
    if (words && !words.textContent) {
      words.textContent = "Welcome to Flatland! Interact with the square below 👇";
    }
  });
  
  
  
  
  
  