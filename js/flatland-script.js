// ========== STEP 4: Parameterized function ==========
function changeColour(color) {
    const square = document.getElementById("square");
    if (square) {
      square.style.backgroundColor = color;
    }
  }
  
  // ========== STEP 5–7: DOM handling ==========
  document.addEventListener("DOMContentLoaded", () => {
    const square = document.getElementById("square");
    const words = document.getElementById("words");
  
    if (square) {
      square.addEventListener("click", () => changeColour("red"));
      square.addEventListener("mouseover", () => changeColour("green"));
      square.addEventListener("mouseout", () => changeColour("gray"));
    }
  
    if (words) {
      words.textContent = "Welcome to Flatland! Interact with the square below 👇";
    }
  });
  
  
  
  
  