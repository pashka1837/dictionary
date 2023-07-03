import { resultDiv, bottomDiv } from './variable.js';

export function removeHtmlEl() {
  const containerAll = document.querySelectorAll(`.container`);
  const playBtn = document.querySelector(`.playTranscript`);
  const notFoundDiv = document.querySelector(`.notFound`);
  const elToRemove = [notFoundDiv, resultDiv, bottomDiv];
  if (playBtn) playBtn.remove();
  containerAll.forEach((con) => con.remove());
  elToRemove.forEach((el) => el.classList.add(`off`));
  //   notFoundDiv.classList.add(`off`);
  //   bottomDiv.classList.add(`off`);
  //   resultDiv.classList.add(`off`);
}
