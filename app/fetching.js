import { addTouchEventsListeners } from './touchIF.js';
import { baseUrl, header } from './variable.js';
import { handleFetchError, handleNotFound } from './errorHandlers.js';

async function fetchWord(word) {
  const response = await fetch(`${baseUrl}/${word}`, { headers: header }).catch(
    () => {
      handleFetchError();
      throw Error(`Something went wrong. `);
    }
  );
  let result;
  if (response.status === 400) {
    console.log(`in 400`, response);
    handleFetchError();
    throw Error(`Something went wrong. `);
  }
  if (response.status === 404) {
    console.log(`in !res`, response);
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
