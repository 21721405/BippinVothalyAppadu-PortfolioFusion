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
  
  