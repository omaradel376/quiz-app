window.onload = function () {
  customInputRadio();
};
function customInputRadio() {
  let radioInputs = document.querySelectorAll("input");
  // for radio custom
  radioInputs.forEach((e) => {
    e.addEventListener("click", () => {
      for (let i = 0; i < radioInputs.length; i++) {
        radioInputs[i].checked = false;
        radioInputs[i].classList.remove("click");
      }

      if (e.classList.contains("click")) {
        e.classList.remove("click");
        e.checked = false;
      } else if (e.classList.contains("click") == false) {
        e.classList.add("click");
        e.checked = true;
      }
    });
  });
}

// End Radio Custom

// todo Start Quiz App
// Set varibles
let quizApp = document.querySelector(".quiz-app");
let titleQuiz = document.querySelector(".quiz-title");
let answersArea = document.querySelector(".answer-area");
let nextButton = document.querySelector("input[type='submit']");
let bullets = document.querySelector(".bullets");
let footer = document.querySelector(".footer");

// Set Sitting Of App
let current = 0;
let rigthAnswerOfUser = 0;
// let duration = 5
let interval;

geteQuiz();
function geteQuiz() {
  // Create Request
  let myReq = new XMLHttpRequest();
  myReq.open("GET", "quiz.json", true);
  myReq.send();
  myReq.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      // Create js object from json object
      let myJsObj = JSON.parse(this.responseText);
      let numOfQuiz = myJsObj.length;

      numberOfQuizInfo(numOfQuiz)

      // Function For Generate Quiz
      generateQuiz(myJsObj, numOfQuiz);

      // for create and handle bullets
      generateBullets(numOfQuiz);
      handleBullets();

      // function timer
      timer(31, numOfQuiz);

      // On Clicked At Next Button
      nextButton.onclick = () => nextButtonClicked(myJsObj, numOfQuiz);
    }
  };
}

// Function For Generate Quiz
function generateQuiz(obj, numOfQuiz) {
  if (current < numOfQuiz) {
    // Create h2 (The Title Of Quiz)
    let h2 = document.createElement("h2");
    h2.innerHTML = obj[current]["title"];
    titleQuiz.appendChild(h2);

    for (let i = 1; i <= 4; i++) {
      // Create Answers Of Quiz
      let answer = document.createElement("div");
      answer.className = "answer";
      answersArea.appendChild(answer);

      // Create Input Radio
      let inputRadio = document.createElement("input");
      inputRadio.type = "radio";
      inputRadio.id = `answer_${i}`; // Example: answer_1
      inputRadio.dataset.answer = obj[current][`answer_${i}`];
      answer.appendChild(inputRadio);

      // Create Label For Input
      let label = document.createElement("label");
      label.htmlFor = `answer_${i}`;
      label.appendChild(document.createTextNode(obj[current][`answer_${i}`])); // Example: answer_1
      answer.appendChild(label);
    }
  }
}

// On Clicked At Next Button
function nextButtonClicked(obj, numOfQuiz) {
  if (current < numOfQuiz) {
    // check rigth answer
    checkAnswer(obj);

    // Increase The Current 1 To Move Into Next Quiz
    current++;

    // Remove The Previous Quiz And Answers
    titleQuiz.innerHTML = "";
    answersArea.innerHTML = "";

    // Generate A new Quiz After Delete The Previous
    generateQuiz(obj, numOfQuiz);

    // generateBullets(numOfQuiz)
    handleBullets();

    // remove timer after create it again
    document.querySelector(".timer").remove();
    // start and create timer again after clicked on next button
    clearInterval(interval);
    timer(31, numOfQuiz);

    // custom input radio
    customInputRadio();
  }
  // if current == number of quiz end it because if you don't do it will be error
  if (current == numOfQuiz) {
    result(numOfQuiz);
  }
}



// function generate bullets
function generateBullets(numOfQuiz) {
  for (let i = 0; i < numOfQuiz; i++) {
    // create bullets
    let span = document.createElement("span");
    bullets.appendChild(span);
    if (i == 0) {
      // to change backgroundColor to blue
      span.className = "active";
    }
  }
}

// Handle Bullets
function handleBullets() {
  let spans = document.querySelectorAll(".bullets span");
  let arrayFromSpans = Array.from(spans);
  arrayFromSpans.forEach((span, index) => {
    // To Add Class Active [that make span blue] To Spans
    if (index == current) {
      span.className = "active";
    }
  });
}

function checkAnswer(obj) {
  // Choose The Rigth Answer From JSON File
  let rigthAnswer = obj[current].right_answer;
  // Choose The Checked Input
  let checkInput = document.querySelectorAll("input[type='radio']");
  checkInput.forEach((e) => {
    if (e.checked) {
      if (e.dataset.answer == rigthAnswer) {
        // INCREASE THE RIGTH ANSWER ONE
        rigthAnswerOfUser++;
      }
    }
  });
}

function result(numOfQuiz) {
  // Remove Parts From website because the quiz end
  nextButton.remove();
  titleQuiz.remove();
  answersArea.remove();
  footer.remove();

  // Create the msg
  let result = document.createElement("div");
  result.className = "result";
  quizApp.appendChild(result);

  // the degrees and rates
  if (rigthAnswerOfUser == numOfQuiz) {
    result.innerHTML = `<span>perfect</span> you got ${rigthAnswerOfUser} from ${numOfQuiz}`;
    document.querySelector(".result span").style.color = "#039be5";
  } else if (rigthAnswerOfUser >= numOfQuiz / 2) {
    result.innerHTML = `<span>good</span> you got ${rigthAnswerOfUser} from ${numOfQuiz}`;
    document.querySelector(".result span").style.color = "#ef6c00";
  } else {
    result.innerHTML = `<span>bad</span> you got ${rigthAnswerOfUser} from ${numOfQuiz}`;
    document.querySelector(".result span").style.color = "#f4511e";
  }
}

// function of timer
function timer(duration, numOfQuiz) {
  if (current < numOfQuiz) {
    // create timer div and add it in footer
    let timer = document.createElement("div");
    timer.className = "timer";
    footer.appendChild(timer);
    // start the timer
    interval = setInterval(() => {
      duration--;

      let munites = parseInt(duration / 60);
      let seconds = parseInt(duration % 60);
      timer.innerHTML = `${munites}:${seconds}`;
      // if timer = 0 click on the next button and stop the timer
      if (duration <= 0) {
        clearInterval(interval);
        nextButton.click();
      }
    }, 1000);
  }
}


let number_q = document.querySelector(".number-q span");
function numberOfQuizInfo(numOfQuiz) {
  number_q.textContent = numOfQuiz

}
