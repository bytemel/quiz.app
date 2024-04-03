const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
      question: "What is the capital of France?",
      choices: [
        { text: "London", answer: false },
        { text: "Paris", answer: true },
        { text: "Rome", answer: false },
        { text: "Madrid", answer: false },
      ],
    },
    {
      question: "Who painted the Mona Lisa?",
      choices: [
        { text: "Leonardo da Vinci", answer: true },
        { text: "Pablo Picasso", answer: false },
        { text: "Vincent van Gogh", answer: false },
        { text: "Michelangelo", answer: false },
      ],
    },
    {
      question: "What is the largest planet in our solar system?",
      choices: [
        { text: "Mercury", answer: false },
        { text: "Venus", answer: false },
        { text: "Jupiter", answer: true },
        { text: "Mars", answer: false },
      ],
    },
    {
      question: "Who wrote the novel 'Pride and Prejudice'?",
      choices: [
        { text: "Jane Austen", answer: true },
        { text: "Charles Dickens", answer: false },
        { text: "Mark Twain", answer: false },
        { text: "William Shakespeare", answer: false },
      ],
    },
    {
      question: "What is the chemical symbol for gold?",
      choices: [
        { text: "Au", answer: true },
        { text: "Ag", answer: false },
        { text: "Cu", answer: false },
        { text: "Fe", answer: false },
      ],
    },
    {
      question: "Who invented the telephone?",
      choices: [
        { text: "Thomas Edison", answer: false },
        { text: "Alexander Graham Bell", answer: true },
        { text: "Nikola Tesla", answer: false },
        { text: "Albert Einstein", answer: false },
      ],
    },
    {
      question: "What is the tallest mountain in the world?",
      choices: [
        { text: "Mount Everest", answer: true },
        { text: "K2", answer: false },
        { text: "Kilimanjaro", answer: false },
        { text: "Matterhorn", answer: false },
      ],
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      choices: [
        { text: "Japan", answer: true },
        { text: "China", answer: false },
        { text: "South Korea", answer: false },
        { text: "India", answer: false },
      ],
    },
    {
      question: "Who is the author of the Harry Potter book series?",
      choices: [
        { text: "J.K. Rowling", answer: true },
        { text: "Stephen King", answer: false },
        { text: "George R.R. Martin", answer: false },
        { text: "Dan Brown", answer: false },
      ],
    },
    {
      question: "What is the largest ocean in the world?",
      choices: [
        { text: "Pacific Ocean", answer: true },
        { text: "Atlantic Ocean", answer: false },
        { text: "Indian Ocean", answer: false },
        { text: "Arctic Ocean", answer: false },
      ],
    },
    {
      question: "Who is known as 'The King of Pop'?",
      choices: [
        { text: "Michael Jackson", answer: true },
        { text: "Elvis Presley", answer: false },
        { text: "Justin Bieber", answer: false },
        { text: "Beyoncé", answer: false },
      ],
    },
    {
      question: "What is the chemical symbol for water?",
      choices: [
        { text: "Wa", answer: false },
        { text: "H2O", answer: true },
        { text: "Hy", answer: false },
        { text: "O2", answer: false },
      ],
    },
    {
      question: "Who developed the theory of relativity?",
      choices: [
        { text: "Isaac Newton", answer: false },
        { text: "Albert Einstein", answer: true },
        { text: "Galileo Galilei", answer: false },
        { text: "Stephen Hawking", answer: false },
      ],
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      choices: [
        { text: "Earth", answer: false },
        { text: "Mars", answer: true },
        { text: "Jupiter", answer: false },
        { text: "Saturn", answer: false },
      ],
    },
  ];

 setNextQuestion();

  nextButton.addEventListener("click", () => {
      const selectedButton = document.querySelector(".btn.selected");
      if (!selectedButton) {
          return alert("Please select an answer!");
      }
  
      const isCorrect = selectedButton.dataset.correct === "true";
      if (isCorrect) {
          score++;
      }
  
      selectedButton.classList.remove("selected");
  
      showFeedback(isCorrect);
  
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          setNextQuestion();
      } else {
          endQuiz();
      }
  });
  
  restartButton.addEventListener("click", () => {
      currentQuestionIndex = 0;
      score = 0;
      setNextQuestion();
  });
  
  function setNextQuestion() {
      resetState();
      showQuestion(questions[currentQuestionIndex]);
  }
  
  function showQuestion(question) {
      questionElement.innerText = question.question;
      question.choices.forEach((choice) => {
          const button = document.createElement("button");
          button.innerText = choice.text;
          button.classList.add("btn");
          if (choice.answer) {
              button.dataset.correct = "true";
          }
          button.addEventListener("click", () => selectAnswer(button));
          answerButtons.appendChild(button);
      });
      nextButton.style.display = "block";
  }
  
  function resetState() {
      while (answerButtons.firstChild) {
          answerButtons.removeChild(answerButtons.firstChild);
      }
      nextButton.style.display = "none";
      resultElement.innerText = "";
  }
  
  function selectAnswer(selectedButton) {
      const buttons = document.querySelectorAll(".btn");
      buttons.forEach((button) => {
          button.classList.remove("selected");
      });
      selectedButton.classList.add("selected");
  }
  
  function showFeedback(isCorrect) {
      if (isCorrect) {
          resultElement.innerText = "Correct!";
      } else {
          resultElement.innerText = "Incorrect!";
      }
  }
  
  function endQuiz() {
      const percentageScore = (score / questions.length) * 100;
      resultElement.innerText = `Quiz completed! Your score is ${score} out of ${questions.length}, which is ${percentageScore.toFixed(2)}%`;
      nextButton.style.display = "none";
  }