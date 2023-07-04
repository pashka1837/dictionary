import { genDefenitions } from './genDefenitions.js';
import { generateSynonyms } from './genSyn.js';

function generateHtmlElements(partOfSpeechMod) {
  const meaningDiv = document.createElement(`div`);
  const deviderEl = document.createElement(`div`);
  const pPartOfSpeechEl = document.createElement(`p`);
  const hrEl = document.createElement(`hr`);
  const pShallowTextEl = document.createElement(`p`);

  meaningDiv.classList.add(`meaning`, `${partOfSpeechMod.join(`_`)}`);
  deviderEl.classList.add(`divider`);
  pPartOfSpeechEl.classList.add(`partOfSpeech`);
  pShallowTextEl.classList.add(`shallowText`);

  pPartOfSpeechEl.textContent = `${partOfSpeechMod.join(` `)}`;
  pShallowTextEl.textContent = `Meaning`;

  deviderEl.append(pPartOfSpeechEl, hrEl);
  meaningDiv.append(deviderEl, pShallowTextEl);
  return meaningDiv;
}

function genMeaningHtml(definitions, partOfSpeech, synonyms, word) {
  const partOfSpeechMod = partOfSpeech
    .trim()
    .toLowerCase()
    .split(` `)
    .filter((part) => part !== ``);

  const meaningDiv = generateHtmlElements(partOfSpeechMod);

  const definitionsUlEl = genDefenitions(definitions);
  definitionsUlEl && meaningDiv.append(definitionsUlEl);

  const synDiv = generateSynonyms(synonyms, word);
  synDiv && meaningDiv.append(synDiv);

  return meaningDiv;
}

export { genMeaningHtml };
