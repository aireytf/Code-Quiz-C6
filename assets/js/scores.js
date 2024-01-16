// DOM elements
const highscoresList = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");

// Event listener for the clear button
clearBtn.addEventListener("click", clearHighscores);

// Function to display highscores
function displayHighscores() {
  // Retrieve highscores from storage
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Clear existing highscores
  highscoresList.innerHTML = "";

  // Display highscores
  highscores.forEach(function (score, index) {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials}: ${score.score}`;
    highscoresList.appendChild(listItem);
  });
}

// Function to clear highscores
function clearHighscores() {
  // Clear highscores from storage
  localStorage.removeItem("highscores");

  // Update the displayed highscores
  displayHighscores();
}

// Display highscores when the page loads
window.addEventListener("load", displayHighscores);