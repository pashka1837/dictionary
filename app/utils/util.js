import { searchInput } from '../variable.js';

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

export { trimAndFilterInput, focusOnBody };
