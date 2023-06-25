import {
  searchInput,
  searchForm,
  regexForInputVal,
  cancelSearchBtn,
  searchBtn,
} from './variable.js';

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

function handleInputBlur(e) {
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
  const str = searchInput.value
    .trim()
    .toLowerCase()
    .split(` `)
    .filter((word) => word !== ``);
  if (!str || str.length === 0) {
    searchInput.value = ``;
    cancelSearchBtn.classList.add(`off`);
  } else {
    cancelSearchBtn.classList.remove(`off`, `red`);
    cancelSearchBtn.addEventListener(`pointerdown`, handleCancelSearch, {
      once: true,
    });
    if (str.join(``).match(regexForInputVal)) {
      handleInputError(1);
    }
  }
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

export { handleInputBlur, handleInputFocus, handleInputError };
