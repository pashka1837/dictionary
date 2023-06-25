import { resultDiv, bottomDiv } from './variable.js';

function handleMeaningHtml(definitions, partOfSpeech, synonyms) {
  const partOfSpeechMod = partOfSpeech
    .trim()
    .toLowerCase()
    .split(` `)
    .filter((word) => word !== ``);
  const containerEl = document.createElement(`div`);
  const deviderEl = document.createElement(`div`);
  const pPartOfSpeechEl = document.createElement(`p`);
  const hrEl = document.createElement(`hr`);
  const pShallowTextEl = document.createElement(`p`);
  const ulEl = document.createElement(`ul`);
  containerEl.classList.add(`container`, `${partOfSpeechMod.join(`_`)}`);
  deviderEl.classList.add(`divider`);
  pPartOfSpeechEl.classList.add(`partOfSpeech`);
  pPartOfSpeechEl.textContent = `${partOfSpeechMod.join(` `)}`;
  pShallowTextEl.classList.add(`shallowText`);
  pShallowTextEl.textContent = `Meaning`;
  deviderEl.append(pPartOfSpeechEl, hrEl);
  containerEl.append(deviderEl, pShallowTextEl, ulEl);

  if (definitions.length > 3) {
    for (let i = 0; i < 3; i++) {
      const liEl = document.createElement(`li`);
      liEl.textContent = definitions[i].definition;
      ulEl.append(liEl);
    }
  } else {
    definitions.forEach((def) => {
      const liEl = document.createElement(`li`);
      liEl.textContent = def.definition;
      ulEl.append(liEl);
    });
  }

  if (synonyms && synonyms.length > 0) {
    const containerSynEl = document.createElement(`div`);
    const pShallowTextSynonEl = document.createElement(`p`);
    const synonymsResultDiv = document.createElement(`div`);
    containerSynEl.classList.add(`container`, `synonyms`);
    pShallowTextSynonEl.classList.add(`shallowText`);
    pShallowTextSynonEl.textContent = `Synonyms`;
    synonymsResultDiv.classList.add(`synonymsResult`);
    containerSynEl.append(pShallowTextSynonEl, synonymsResultDiv);
    if (synonyms.length > 3) {
      for (let i = 0; i < 3; i++) {
        const a = document.createElement(`a`);
        a.dataset.syn = synonyms[i];
        a.textContent = `${synonyms[i]} / `;
        synonymsResultDiv.append(a);
      }
    } else {
      synonyms.forEach((syn) => {
        const a = document.createElement(`a`);
        a.dataset.syn = syn;
        a.textContent = `${syn}/ `;
        synonymsResultDiv.append(a);
      });
    }
    containerEl.append(containerSynEl);
  }
  return containerEl;
}

async function handlePlayAudio(e, audioSrc) {
  if (!audioSrc) return;
  const audio = await new Audio(audioSrc);
  audio.play();
}

function handleResultHtml(phonetic, phonetics, word) {
  const wordDiv = document.querySelector(`.word`);
  const searchedWord = wordDiv.querySelector(`h2`);
  const transcriptWord = wordDiv.querySelector(`.transcript`);
  searchedWord.textContent = word;
  if (!phonetic && phonetics.length > 0) {
    const trans = phonetics.find((phon) => {
      if (phon.text && phon.text !== ``) {
        return phon;
      }
    });
    trans
      ? (transcriptWord.textContent = trans.text)
      : (transcriptWord.textContent = word);
  } else transcriptWord.textContent = phonetic || word;
  const audioSrc = phonetics.find((phon) => {
    if (phon.audio && phon.audio !== ``) return phon;
  });
  if (audioSrc) {
    const playBtn = document.createElement(`img`);
    playBtn.classList.add(`playTranscript`);
    playBtn.src = `../assets/images/icon-play.svg`;
    playBtn.alt = `playTranscript`;
    playBtn.addEventListener(`pointerdown`, (e) =>
      handlePlayAudio(e, audioSrc.audio)
    );
    resultDiv.append(playBtn);
  }
  resultDiv.classList.remove(`off`);
}

function handleBottomHtml(sourceUrls) {
  const bottomSourceEl = document.querySelector(`.bottom a`);
  bottomSourceEl.childNodes[0].textContent =
    sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  bottomSourceEl.href = sourceUrls[0] || `https://en.wiktionary.org/wiki/`;
  bottomDiv.classList.remove(`off`);
}

function removeHtmlEl() {
  const containerAll = document.querySelectorAll(`.container`);
  const playBtn = document.querySelector(`.playTranscript`);
  const notFoundDiv = document.querySelector(`.notFound`);
  if (playBtn) playBtn.remove();
  containerAll.forEach((con) => con.remove());
  notFoundDiv.classList.add(`off`);
  bottomDiv.classList.add(`off`);
  resultDiv.classList.add(`off`);
}

export {
  handleMeaningHtml,
  handlePlayAudio,
  handleResultHtml,
  handleBottomHtml,
  removeHtmlEl,
};
