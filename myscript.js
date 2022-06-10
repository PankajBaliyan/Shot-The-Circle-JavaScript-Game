//THIS SECTION IS FOR CREATE MATRIX FOR RADIO BUTTONS
  for (var i = 1; i <= 60; i++) {
    if (i % 10 - 1 == 0) {
      let x = document.createElement("br");
      document.getElementById("radiobtns").appendChild(x);
    }
    let x = document.createElement("INPUT");
    x.setAttribute("type", "radio");
    x.setAttribute("class", "radiogrp");
    x.setAttribute("name", "radiogroup");
    x.setAttribute("disabled", "");
    x.setAttribute("id", `${i}`);
    document.getElementById("radiobtns").appendChild(x);
  }

//FUNCTION FOR ADDING AND REMOVING CLASS WHEN RADIO BUTTOS AUTO CLICK
let compId;
function hello(x){
  x.classList.add('userselectedradio')
  compId=x.id
  setTimeout(()=>{
    x.classList.remove('userselectedradio')
  },1000)
}
//THIS SECTION WILL CLICKS RANDOMLY (AS A SYSTEM)
let systemClicks = [];
function autoclick() {
  let array = document.getElementsByName("radiogroup");
  let randomNumber = Math.floor(Math.random() * 60);
  array[randomNumber].addEventListener('click',hello(array[randomNumber]))
}
//THIS SECTION WILL CLICKS (AS A USER) & UPDATE SCORE & CALCULATE PERCENTAGE
let userClicks = [];
let userId;
let score = 0;
let Percentage = 0;
document.addEventListener("DOMContentLoaded",function () {
  const allCards = document.getElementsByClassName('radiogrp');
    Array.prototype.forEach.call(allCards, function (element) {
        element.addEventListener('click', function () {
          userId=element.id
          if(compId==userId){
            score = score + 1;
            document.getElementById("score").value = score;
          }else{
            score=score-1
            document.getElementById("score").value = score;
          }
          Percentage = (score / totalTime) * 100;
        },{once:true});
    });
})

//SECTION FOR TIMING CONTROL
function startTimer() {
  let obj = document.getElementById("timer");
  let seconds;
  seconds = Number(obj.display.value);
  if (seconds <= 0) {
    clearInterval(Id);
    clearInterval(tymint);
    seconds = 0;
    document.getElementById("restrtbtn").disabled = false;
    document.getElementById("stopbtn").disabled = true;
    mypercentage();
    let x = document.getElementsByClassName("radiogrp");
    let i;
    for (i = 0; i < x.length; i++) {
      x[i].disabled = true;
      x[i].checked = false;
    }
  } else {
    seconds--;
  }
  obj.display.value = seconds;
}

//STOP BUTTON
function StopandTimer() {
  document.getElementById("restrtbtn").disabled = false;
  clearInterval(tymint);
  clearInterval(Id);
  const data = document.querySelectorAll(".radiogrp")
  data.forEach(function (card) {
    card.disabled = true;
  })
}

//RESTART BUTTON
function restartgame() {
  document.getElementById("startbtn").disabled = true;
  document.getElementById("restrtbtn").disabled = true;
  document.getElementById("stopbtn").disabled = false;
  document.getElementById("Time").value = 30;
  document.getElementById("timeaccvalue").innerHTML = 30;
  score = 0;
  document.getElementById("score").value = `${score}`;
  data = document.querySelectorAll(".radiogrp")
  data.forEach(function (card) {
    card.disabled = false;
  })
  Id = setInterval("startTimer()", 1000);
  tymint = setInterval(autoclick, 1000);
}


//WHEN YOU CLICK ON START BUTTON THIS SECTION WORKS.
function StartandTimer() {
  document.getElementById("startbtn").disabled = true;
  document.getElementById("restrtbtn").disabled = true;
  document.getElementById("stopbtn").disabled = false;
  document.getElementsByName("radiogroup").disabled = false;
  Id = setInterval("startTimer()", 1000);
  tymint = setInterval(autoclick, 1000);
  document.getElementById("score").value = `${score}`;
  if (score == 0) {
    document.getElementById("result").innerHTML = "Result Will be Shown here.";
  }
  let x = document.getElementsByClassName("radiogrp");
  let i;
  for (i = 0; i < x.length; i++) {
    x[i].disabled = false;
  }
}
//GIVE FEEDBACK ACCORDING PERCENTAGE
let perr = 0;
function mypercentage() {
  perr = Percentage;
  if (perr >= 80) {
    document.getElementById("result").innerHTML = "Congratulations";
  } else if (perr >= 60 && perr < 80) {
    document.getElementById("result").innerHTML =
      "Good job & try again to get more scores";
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, better luck next time";
  }
}
//CHANGE THE TIME IN PARAGRAPH ACCORDING TO TIME CHOOSEN
let totalTime;
function timemanage() {
  totalTime = document.getElementById("Time").value;
  let timesync = document.getElementById("Time").value;
  document.getElementById("timeaccvalue").innerHTML = timesync;
}