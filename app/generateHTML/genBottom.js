export function genBottomSourceHtml(sourceUrls) {
  const bottomDiv = document.createElement(`div`);
  const hrEl = document.createElement(`hr`);
  const sourceElP = document.createElement(`p`);
  const sourceAnchorEl = document.createElement(`a`);
  const iEl = `<i class="fa-solid fa-arrow-up-right-from-square fa-2xs"></i>`;

  bottomDiv.classList.add('bottom');

  sourceElP.textContent = `Source`;
  sourceAnchorEl.textContent = ` `;

  sourceAnchorEl.insertAdjacentHTML('beforeend', iEl);
  bottomDiv.append(hrEl, sourceElP, sourceAnchorEl);

  sourceAnchorEl.childNodes[0].textContent =
    sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  sourceAnchorEl.href = sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  return bottomDiv;
}
