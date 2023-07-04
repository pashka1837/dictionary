import { bottomDiv } from '../variable.js';

export function genBottomSourceHtml(sourceUrls) {
  const bottomSourceEl = document.querySelector(`.bottom a`);
  bottomSourceEl.childNodes[0].textContent =
    sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  bottomSourceEl.href = sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  bottomDiv.classList.remove(`off`);
}
