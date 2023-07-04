import { getLoaderCSS } from '../styleChangers.js';
import { genBottomSourceHtml } from './genBottom.js';
import { genMeaningHtml } from './genMeaning.js';
import { genPhoniticAudioHtml } from './genPhonetAudio.js';
import { searchForm } from '../variable.js';

function generateAllHtml({
  meanings,
  phonetic = null,
  phonetics = null,
  sourceUrls = null,
  word,
}) {
  const mainDiv = document.createElement(`div`);
  const bottomDiv = genBottomSourceHtml(sourceUrls);
  const phoneticAndAudioDiv = genPhoniticAudioHtml(phonetic, phonetics, word);

  mainDiv.classList.add(`main`);

  meanings.forEach((mean) => {
    const { definitions, partOfSpeech, synonyms } = mean;
    const el = genMeaningHtml(definitions, partOfSpeech, synonyms, word);
    mainDiv.append(el);
  });

  mainDiv.prepend(phoneticAndAudioDiv);
  mainDiv.append(bottomDiv);

  getLoaderCSS();

  searchForm.insertAdjacentElement(`afterend`, mainDiv);
}

export { generateAllHtml };
