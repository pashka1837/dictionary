import { genIntroHtml } from './genIntro.js';

function handlePlayAudio(audioSrc) {
  const audio = new Audio(audioSrc);
  audio.play();
}

function findEl(obj, audio = false) {
  if (!audio) {
    if (obj.text && obj.text !== ``) return obj;
    return false;
  }
  if (obj.audio && obj.audio !== ``) return obj;
  return false;
}

function getTranscript(phonetic, phonetics, word) {
  const searchedWord = word;
  let transcriptWord;
  if (!phonetic && phonetics.length > 0) {
    const phoneticTransObj = phonetics.find(findEl);
    phoneticTransObj
      ? (transcriptWord = phoneticTransObj.text)
      : (transcriptWord = word);
  } else transcriptWord = phonetic || word;
  return { searchedWord, transcriptWord };
}

function getAudio(phonetics) {
  const phoneticAudioObj = phonetics.find((obj) => findEl(obj, true));

  if (!phoneticAudioObj) return false;
  const audioSrc = phoneticAudioObj.audio;
  const playBtn = document.createElement(`img`);

  playBtn.classList.add(`playTranscript`);
  playBtn.src = `./assets/images/icon-play.svg`;
  playBtn.alt = `playTranscript`;

  playBtn.addEventListener(`pointerdown`, () => handlePlayAudio(audioSrc));
  return playBtn;
}

function genPhoniticAudioHtml(phonetic, phonetics, word) {
  const { searchedWord, transcriptWord } = getTranscript(
    phonetic,
    phonetics,
    word
  );
  const phoneticAndAudioDiv = genIntroHtml(searchedWord, transcriptWord);

  const playBtn = getAudio(phonetics);
  playBtn && phoneticAndAudioDiv.append(playBtn);
  return phoneticAndAudioDiv;
}

export { genPhoniticAudioHtml };
