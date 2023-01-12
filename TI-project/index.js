const questionListContent = document.querySelector("#questions");
const answerBtn = document.querySelector("#answers");
const playAgainBtn = document.querySelector("#playAgain");
const loader = document.querySelector("#loader");
const score = document.querySelector("#score");
const form = document.querySelector("#form");
const correctAnswers = [];

let correctAnswersNumber = 7;

const renderQuestionsContent = questionsList => {
  questionsList.forEach(el => {
    const questionsContainer = document.createElement("div");
    questionsContainer.classList.add("questions-quntainer__question-wrapper");
    const questionHeader = el.question;
    questionsContainer.textContent = questionHeader.replaceAll(
      /&quot;|&#039;|&ldquo;|&rdquo;/g,
      "'"
    );

    const allAnswers = [ ...el.incorrect_answers ];
    allAnswers[allAnswers.length] = el.correct_answer;

    //Random index
    const randomIndex = Math.floor(Math.random() * allAnswers.length);
    //Put correct answer(so far last index) to random index
    const temp = allAnswers[randomIndex];
    allAnswers[randomIndex] = allAnswers[allAnswers.length - 1];
    allAnswers[allAnswers.length - 1] = temp;

    correctAnswers.push(el.correct_answer);

    const questionsUl = document.createElement("ul");
    questionsUl.classList.add("questions-quntainer__questions-list");

    allAnswers.forEach(answer => {
      const answerContentWithInterpunction = answer.replaceAll(
        /&quot;|&#039;|&ldquo;|&rdquo;|&aacute;/g,
        "'"
      );
      const li = document.createElement("li");
      const radio = document.createElement("input");
      radio.classList.add("radio-input");
      radio.type = "radio";
      radio.value = answerContentWithInterpunction;
      radio.id = answerContentWithInterpunction;
      radio.name = questionHeader;
      radio.required = true;
      const label = document.createElement("label");
      label.classList.add("label");
      label.setAttribute("for", answerContentWithInterpunction);
      label.textContent = answerContentWithInterpunction;
      li.appendChild(radio);
      li.appendChild(label);

      questionsUl.appendChild(li);
    });

    questionsContainer.appendChild(questionsUl);

    questionListContent.appendChild(questionsContainer);
  });
};

const getQuestions = async () => {
  correctAnswers.length = 0;
  questionListContent.innerHTML = "";
  const data = await fetch(
    "https://opentdb.com/api.php?amount=7&type=multiple"
  );
  const questions = await data.json();
  const questionsContent = await questions.results;
  loader.style.display = "none";

  renderQuestionsContent(questionsContent);
};

getQuestions();

form.addEventListener("submit", e => {
  e.preventDefault();
  answerBtn.disabled = true;
  const answersList = document.querySelectorAll(".radio-input");
  answersList.forEach(answer => {
    if (correctAnswers.findIndex(el => el === answer.value) !== -1) {
      answer.nextElementSibling.style.color = "#82CD47";
    }
    if (
      answer.checked &&
      correctAnswers.findIndex(el => el === answer.value) === -1
    ) {
      answer.nextElementSibling.style.color = "red";
      correctAnswersNumber--;
    }
  });
  score.textContent = correctAnswersNumber;
});

playAgainBtn.addEventListener("click", e => {
  e.preventDefault();
  answerBtn.disabled = false;
  loader.style.display = "block";
  score.textContent = "";
  correctAnswersNumber = 7;
  getQuestions();
});
