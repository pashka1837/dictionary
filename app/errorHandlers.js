import { getLoaderCSS } from './popUps.js';

const notFoundDiv = document.querySelector(`.notFound`);
const smileEl = document.querySelector(`.smile`);
const titleEl = notFoundDiv.querySelector(`h2`);
const messageEl = notFoundDiv.querySelector(`.message`);

function handleFetchError(e) {
  const smile = `&#128531;`;
  const result = {
    title: `Upps...`,
    message: `${e}.`,
    resolution: `Please, reload this page or check with your internet provider!`,
  };
  handleNotFound(result, smile);
}

function handleNotFound(result, smile = undefined) {
  getLoaderCSS();
  smileEl.innerHTML = smile ?? `&#128533;`;
  titleEl.textContent = result.title;
  messageEl.textContent = `${result.message} ${result.resolution}`;
  notFoundDiv.classList.remove(`off`);
}

export { handleFetchError, handleNotFound };
