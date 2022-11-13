function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');

}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const startButtonEl = document.querySelector('[data-start]');
const secondsEl = document.querySelector('[data-seconds]');
const minutesEl = document.querySelector('[data-minutes]');
const hoursEl = document.querySelector('[data-hours]');
const daysEl = document.querySelector('[data-days]');

const datePickerEl = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const chosenDate = Date.parse(selectedDates[0]);
    if (chosenDate <= Date.parse(new Date)) {
      Notify.failure('Please choose a date in future');
      return
    }
    startButtonEl.disabled = false;

    startButtonEl.addEventListener('click', () => {
      startButtonEl.disabled = true;
      datePickerEl.disabled = true;
      let timerId = null;
      timerId = setInterval(() => {
        let timerValues = convertMs(chosenDate - Date.parse(new Date()));

        secondsEl.textContent = addLeadingZero(timerValues.seconds);
        minutesEl.textContent = addLeadingZero(timerValues.minutes);
        hoursEl.textContent = addLeadingZero(timerValues.hours);
        daysEl.textContent = addLeadingZero(timerValues.days);

        if (chosenDate - Date.parse(new Date()) === 0) {
          clearInterval(timerId);
        }
      }, 1000);
    });
  },
};

const flatPickerEl = flatpickr('#datetime-picker', options);
