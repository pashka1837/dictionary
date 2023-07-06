export function genBottomSourceHtml(sourceUrls) {
  const bottomDiv = document.createElement(`div`);
  const hrEl = document.createElement(`hr`);
  const sourceElP = document.createElement(`p`);
  const sourceAnchorEl = document.createElement(`a`);
  const iEl = document.createElement(`i`);

  bottomDiv.classList.add('bottom');
  sourceElP.classList.add('unselectable');
  iEl.classList.add('fa-solid', 'fa-arrow-up-right-from-square', 'fa-2xs');

  sourceElP.textContent = `Source`;
  sourceAnchorEl.textContent = ` `;

  sourceAnchorEl.append(iEl);
  bottomDiv.append(hrEl, sourceElP, sourceAnchorEl);

  sourceAnchorEl.childNodes[0].textContent =
    sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  sourceAnchorEl.href = sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  return bottomDiv;
}
