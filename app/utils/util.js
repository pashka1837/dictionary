import { searchInput, words } from '../variable.js';

function trimAndFilterInput(str) {
  return str
    .trim()
    .toLowerCase()
    .split(` `)
    .filter((word) => word !== ``)
    .join(` `);
}
function focusOnBody() {
  searchInput.blur();
  document.body.focus();
}

function updateCurWord(word) {
  const isExists = words.find((el) => el === word);
  if (!isExists) words.push(word);
  localStorage.setItem('curWord', word);
}

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export { trimAndFilterInput, focusOnBody, wait, updateCurWord };
