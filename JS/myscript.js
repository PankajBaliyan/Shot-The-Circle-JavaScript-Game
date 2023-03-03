// DEFINE & DECLARE VARIABLES
const startButton = document.getElementById("startButton");
const endGameBtn = document.getElementById("stopButton");
const inputTime = document.getElementById("inputTime");
const inputScore = document.getElementById("inputScore");
const valueAccordingTime = document.getElementById("valueAccordingTime");
const resultMessage = document.getElementById("resultMessage");

let radiobtns = document.getElementById("radiobtns");
let allRadioButtons = document.getElementsByName("radiogroup");
let userId;
let score = 0;
let intervalId;
let inputTimeValue;
let Percentage = 0;
let setAutoClickTime;
let inputTimeValueStore;
let systemClickedRadioID;

//FUNCTION FOR UPDATE TIME IN TOP PARAGRAPH ACCORDING TO USER INPUT TIME/DEFAULT TIME ON FIRST WINDOW LOAD
window.onload = updateTime;
function updateTime() {
  inputScore.value = 0;
  valueAccordingTime.innerHTML = Number(inputTime.value);
}

// Create matrix for radio buttons
for (let i = 1; i <= 60; i++) {
  // Check if index is divisible by 10
  if ((i % 10) + 1 === 1) {
    // Create a string that represents the radio button and line break elements
    const radioBtnString = `<input type="radio" class="radiogrp" name="radiogroup" id="${i}" disabled><br>`;
    radiobtns.insertAdjacentHTML("beforeend", radioBtnString);
  } else {
    // Create a radio button element and append it to the parent element
    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("class", "radiogrp");
    inputRadio.setAttribute("name", "radiogroup");
    inputRadio.setAttribute("disabled", "");
    inputRadio.setAttribute("id", `${i}`);
    radiobtns.appendChild(inputRadio);
  }
}

const allRadios = document.querySelectorAll(".radiogrp");

// When you click on the start button, this section works.
startButton.addEventListener("click", startGame);
function startGame() {
  // Check if input time is valid
  if (inputTime.value <= 0) {
    alert("Time should be more than 0");
    return;
  }

  // Reset score
  inputScore.value = 0;

  // Disable time input and enable end game button
  inputTime.readOnly = true;
  endGameBtn.disabled = false;
  startButton.disabled = true;

  // Store initial time value and start countdown
  inputTimeValueStore = inputTime.value;
  inputTimeValue = Number(inputTime.value);
  valueAccordingTime.innerHTML = inputTimeValue;
  intervalId = setInterval(reduceTime, 1000);

  // Start auto-click interval and enable radio buttons
  setAutoClickTime = setInterval(autoClick, 1000);
  allRadios.forEach((radio) => (radio.disabled = false));
}

//WHEN YOU CLICK ON END GAME BUTTON THIS SECTION WORKS.
endGameBtn.addEventListener("click", showModal);

function showModal() {
  // Get the modal
  const modal = document.getElementById("modal-opened");
  modal.style.display = "flex";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  endGame();

  const closeModalBtn = document.querySelector(".link-2");
  const resetModalBtn = document.querySelector(".modal__btn");

  // When the user clicks on <span> (x), close the modal
  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  }
  resetModalBtn.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function endGame() {
  startButton.disabled = false;
  endGameBtn.disabled = true;
  clearInterval(intervalId);
  clearInterval(setAutoClickTime);
  inputTime.value = 30;
  inputTime.readOnly = false;

  allRadios.forEach(function (radio) {
    radio.disabled = true;
  });

  resultMessage.innerHTML =
    Percentage >= 80
      ? `Congratulations.<br>Your Score : ${Math.round(Percentage)} %`
      : Percentage >= 60
        ? `Good job & try again to get more scores.<br>Your Score : ${Math.round(Percentage)} %`
        : `Sorry, better luck next time.<br>Your Score : ${Math.round(Percentage)} %`;

  score = 0;
  inputScore.value = score;
}

//THIS SECTION WILL CLICKS RANDOMLY (AS A SYSTEM)
function autoClick() {
  let randomNumber = Math.floor(Math.random() * 60);
  allRadioButtons[randomNumber].addEventListener(
    "click",
    systemClickedRadio(allRadioButtons[randomNumber])
  );
}

//FUNCTION TO REDUCE TIME IN INPUT FIELD AFTER CLICK ON START GAME BTN
function reduceTime() {
  if (inputTimeValue <= 0) {
    clearInterval(intervalId);
    clearInterval(setAutoClickTime);
    inputTime.readOnly = false;

    for (const radio of allRadios) {
      radio.disabled = true;
      radio.checked = false;
    }

    Percentage = (score / inputTimeValueStore) * 100;
    showModal();
    resultMessage.innerHTML =
      Percentage >= 80
        ? `Congratulations.<br>Your Score : ${Math.round(Percentage)} %`
        : Percentage >= 60
          ? `Good job & try again to get more scores.<br>Your Score : ${Math.round(Percentage)} %`
          : `Sorry, better luck next time.<br>Your Score : ${Math.round(Percentage)} %`;
    score = 0;
    inputScore.value = `${score}`;
    startButton.disabled = false;
    endGameBtn.disabled = true;
  } else {
    inputTimeValue--;
    inputTime.value = inputTimeValue;
  }
}

//FUNCTION FOR ADDING AND REMOVING CLASS WHEN RADIO BUTTONS AUTO CLICK
function systemClickedRadio(radioForClick) {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => {
    if (radio.checked) {
      radio.checked = false; // Uncheck the selected radio button
    }
  });
  // Click on the new radio button
  radioForClick.classList.add("systemClickRadio");
  systemClickedRadioID = radioForClick.id;
  setTimeout(() => {
    radioForClick.classList.remove("systemClickRadio");
  }, 1000);
}


// THIS SECTION WILL CLICKS (AS A USER) & UPDATE SCORE & CALCULATE PERCENTAGE
document.addEventListener("DOMContentLoaded", () => {
  allRadios.forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        userId = element.id;
        if (systemClickedRadioID === userId) {
          score++;
        } else {
          score--;
        }
        score = Math.max(0, score);
        inputScore.value = `${score}`;
      },
    );
  });
});
