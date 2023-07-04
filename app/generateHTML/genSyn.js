import { searchInput, words } from '../variable.js';
import { handleSubmit } from '../handleSubmit.js';
import { updateCurWord } from '../utils/util.js';

async function synClick(word, syn) {
  updateCurWord(word);
  searchInput.value = syn;
  await handleSubmit();
}

function createSynLi(syn, div, word) {
  const a = document.createElement(`a`);
  a.dataset.syn = syn;
  a.textContent = `${syn}/ `;
  a.addEventListener(`pointerdown`, async () => await synClick(word, syn), {
    once: true,
  });
  div.append(a);
}

function generateSynonyms(synonyms, word) {
  if (!synonyms || synonyms.length === 0) return false;
  let synAr = synonyms;
  if (synAr.length > 4) synAr = synAr.slice(0, 4);
  synAr = synAr.filter((syn) => {
    const ifExists = words.find((el) => el === syn);
    if (!ifExists) return syn;
    return false;
  });
  if (synAr.length === 0) return false;

  const containerSynEl = document.createElement(`div`);
  const pShallowTextSynonEl = document.createElement(`p`);
  const synonymsResultDiv = document.createElement(`div`);

  containerSynEl.classList.add(`synonyms`);
  pShallowTextSynonEl.classList.add(`shallowText`);
  synonymsResultDiv.classList.add(`synonymsResult`);

  pShallowTextSynonEl.textContent = `Synonyms`;

  synAr.forEach((syn) => createSynLi(syn, synonymsResultDiv, word));

  containerSynEl.append(pShallowTextSynonEl, synonymsResultDiv);

  return containerSynEl;
}

export { generateSynonyms };
