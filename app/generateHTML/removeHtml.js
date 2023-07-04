import { phoneticAndAudioDiv, bottomDiv, notFoundDiv } from '../variable.js';

export function removeHtmlEl() {
  const meaningAll = document.querySelectorAll(`.meaning`);
  const playBtn = document.querySelector(`.playTranscript`);
  const elToRemove = [notFoundDiv, phoneticAndAudioDiv, bottomDiv];
  if (playBtn) playBtn.remove();
  meaningAll && meaningAll.forEach((meaning) => meaning.remove());
  elToRemove.forEach((el) => el.classList.add(`off`));
}
