// Step 3: Multiple Events - makeRed, makeGreen, makeGray

function makeRed() {
    const square = document.getElementById("square");
    if (square) square.style.backgroundColor = "red";
  }
  
  function makeGreen() {
    const square = document.getElementById("square");
    if (square) square.style.backgroundColor = "green";
  }
  
  function makeGray() {
    const square = document.getElementById("square");
    if (square) square.style.backgroundColor = "gray";
  }

  // Step 4: Refactored with parameterized function
function changeColour(color) {
    const square = document.getElementById("square");
    if (square) {
      square.style.backgroundColor = color;
    }
  }

  // Step 5: Use addEventListener for events
document.addEventListener("DOMContentLoaded", () => {
    const square = document.getElementById("square");
    if (!square) return;
  
    square.addEventListener("click", () => changeColour("red"));
    square.addEventListener("mouseover", () => changeColour("green"));
    square.addEventListener("mouseout", () => changeColour("gray"));
  });
  
  function changeColour(color) {
    const square = document.getElementById("square");
    if (square) {
      square.style.backgroundColor = color;
    }
  }
  
  
  