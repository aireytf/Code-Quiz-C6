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

// Function to handle a choice click
function handleChoiceClick(event) {
    if (event.target.matches("button")) {
      const selectedChoiceIndex = parseInt(event.target.getAttribute("data-index"));
      const currentQuestion = questions[currentQuestionIndex];
  
    // Update the userChoice property of the current question
    currentQuestion.userChoice = currentQuestion.choices[selectedChoiceIndex];
  
      // Check if the selected choice is correct
      if (currentQuestion.correctIndex === selectedChoiceIndex) {
        feedbackElement.textContent = "Correct!";
        correctSound.play(); // Play correct sound
      } else {
        feedbackElement.textContent = "Wrong! -10 seconds";
        timeRemaining -= 10;
        incorrectSound.play(); // Play incorrect sound
  
        // Ensure time doesn't go negative
        if (timeRemaining < 0) {
          timeRemaining = 0;
        }
      }
  
      // Move to the next question
      currentQuestionIndex++;
  
      // Check if there are more questions
      if (currentQuestionIndex < questions.length) {
        // Show feedback for a short duration
        feedbackElement.classList.remove("hide");
  
        // Delay for 1 second before showing the next question
        setTimeout(function () {
          feedbackElement.classList.add("hide");
          showQuestion();
        }, 1000);
      } else {
        // If there are no more questions, end the quiz
        endQuiz();
      }
    }
  }

// Function to end the quiz
function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
  
    // Calculate the number of correct answers
    const correctAnswers = questions.reduce((count, question) => {
      // Check if the user's choice matches the correct answer
      if (question.userChoice === question.choices[question.correctIndex]) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  
    // Hide questions, show end screen
    document.getElementById("questions").classList.add("hide");
    endScreenElement.classList.remove("hide");
  
    // Display the number of correct answers as the final score
    document.getElementById("final-score").textContent = correctAnswers;
}
