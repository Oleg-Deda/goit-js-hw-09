function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const buttonStart = document.querySelector('[data-start]')
const buttonStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body')
buttonStop.disabled = true;
let timerId = null;
function onStartClick() {
  bodyEl.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStop.disabled = false;
  buttonStart.disabled = true;
}

function onStopClick() {
  clearInterval(timerId);
  buttonStop.disabled = true;
  buttonStart.disabled = false;
}
buttonStart.addEventListener('click', onStartClick);
buttonStop.addEventListener('click', onStopClick);
