import { getLoaderCSS } from '../styleChangers.js';
import { genBottomSourceHtml } from './genBottom.js';
import { genMeaningHtml } from './genMeaning.js';
import { genPhoniticAudioHtml } from './genPhonetAudio.js';
import { bottomDiv } from '../variable.js';

function generateAllHtml({
  meanings,
  phonetic = null,
  phonetics = null,
  sourceUrls = null,
  word,
}) {
  getLoaderCSS();
  genBottomSourceHtml(sourceUrls);
  genPhoniticAudioHtml(phonetic, phonetics, word);
  meanings.forEach((mean) => {
    const { definitions, partOfSpeech, synonyms } = mean;
    const el = genMeaningHtml(definitions, partOfSpeech, synonyms, word);
    bottomDiv.insertAdjacentElement(`beforebegin`, el);
  });
}

export { generateAllHtml };
