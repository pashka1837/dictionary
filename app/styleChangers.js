import {
  popUpEl,
  chooseFontEl,
  searchForm,
  searchInput,
  fontSelectBtn,
  switchThemeBtn,
} from './variable.js';

function chooseFont(e) {
  e.stopPropagation();
  const fontsEls = Array.from(popUpEl.firstElementChild.children);
  const fontEl = fontsEls.find((el) => el === e.target);

  if (fontEl) {
    document.body.style = `font-family: ${fontEl.dataset.font};`;
    chooseFontEl.textContent = fontEl.textContent;
    searchInput.style = `font-family: ${fontEl.dataset.font};`;
    window.localStorage.setItem(`font`, fontEl.dataset.font);
  } else {
    popUpEl.classList.toggle(`off`);
    window.removeEventListener(`pointerdown`, chooseFont);
    fontSelectBtn.addEventListener(`pointerdown`, handleChooseFont);
  }
}

function handleChooseFont(e) {
  e.stopPropagation();
  fontSelectBtn.removeEventListener(`pointerdown`, handleChooseFont);
  popUpEl.classList.toggle(`off`);
  window.addEventListener(`pointerdown`, chooseFont);
}

function handleSwitchTheme() {
  document.body.classList.toggle(`dark-theme`);

  const moonIcon = document.querySelector(`.moonIcon`);

  if (document.body.classList.contains(`dark-theme`)) {
    switchThemeBtn.checked = true;
    window.localStorage.setItem(`darkTheme`, 1);
    moonIcon.src = './assets/images/icon-moon-dark.svg';
  } else {
    switchThemeBtn.checked = false;
    window.localStorage.setItem(`darkTheme`, 0);
    moonIcon.src = './assets/images/icon-moon.svg';
  }
}

function preloadTheme() {
  if (parseInt(window.localStorage.getItem(`darkTheme`)) === 1)
    handleSwitchTheme();
  const font = window.localStorage.getItem(`font`);
  if (font) {
    const fontsEls = Array.from(popUpEl.firstElementChild.children);
    const fontEl = fontsEls.find((el) => el.dataset.font === font);
    if (fontEl) {
      chooseFontEl.textContent = fontEl.textContent;
      document.body.style = `font-family: ${font};`;
      searchInput.style = `font-family: ${font};`;
    }
  }
}

function getLoaderCSS() {
  const loaderEl = document.querySelector(`.loader`);
  searchForm.classList.toggle(`off`);
  loaderEl.classList.toggle(`off`);
}

export { handleSwitchTheme, handleChooseFont, getLoaderCSS, preloadTheme };
