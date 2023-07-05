import { handleSubmit } from './handleSubmit.js';
import { searchInput, searchForm, synNode } from './variable.js';
import { genIntroHtml } from './generateHTML/genIntro.js';
import { removeHtmlEl } from './generateHTML/removeHtml.js';
import { getLoaderCSS } from './styleChangers.js';
import { removeTouchEventsListeners } from './touchIF.js';
import { wait, searchParentNode } from './utils/util.js';

async function goHomePage() {
  getLoaderCSS();
  await wait(400);
  removeHtmlEl();
  const introDiv = genIntroHtml();
  getLoaderCSS();
  searchForm.insertAdjacentElement('afterend', introDiv);
}

async function moveBackPage() {
  removeTouchEventsListeners();

  const curWord = localStorage.getItem('curWord');
  let parentNode;

  [synNode].find((x) => (parentNode = searchParentNode(x, curWord)));

  if (!parentNode || parentNode.length <= 1) return await goHomePage();

  getLoaderCSS();
  removeHtmlEl();
  await wait(400);

  const searchWord = parentNode[parentNode.length - 2];

  if (searchWord.includes('error404')) {
    localStorage.setItem('curWord', searchWord);
    getLoaderCSS();
    return await moveBackPage();
  }

  localStorage.setItem('curWord', searchWord);

  searchInput.value = searchWord;

  getLoaderCSS();
  await handleSubmit();
}

async function moveNextPage(word) {
  searchInput.value = word;
  words.pop();
  await handleSubmit();
}

export { moveBackPage, moveNextPage };

/* console.log(words);
  removeTouchEventsListeners();

  const curWord = localStorage.getItem('curWord');
  const indexOfCur = words.indexOf(curWord);
  const searchWord = words[indexOfCur - 1];
  words.pop();

  if (indexOfCur <= 0) return await goHomePage();

  getLoaderCSS();
  await wait(400);

  if (searchWord === 'error404') {
    words.splice(indexOfCur - 1, 1);
    console.log(`404`, words);
    getLoaderCSS();
    return await moveBackPage();
  }

  getLoaderCSS();
  console.log(searchWord);
  searchInput.value = searchWord;

  // getLoaderCSS();

  await handleSubmit(); */
