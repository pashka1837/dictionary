import { addTouchEventsListeners } from './navigation/touchIF.js';
import { baseUrl, header } from './variable.js';
import { handleFetchError, handleNotFound } from './handlers/handleErrors.js';
import { updateCurWord } from './navigation/nodeActions.js';

function handle400() {
  handleFetchError();
  throw Error(`Something went wrong. `);
}

async function handle404(response) {
  updateCurWord(`error404`);
  const result = await response.json();
  handleNotFound(result);
  await addTouchEventsListeners();
  throw Error(`Definition not found!`);
}

async function fetchWord(word) {
  const response = await fetch(`${baseUrl}/${word}`, { headers: header }).catch(
    () => handle400()
  );

  if (response.status === 400) return handle400();

  if (response.status === 404) return handle404(response);

  const result = await response.json();
  console.log(result);
  return result[0];
}

export { fetchWord };
