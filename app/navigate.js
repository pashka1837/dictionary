import { handleSubmit } from './handleSubmit.js';
import { searchInput, searchForm, words } from './variable.js';
import { genIntroHtml } from './generateHTML/genIntro.js';
import { removeHtmlEl } from './generateHTML/removeHtml.js';
import { getLoaderCSS } from './styleChangers.js';
import { removeTouchEventsListeners } from './touchIF.js';
import { wait } from './utils/util.js';

function goHomePage() {
  getLoaderCSS();
  removeHtmlEl();
  const introDiv = genIntroHtml();
  getLoaderCSS();
  searchForm.insertAdjacentElement('afterend', introDiv);
}

async function moveBackPage() {
  console.log(words);
  removeTouchEventsListeners();
  if (words.length === 0) {
    return goHomePage();
  }
  const curWord = localStorage.getItem('curWord');
  const indexOfCur = words.indexOf(curWord);
  if (indexOfCur <= 0) return goHomePage();
  const searchWord = words[indexOfCur - 1];
  if (searchWord === 'error404') {
    words.splice(indexOfCur - 1, 1);
    await moveBackPage();
  }
  console.log(searchWord);
  searchInput.value = searchWord;

  await handleSubmit();
}

async function moveNextPage(word) {
  searchInput.value = word;
  words.pop();
  await handleSubmit();
}

export { moveBackPage, moveNextPage };
