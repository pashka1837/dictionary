import { genIntroHtml } from './genIntro.js';
import { wait } from '../utils/util.js';

async function handlePlayAudio(audioSrc, playBtn) {
  playBtn.src = `./assets/images/icon-play-hover.svg`;
  await wait(200);
  const audio = new Audio(audioSrc);
  audio.play();
  playBtn.src = `./assets/images/icon-play.svg`;
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

  playBtn.addEventListener(
    `pointerdown`,
    async () => await handlePlayAudio(audioSrc, playBtn)
  );
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
