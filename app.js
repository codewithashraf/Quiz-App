const quiz = [
  {
    question: "HTML ka full form kya hai?",
    options: [
      "HyperText Markup Language",
      "HyperText Machine Language",
      "Hyper Transfer Markup Language",
      "HighText Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "CSS ka full form kya hai?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 0,
  },
  {
    question: "HTML file ka default extension kya hota hai?",
    options: [".htl", ".hml", ".html", ".htm"],
    correctAnswer: 2,
  },
  {
    question: "CSS mein background color set karne ka sahi syntax kya hai?",
    options: [
      "background: color;",
      "bg-color: color;",
      "background-color: color;",
      "color: background;",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "HTML mein line break insert karne ke liye kaunsa tag use hota hai?",
    options: ["<break>", "<lb>", "<br>", "<newline>"],
    correctAnswer: 2,
  },
  {
    question: "CSS mein font-size change karne ka sahi syntax kya hai?",
    options: [
      "font-size = 20px;",
      "font: 20px;",
      "font.size: 20px;",
      "font-size: 20px;",
    ],
    correctAnswer: 3,
  },
  {
    question: "HTML mein list banane ke liye kaunsa tag use hota hai?",
    options: ["<ul> ya <ol>", "<list>", "<li>", "<ulist>"],
    correctAnswer: 0,
  },
  {
    question: "HTML document mein head section kis cheez ke liye use hota hai?",
    options: [
      "Content display karne ke liye",
      "Meta information store karne ke liye",
      "Footer section ke liye",
      "Content styling ke liye",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "CSS mein kisi element ki width 100% set karne ka kya effect hoga?",
    options: [
      "Element container ke width tak expand hoga",
      "Element full screen cover karega",
      "Element ki height bhi 100% ho jayegi",
      "Koi effect nahi hoga",
    ],
    correctAnswer: 0,
  },
  {
    question: "HTML mein image insert karne ke liye kaunsa tag use hota hai?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    correctAnswer: 1,
  },
];

// javascript initailizer

const container = document.querySelector("#container");
const radioOptions = document.querySelectorAll(".options");
const [questionElem, option1, option2, option3, option4] =
  document.querySelectorAll(
    "#question, #option-1, #option-2, #option-3, #option-4"
  );
const optionsElem = document.querySelectorAll(".answer");
const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const submitBtn = document.querySelector("#submit-btn");

let currentQuiz = 0;

let scoreArr = [];
let score = 0;
let selectedCorrectIndex;

function quizLoad() {
  const { question, options, correctAnswer } = quiz[currentQuiz];
  questionElem.innerText = `Q${currentQuiz + 1}: ${question}`;

  options.forEach((currOption, index) => {
    optionsElem[index].innerText = currOption;
  });
}

quizLoad();

function getCorrectIndex() {
  let answer;
  radioOptions.forEach((curoption, index) => {
    if (curoption.checked) {
      answer = index;
    }
  });

  return answer;
}

function deselected() {
  return radioOptions.forEach((curOption, i) => (curOption.checked = false));
}

// next btn listener

nextBtn.addEventListener("click", (e) => {
  if (currentQuiz < quiz.length - 1) {
    currentQuiz++;
  }

  if (currentQuiz <= quiz.length) {
    selectedCorrectIndex = getCorrectIndex();

    if (selectedCorrectIndex || selectedCorrectIndex === 0) {
      scoreArr.push(selectedCorrectIndex);
    } else {
      scoreArr.push(false);
    }

    deselected();
    quizLoad();

    if (currentQuiz === quiz.length - 1) {
      submitBtn.style.display = "block";
      nextBtn.style.display = "none";
    }
  }
});

// back btn listener

backBtn.addEventListener("click", (e) => {
  if (currentQuiz >= 1) {
    currentQuiz--;
  }

  scoreArr.pop(scoreArr.length - 1);
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
  deselected();
  quizLoad();
});

// submit btn listener

submitBtn.addEventListener("click", (e) => {
  container.style.display = "none";
  container2.style.display = "flex";

  selectedCorrectIndex = getCorrectIndex();
  if (selectedCorrectIndex || selectedCorrectIndex === 0) {
    scoreArr.push(selectedCorrectIndex);
  } else {
    scoreArr.push(false);
  }

  for (let i = 0; i < quiz.length; i++) {
    if (scoreArr[i] === quiz[i].correctAnswer) {
      score++;
    }
  }
  document.querySelector(
    "#score"
  ).innerText = `Your Score: ${score} / ${quiz.length}`;
});
