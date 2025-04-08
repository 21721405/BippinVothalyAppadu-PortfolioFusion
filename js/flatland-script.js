// Step 3 (and Step 4): Single reusable function
function changeColour(color) {
    const square = document.getElementById("square");
    if (square) {
      square.style.backgroundColor = color;
    }
  }
  
  // Step 5 & 6: All logic inside one DOMContentLoaded block
  document.addEventListener("DOMContentLoaded", () => {
    const square = document.getElementById("square");
    const words = document.getElementById("words");
  
    // Step 5: Add event listeners
    if (square) {
      square.addEventListener("click", () => changeColour("red"));
      square.addEventListener("mouseover", () => changeColour("green"));
      square.addEventListener("mouseout", () => changeColour("gray"));
    }
  
    // Step 6: Add greeting message
    if (words) {
      words.textContent = "Welcome to Flatland! Interact with the square below 👇";
    }
  });
  
  
  
  