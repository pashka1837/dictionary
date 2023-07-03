import { resultDiv } from '../variable.js';

function handlePlayAudio(e, audioSrc) {
  if (!audioSrc) return;
  const audio = new Audio(audioSrc);
  audio.play();
}

function findEl(el) {
  if (el.text && el.text !== ``) {
    return el;
  }
}

export function handleResultHtml(phonetic, phonetics, word) {
  const wordDiv = document.querySelector(`.word`);
  const searchedWord = wordDiv.querySelector(`h2`);
  const transcriptWord = wordDiv.querySelector(`.transcript`);
  searchedWord.textContent = word;
  if (!phonetic && phonetics.length > 0) {
    const trans = phonetics.find(findEl);
    trans
      ? (transcriptWord.textContent = trans.text)
      : (transcriptWord.textContent = word);
  } else transcriptWord.textContent = phonetic || word;
  // const audioSrc = phonetics.find((phon) => {
  //   if (phon.audio && phon.audio !== ``) return phon;
  // });
  const audioSrc = phonetics.find(findEl);
  if (audioSrc) {
    const playBtn = document.createElement(`img`);
    playBtn.classList.add(`playTranscript`);
    playBtn.src = `assets/images/icon-play.svg`;
    playBtn.alt = `playTranscript`;
    playBtn.addEventListener(`pointerdown`, (e) =>
      handlePlayAudio(e, audioSrc.audio)
    );
    resultDiv.append(playBtn);
  }
  resultDiv.classList.remove(`off`);
}
