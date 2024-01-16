// DOM elements
const startBtn = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const endScreenElement = document.getElementById("end-screen");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit");

// Quiz state variables
let currentQuestionIndex = 0;
let timeRemaining = 0;
let timerInterval;

// Event Listeners
// Event listener for the start button
startBtn.addEventListener("click", startQuiz);
// Event listener for the choices container
choicesElement.addEventListener("click", handleChoiceClick);
// Event listener for the submit button
submitBtn.addEventListener("click", saveHighScore);

// Function to start the quiz
function startQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  timeRemaining = 60;
  startTimer();

  // Hide start screen, show questions
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  // Display the first question
  showQuestion();
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
      timeRemaining--;
      timerElement.textContent = timeRemaining;
  
      // Check if time has run out
      if (timeRemaining <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to display a question
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Check if there are more questions
    if (!currentQuestion) {
      endQuiz();
      return;
    }
  
    // Display the question title
    questionTitleElement.textContent = currentQuestion.title;
  
    // Display the choices
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, index) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.setAttribute("data-index", index);
      choicesElement.appendChild(button);
    });
  }
  