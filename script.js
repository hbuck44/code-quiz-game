// Define the questions and answers
const questions = [
    {
      question: "?",
      choices: ["", "", "", ""],
      answer: ""
    },
    {
      question: " ?",
      choices: ["", "", "", ""],
      answer: ""
    },
    {
      question: "?",
      choices: ["", "", "", ""],
      answer: ""
    }
  ];
  
  // Define variables for the game
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;
  
  // Define functions for the game
  function startQuiz() {
    // Hide the start button and show the first question
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
    
    // Start the timer
    timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function showQuestion() {
    // Display the current question and choices
    const questionData = questions[currentQuestion];
    document.getElementById("question").textContent = questionData.question;
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    for (let i = 0; i < questionData.choices.length; i++) {
      const choice = questionData.choices[i];
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", function() {
        if (choice === questionData.answer) {
          score++;
        } else {
          timeLeft -= 10;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      });
      choicesContainer.appendChild(button);
    }
  }
  
  function endQuiz() {
    // Stop the timer and show the score input form
    clearInterval(timerInterval);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("score-form").style.display = "block";
    document.getElementById("final-score").textContent = score;
  }
  
  function saveScore() {
    // Save the score and initials to localStorage or a server
    const initials = document.getElementById("initials").value;
    const scores = JSON.parse(localStorage.getItem("scores") || "[]");
    scores.push({ initials, score });
    localStorage.setItem("scores", JSON.stringify(scores));
    
    // Redirect to the high scores page
    window.location.href = "high-scores.html";
  }
  
  // Add event listeners to the start button and score form
  document.getElementById("start-button").addEventListener("click", startQuiz);
  document.getElementById("score-form").addEventListener("submit", function(event) {
    event.preventDefault();
    saveScore();
  });
  