import { Notify } from "notiflix";

const promisesForm = document.querySelector('form');
promisesForm.addEventListener('submit', onPromisesFormSubmit);

function onPromisesFormSubmit(e) {
  e.preventDefault();
  const { amount, delay, step } = e.target.elements;
  const submitButton = e.target.lastElementChild
  let delayTime = Number(delay.value)
  submitButton.disabled = true;
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayTime)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayTime += Number(step.value);
  }


  setTimeout(() => {
    submitButton.disabled = false;
  }, delayTime)
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  }
