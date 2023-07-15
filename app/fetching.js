import { addTouchEventsListeners } from './navigation/touchIF.js';
import { baseUrl, header } from './variable.js';
import { handleFetchError, handleNotFound } from './handlers/handleErrors.js';
import { updateCurWord } from './navigation/nodeActions.js';

function handle400() {
  handleFetchError();
  throw Error(`Something went wrong. `);
}

async function handle404(response, isNew) {
  updateCurWord(`error404`, isNew);
  const result = await response.json();
  handleNotFound(result);
  await addTouchEventsListeners();
  throw Error(`Definition not found!`);
}

async function fetchWord(word, isNew = false) {
  const response = await fetch(`${baseUrl}/${word}`, { headers: header }).catch(
    () => handle400()
  );

  if (response.status === 400) return handle400();

  if (response.status === 404) return handle404(response, isNew);

  const result = await response.json();
  // console.log(result);
  return result[0];
}

export { fetchWord };
