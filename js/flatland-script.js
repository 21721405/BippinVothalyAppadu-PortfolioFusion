// ========== STEP 4: Parameterized function ==========
function changeColour(color) {
    const square = document.getElementById("square");
    if (square) {
      square.style.backgroundColor = color;
    }
  }
  
// ========== STEP 5: JS-only event handling ==========
document.addEventListener("DOMContentLoaded", () => {
    const square = document.getElementById("square");
    if (!square) return;
  
    square.addEventListener("click", () => changeColour("red"));
    square.addEventListener("mouseover", () => changeColour("green"));
    square.addEventListener("mouseout", () => changeColour("gray"));
  });
  
  
  