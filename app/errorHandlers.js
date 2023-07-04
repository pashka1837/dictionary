import { getLoaderCSS } from './styleChangers.js';
import { searchForm, cancelSearchBtn, notFoundDiv } from './variable.js';

function handleFetchError() {
  const smile = `&#128531;`;
  const result = {
    title: `Upps...`,
    message: `Failed to fetch.`,
    resolution: `Please, reload this page or check with your internet provider!`,
  };
  handleNotFound(result, smile);
}

function handleNotFound(result, smile = undefined) {
  const smileEl = document.querySelector(`.smile`);
  const titleEl = notFoundDiv.querySelector(`h2`);
  const messageEl = notFoundDiv.querySelector(`.message`);

  getLoaderCSS();

  smileEl.innerHTML = smile ?? `&#128533;`;
  titleEl.textContent = result.title;
  messageEl.textContent = `${result.message} ${result.resolution}`;

  notFoundDiv.classList.remove(`off`);
}

function handleInputError(error) {
  searchForm.style = `border: 2px solid #FF5252;`;
  cancelSearchBtn.classList.add(`red`);
  if (!searchForm.nextElementSibling.classList.contains(`errorInput`)) {
    const errorEl = document.createElement(`p`);
    errorEl.classList.add(`errorInput`);
    searchForm.insertAdjacentElement(`afterend`, errorEl);
  }
  if (error === 1) {
    searchForm.nextElementSibling.textContent = `Uuuh, can’t use characters...`;
  }
  if (error === 0) {
    searchForm.nextElementSibling.textContent = `Whoops, can’t be empty...`;
  }
}

export { handleFetchError, handleNotFound, handleInputError };
