import { trimAndFilterInput } from '../utils/util.js';
import {
  searchInput,
  searchForm,
  regexForInputVal,
  cancelSearchBtn,
  searchBtn,
} from '../variable.js';
import { handleInputError } from './handleErrors.js';

async function handleCancelSearch(e) {
  e.preventDefault();
  e.stopPropagation();
  searchInput.removeEventListener(`input`, handleInput);
  searchInput.value = ``;
  handleInputFocus();
}

function handleInputFocus() {
  searchBtn.classList.add(`off`);
  handleInput();
  searchInput.addEventListener(`input`, handleInput);
}

function handleInputBlur() {
  if (searchForm.nextElementSibling.classList.contains(`errorInput`))
    searchForm.nextElementSibling.remove();
  searchForm.style = `border: 2px solid var(--form-BG-color);`;
  searchBtn.classList.remove(`off`);
  cancelSearchBtn.classList.add(`off`);
  searchInput.removeEventListener(`input`, handleInput);
}

function handleInput() {
  if (searchForm.nextElementSibling.classList.contains(`errorInput`)) {
    searchForm.nextElementSibling.remove();
  }
  searchForm.style = `border: 2px solid #A445ED;`;
  cancelSearchBtn.removeEventListener(`pointerdown`, handleCancelSearch);
  const str = trimAndFilterInput(searchInput.value);
  if (!str || str.length === 0) {
    searchInput.value = ``;
    cancelSearchBtn.classList.add(`off`);
  } else {
    cancelSearchBtn.classList.remove(`off`, `red`);
    cancelSearchBtn.addEventListener(`pointerdown`, handleCancelSearch, {
      once: true,
    });
    if (str.match(regexForInputVal)) {
      handleInputError(1);
    }
  }
}

function validateInput(input) {
  const str = trimAndFilterInput(input);
  if (str.match(regexForInputVal)) {
    handleInputError(1);
    searchInput.focus();
    return false;
  }
  if (!str || str.length === 0) {
    handleInputError(0);
    searchInput.focus();
    return false;
  }
  return str;
}

export { handleInputBlur, handleInputFocus, validateInput };
