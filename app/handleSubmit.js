import {
  removeTouchEventsListeners,
  addTouchEventsListeners,
} from './touchIF.js';
import { trimAndFilterInput, focusOnBody } from './utils/util.js';
import { handleInputError } from './errorHandlers.js';
import { searchInput, regexForInputVal, words } from './variable.js';

import { getLoaderCSS } from './styleChangers.js';
import { fetchWord } from './fetching.js';
import { generateAllHtml } from './generateHTML/genEverything.js';
import { removeHtmlEl } from './generateHTML/removeHtml.js';

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

async function handleSubmit(e) {
  if (e) e.preventDefault();
  removeTouchEventsListeners();
  const str = validateInput(searchInput.value);

  if (!str) return;

  if (e)
    while (words.length > 0) {
      words.pop();
    }

  searchInput.value = ``;

  focusOnBody();

  getLoaderCSS();

  removeHtmlEl();

  const result = await fetchWord(str);

  generateAllHtml(result);

  await addTouchEventsListeners();
}

export { handleSubmit };
