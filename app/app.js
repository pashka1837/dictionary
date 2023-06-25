import {
  searchInput,
  bottomDiv,
  baseUrl,
  header,
  switchThemeBtn,
  searchForm,
  fontSelectBtn,
  regexForInputVal,
  words,
} from './variable.js';

import {
  handleInputBlur,
  handleInputFocus,
  handleInputError,
} from './inputHandlers.js';

import {
  handleSwitchTheme,
  handleChooseFont,
  getLoaderCSS,
  preloadTheme,
} from './popUps.js';

import {
  handleMeaningHtml,
  handleResultHtml,
  handleBottomHtml,
  removeHtmlEl,
} from './generateHTML.js';

import { handleFetchError, handleNotFound } from './errorHandlers.js';

import {
  addTouchEventsListeners,
  removeTouchEventsListeners,
} from './touchIF.js';

function focusOnBody() {
  searchInput.blur();
  document.body.focus();
}

function handleData({
  meanings,
  phonetic = null,
  phonetics = null,
  sourceUrls = null,
  word,
}) {
  searchInput.value = ``;
  getLoaderCSS();
  handleBottomHtml(sourceUrls);
  handleResultHtml(phonetic, phonetics, word);
  meanings.forEach((mean) => {
    const { definitions, partOfSpeech, synonyms } = mean;
    const el = handleMeaningHtml(definitions, partOfSpeech, synonyms);
    bottomDiv.insertAdjacentElement(`beforebegin`, el);
  });
  const synonymsEl = document.querySelectorAll(`.synonymsResult a`);
  synonymsEl.forEach(
    (el) =>
      (el.onclick = function () {
        searchInput.value = el.dataset.syn;
        words.push(word);
        handleSubmit();
      })
  );
}

async function fetchWord(word) {
  const response = await fetch(`${baseUrl}/${word}`, { headers: header }).catch(
    (error) => {
      handleFetchError(error);
      throw new Error(`Something went wrong. `, error);
    }
  );
  let result;
  if (!response.ok) {
    result = await response.json();
    handleNotFound(result);
    await addTouchEventsListeners();
    throw new Error(`Definition not found!`);
  }
  result = await response.json();
  console.log(result);
  return result[0];
}

export async function handleSubmit(e) {
  if (e) e.preventDefault();
  let str = searchInput.value;
  if (str.match(regexForInputVal)) {
    handleInputError(1);
    searchInput.focus();
    return;
  }
  str = str
    .trim()
    .toLowerCase()
    .split(` `)
    .filter((word) => word !== ``);
  if (!str || str.length === 0) {
    handleInputError(0);
    searchInput.focus();
    return;
  }
  removeTouchEventsListeners();
  if (e)
    while (words.length > 0) {
      words.pop();
    }
  str = str.join(` `);
  focusOnBody();
  getLoaderCSS();
  removeHtmlEl();
  handleData(await fetchWord(str));
  await addTouchEventsListeners();
}

window.onload = preloadTheme();
document.body.addEventListener(`pointerdown`, focusOnBody);
switchThemeBtn.addEventListener(`change`, handleSwitchTheme);
searchInput.addEventListener(`blur`, handleInputBlur);
searchInput.addEventListener(`focus`, handleInputFocus);
searchForm.addEventListener(`submit`, handleSubmit);
fontSelectBtn.addEventListener(`pointerdown`, handleChooseFont);
