import { searchInput, navEL } from '../variable.js';

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
  // document.body.focus();
  navEL.focus();
}

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export { trimAndFilterInput, focusOnBody, wait };
