// DEFINE & DECLARE VARIABLES
const startButton = document.getElementById("startButton");
const inputTime = document.getElementById("inputTime");
const inputScore = document.getElementById("inputScore");
const endGameBtn = document.getElementById("stopButton");
const allRadios = document.getElementsByClassName("radiogrp");
const valueAccordingTime = document.getElementById("valueAccordingTime");

let radiobtns = document.getElementById("radiobtns");
let resultMessage = document.getElementById("resultMessage");
let allRadioButtons = document.getElementsByName("radiogroup");
let i;
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
  for (let i = 0; i < allRadios.length; i++) {
    allRadios[i].disabled = false;
  }

}





//FUNCTION TO REDUCE TIME IN INPUT FIELD AFTER CLICK ON START GAME BTN
function reduceTime() {
  if (inputTimeValue <= 0) {
    clearInterval(intervalId);
    clearInterval(setAutoClickTime);
    inputTime.readOnly = false;
    for (i = 0; i < allRadios.length; i++) {
      allRadios[i].disabled = true;
      allRadios[i].checked = false;
    }
    Percentage = (score / inputTimeValueStore) * 100;
    mypercentage();
    score = 0;
    inputScore.value = `${score}`;
    startButton.disabled = false;
    endGameBtn.disabled = true;
  } else {
    inputTimeValue--;
    inputTime.value = inputTimeValue;
  }
}

//WHEN YOU CLICK ON END GAME BUTTON THIS SECTION WORKS.
function EndGame() {
  startButton.disabled = false;
  endGameBtn.disabled = true;
  clearInterval(intervalId);
  clearInterval(setAutoClickTime);
  inputTime.value = 30;
  inputTime.readOnly = false;

  for (i = 0; i < allRadios.length; i++) {
    allRadios[i].disabled = true;
  }
  mypercentage();
  score = 0;
  inputScore.value = `${score}`;
}

//THIS SECTION WILL CLICKS RANDOMLY (AS A SYSTEM)
function autoClick() {
  let randomNumber = Math.floor(Math.random() * 60);
  allRadioButtons[randomNumber].addEventListener(
    "click",
    systemClickedRadio(allRadioButtons[randomNumber])
  );
}

//FUNCTION FOR ADDING AND REMOVING CLASS WHEN RADIO BUTTOS AUTO CLICK
function systemClickedRadio(radioForClick) {
  radioForClick.classList.add("systemClickRadio");
  systemClickedRadioID = radioForClick.id;
  setTimeout(() => {
    radioForClick.classList.remove("systemClickRadio");
  }, 1000);
}

// THIS SECTION WILL CLICKS (AS A USER) & UPDATE SCORE & CALCULATE PERCENTAGE
document.addEventListener("DOMContentLoaded", function () {
  Array.prototype.forEach.call(allRadios, function (element) {
    element.addEventListener(
      "click",
      function () {
        userId = element.id;
        if (systemClickedRadioID == userId) {
          score = score + 1;
          if (score <= 0) {
            score = 0;
            inputScore.value = score;
          } else {
            inputScore.value = score;
          }
        } else {
          score = score - 1;
          if (score <= 0) {
            score = 0;
            inputScore.value = score;
          } else {
            inputScore.value = score;
          }
        }
      },
      { once: true }
    );
  });
});

//GIVE FEEDBACK ACCORDING PERCENTAGE
function mypercentage() {
  if (Percentage >= 80) {
    resultMessage.innerHTML = "Congratulations";
  } else if (Percentage >= 60 && Percentage < 80) {
    resultMessage.innerHTML = "Good job & try again to get more scores";
  } else {
    resultMessage.innerHTML = "Sorry, better luck next time";
  }
}
