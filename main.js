let numberOfMsg = 2
let button = document.querySelector("button")
let firstMsg = document.querySelector(".msg")
let i = 0
button.onclick = function () {
  i = i +1
  console.log(i)
  firstMsg.style.transform = "translatex(-200%)"
  // firstMsg.style.left = "-100%"
  setTimeout(() => {
    firstMsg.innerHTML = "are you ready ?"
    firstMsg.style.transform = "translatex(0%)"
    button.innerHTML = "i'm ready"
  }, 1000);
  if (i == numberOfMsg) {
    button.style.opacity= "0"
    firstMsg.style.opacity = "0"
    setTimeout(() => {
      firstMsg.remove()
      button.remove()
    }, 1000);
    setTimeout(() => {
      window.open("quizapp/index.html","_parent")
    }, 2000);
  }
}
