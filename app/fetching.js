import { addTouchEventsListeners } from './touchIF.js';
import { baseUrl, header } from './variable.js';
import { handleFetchError, handleNotFound } from './errorHandlers.js';
import { updateCurWord } from './utils/util.js';

async function fetchWord(word) {
  const response = await fetch(`${baseUrl}/${word}`, { headers: header }).catch(
    () => {
      handleFetchError();
      throw Error(`Something went wrong. `);
    }
  );
  let result;
  if (response.status === 400) {
    handleFetchError();
    throw Error(`Something went wrong. `);
  }
  if (response.status === 404) {
    updateCurWord(`error404`);
    result = await response.json();
    handleNotFound(result);
    await addTouchEventsListeners();
    throw Error(`Definition not found!`);
  }
  result = await response.json();
  console.log(result);
  return result[0];
}

export { fetchWord };
