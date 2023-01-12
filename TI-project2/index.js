const area = document.querySelector("#area");
const score = document.querySelector("#score");
const scorePerSec = document.querySelector("#scorePerSec");
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const longest = document.querySelector("#longest");
const shortest = document.querySelector("#shortest");

let time = 10;

let words = [];

startBtn.addEventListener("click", () => {
  area.value = "";
  startBtn.disabled = true;
  area.disabled = false;
  area.focus();
  score.textContent = 0;
  scorePerSec.textContent = 0;
  const interval = setInterval(() => {
    time -= 1;
    if (time === 0) {
      startBtn.disabled = false;
      area.disabled = true;
      time = 10;
      //sort words by its length
      words.sort((a, b) => b.length - a.length);

      //first index === longest word, last undex === shortest(after sorting)
      longest.textContent = words[0];
      shortest.textContent = words[words.length - 1];
      words = [];
      clearInterval(interval);
    }
    timer.textContent = time;
  }, 1000);
});

area.addEventListener("input", () => {
  const trimmedValue = area.value.trim();
  words = trimmedValue.split(" ");
  const wordsAmmount = words.length;
  const wordsPerSec = (wordsAmmount / 10).toPrecision(3);

  score.textContent = wordsAmmount;
  scorePerSec.textContent = wordsPerSec;

  if (!trimmedValue) {
    score.textContent = 0;
    scorePerSec.textContent = 0;
  }
});
