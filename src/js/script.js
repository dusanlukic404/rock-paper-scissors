const rulesBtn = document.querySelector(".btn");
const closeModalBtn = document.querySelector(".btn-close");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".rules-modal");
const gameContainer = document.querySelector(".game");
const options = ["rock", "paper", "scissors"];
const userPoints = document.querySelector(".points");
let localStorageScore = localStorage.getItem("userScore");
let selected = "",
  html = "",
  matchResult = "";

localStorageScore = localStorageScore ?? 0;
localStorage.setItem("userScore", localStorageScore);
userPoints.textContent = localStorageScore;

const closeModal = function () {
  overlay.classList.add("hidden");
};

document.querySelector("body").addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    overlay.classList.remove("hidden");
  } else if (
    e.target.classList.contains("overlay") ||
    e.target.classList.contains("close-btn")
  ) {
    closeModal();
  }
});

document.querySelector("body").addEventListener("keydown", function (e) {
  if ((e.key = "Escape")) {
    closeModal();
  }
});

const getHousePicked = function () {
  const picked = options[Math.floor(Math.random() * options.length)];
  html = ` <section class="playing container">
        <div class="pickers">
          <h2>You picked</h2>
          <div
            class="option-border option-border--${selected} option-border--playing"
          data-player="user">
            <div class="option ${selected}">
              <img src="./images/icon-${selected}.svg" alt="${selected}" />
            </div>
          </div>
        </div>
        <div class="result">
          <p>You lose</p>
          <button class="play-again-btn">Play again</button>
        </div>
        <div class="pickers">
          <h2>The house picked</h2>
          <div class="option-border option-border--${picked} option-border--playing" data-player="house">
            <div class="option ${picked}">
              <img src="./images/icon-${picked}.svg" alt="${picked}" />
            </div>
          </div>
        </div>
      </section>`;

  document.querySelector("main").innerHTML = html;

  const result = document.querySelector(".result p");

  function writeResult(score) {
    result.textContent = `You ${score}`;
    if (score === "win") {
      localStorageScore++;
      localStorage.setItem("userScore", localStorageScore);
      userPoints.textContent = localStorageScore;

      // Adding pulse effect for winner
      document
        .querySelector(`.option-border[data-player="user"]`)
        .classList.add("option-border--winner");
    } else {
      localStorageScore--;
      localStorage.setItem("userScore", localStorageScore);
      userPoints.textContent = localStorageScore;

      // Adding pulse effect for winner
      document
        .querySelector(`.option-border[data-player="house"]`)
        .classList.add("option-border--winner");
    }
  }

  if (selected === picked) {
    result.textContent = "No winner";
  } else {
    switch (selected) {
      case "paper":
        picked === "rock" ? writeResult("win") : writeResult("lose");
        break;
      case "scissors":
        picked === "rock" ? writeResult("lose") : writeResult("win");
        break;
      case "rock":
        picked === "scissors" ? writeResult("win") : writeResult("lose");
        break;
    }
  }

  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.addEventListener("click", function () {
    window.location.reload();
  });
};

function startGame(selected) {
  gameContainer.remove();
  html = `<section class="playing container">
  <div class="pickers">
  <h2>You picked</h2>
  <div
  class="option-border option-border--${selected} option-border--playing"
          >
          <div class="option ${selected}">
          <img src="./images/icon-${selected}.svg" alt="${selected}" />
            </div>
            </div>
            </div>
            <div class="pickers">
          <h2>The house picked</h2>
          <div class="house-picker"></div>
          </div>
          </section> `;
  document.querySelector("main").innerHTML = html;

  setTimeout(getHousePicked, 1000);
}

gameContainer.addEventListener("click", function (e) {
  if (!e.target.dataset.option) return;

  selected = e.target.dataset.option;
  startGame(selected);
});

gameContainer.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    selected = e.target.dataset.option;
    startGame(selected);
  }
});
