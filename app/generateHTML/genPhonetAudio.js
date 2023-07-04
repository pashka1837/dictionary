import {
  phoneticAndAudioDiv,
  searchedWord,
  transcriptWord,
} from '../variable.js';

function handlePlayAudio(audioSrc) {
  const audio = new Audio(audioSrc);
  audio.play();
}

function findEl(obj, audio = false) {
  if (!audio) {
    if (obj.text && obj.text !== ``) return obj;
  }
  if (obj.audio && obj.audio !== ``) return obj;
}

function getTranscript(phonetic, phonetics, word) {
  searchedWord.textContent = word;
  if (!phonetic && phonetics.length > 0) {
    const phoneticTransObj = phonetics.find(findEl);
    phoneticTransObj
      ? (transcriptWord.textContent = phoneticTransObj.text)
      : (transcriptWord.textContent = word);
  } else transcriptWord.textContent = phonetic || word;
}

function getAudio(phonetics) {
  const phoneticAudioObj = phonetics.find((obj) => findEl(obj, true));

  if (!phoneticAudioObj) return false;
  const audioSrc = phoneticAudioObj.audio;
  const playBtn = document.createElement(`img`);

  playBtn.classList.add(`playTranscript`);
  playBtn.src = `../assets/images/icon-play.svg`;
  playBtn.alt = `playTranscript`;

  playBtn.addEventListener(`pointerdown`, () => handlePlayAudio(audioSrc));
  return playBtn;
}

function genPhoniticAudioHtml(phonetic, phonetics, word) {
  getTranscript(phonetic, phonetics, word);
  const playBtn = getAudio(phonetics);
  playBtn && phoneticAndAudioDiv.append(playBtn);
  phoneticAndAudioDiv.classList.remove(`off`);
}

export { genPhoniticAudioHtml };
