import { getLoaderCSS } from '../styleChangers.js';
import { searchForm, cancelSearchBtn } from '../variable.js';
import { genErrorHtml } from '../generateHTML/genErrorPage.js';
import { removeHtmlEl } from '../generateHTML/removeHtml.js';

function handleFetchError() {
  const smile = `&#128531;`;
  const result = {
    title: `Upps...`,
    message: `Failed to fetch.`,
    resolution: `Please, reload this page or check with your internet provider!`,
  };
  handleNotFound(result, smile, true);
}

function handleNotFound(result, smile = undefined, fetch = false) {
  const errorDiv = genErrorHtml(result, smile);
  removeHtmlEl();
  getLoaderCSS();
  if (!fetch) {
    searchForm.insertAdjacentElement('afterend', errorDiv);
    return;
  }
  errorDiv.style = `margin: calc(var(--height-of-navBar)*2) 6.1vw 0px 6.1vw;`;
  searchForm.insertAdjacentElement('afterend', errorDiv);
  searchForm.remove();
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
