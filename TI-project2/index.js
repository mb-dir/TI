const area = document.querySelector("#area");
const score = document.querySelector("#score");
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
let time = 10;

startBtn.addEventListener("click", () => {
  area.value = "";
  startBtn.disabled = true;
  area.disabled = false;
  area.focus();
  score.textContent = 0;
  const interval = setInterval(() => {
    time -= 1;
    if (time === 0) {
      startBtn.disabled = false;
      area.disabled = true;
      time = 10;
      clearInterval(interval);
    }
    timer.textContent = time;
  }, 1000);
});

area.addEventListener("input", () => {
  const trimmedValue = area.value.trim();
  const wordsAmmount = trimmedValue.split(" ").length;

  score.textContent = wordsAmmount;
  if (!trimmedValue) score.textContent = 0;
});
