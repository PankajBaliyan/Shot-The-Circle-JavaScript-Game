// DEFINE & DECLARE VERIABLES
let inputTime = document.getElementById("inputTime");
let radiobtns = document.getElementById("radiobtns");
let endGameBtn = document.getElementById("stopButton");
let inputScore = document.getElementById("inputScore");
let startGameBtn = document.getElementById("startButton");
let allRadios = document.getElementsByClassName("radiogrp");
let resultMessage = document.getElementById("resultMessage");
let allRadioButtons = document.getElementsByName("radiogroup");
let valueAccordingTime = document.getElementById("valueAccordingTime");
let i;
let userId;
let score = 0;
let intervalId;
let inputTimeValue;
let Percentage = 0;
let setAutoClickTime;
let inputTimeValueStore;
let systemClickedRadioID;

//FUNCTION FOR UPDATE TIME IN TOP PARAGRAPH ACCOURDING TO USER INPUT TIME/DEFAULT TIME ON FIRST WINDOW LOAD
function updateTime() {
  inputScore.value = 0;
  valueAccordingTime.innerHTML = Number(inputTime.value);
}

//THIS SECTION IS FOR CREATE MATRIX FOR RADIO BUTTONS
for (i = 1; i <= 60; i++) {
  if ((i % 10) - 1 == 0) {
    let lineBreak = document.createElement("br");
    radiobtns.appendChild(lineBreak);
  }
  let inputRadio = document.createElement("INPUT");
  inputRadio.setAttribute("type", "radio");
  inputRadio.setAttribute("class", "radiogrp");
  inputRadio.setAttribute("name", "radiogroup");
  inputRadio.setAttribute("disabled", "");
  inputRadio.setAttribute("id", `${i}`);
  radiobtns.appendChild(inputRadio);
}

//WHEN YOU CLICK ON START BUTTON THIS SECTION WORKS.
function StartGame() {
  if(inputTime.value<=0){
    alert("Time will be more than 0")
  }
  inputScore.value = 0;
  inputTime.readOnly = true;
  endGameBtn.disabled = false;
  startGameBtn.disabled = true;
  inputTimeValueStore = inputTime.value;
  inputTimeValue = Number(inputTime.value);
  setAutoClickTime = setInterval(autoclick, 1000);
  valueAccordingTime.innerHTML = Number(inputTime.value);

  intervalId = window.setInterval(function () {
    reduceTime();
  }, 1000);

  for (i = 0; i < allRadios.length; i++) {
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
    startGameBtn.disabled = false;
    endGameBtn.disabled = true;
  } else {
    inputTimeValue--;
    inputTime.value = inputTimeValue;
  }
}

//WHEN YOU CLICK ON END GAME BUTTON THIS SECTION WORKS.
function EndGame() {
  startGameBtn.disabled = false;
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
function autoclick() {
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
