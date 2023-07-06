import {
  removeTouchEventsListeners,
  addTouchEventsListeners,
} from '../navigation/touchIF.js';

import { focusOnBody } from '../utils/util.js';
import { updateCurWord } from '../navigation/nodeActions.js';

import { searchInput } from '../variable.js';
import { validateInput } from './handleInputField.js';

import { getLoaderCSS } from '../styleChangers.js';
import { fetchWord } from '../fetching.js';
import { generateAllHtml } from '../generateHTML/genEverything.js';
import { removeHtmlEl } from '../generateHTML/removeHtml.js';

async function handleSubmit(e, isMoveToBackPage = false) {
  if (e) e.preventDefault();
  removeTouchEventsListeners();

  const str = validateInput(searchInput.value);
  if (!str) return;

  searchInput.value = ``;

  focusOnBody();

  getLoaderCSS();

  removeHtmlEl();
  let result;
  if (e) result = await fetchWord(str, true);
  else result = await fetchWord(str);

  if (!isMoveToBackPage) {
    e ? updateCurWord(str, true) : updateCurWord(str);
  }

  generateAllHtml(result);

  await addTouchEventsListeners();
}

export { handleSubmit };
