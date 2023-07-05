import { searchInput, synNode } from '../variable.js';
import { handleSubmit } from '../handleSubmit.js';
// import { updateCurWord, searchNode } from '../utils/util.js';

async function synClick(word, syn) {
  // updateCurWord(syn);
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
  // synAr = synAr.filter((syn) => {
  //   const ifExists = searchNode(synNode, syn);
  //   if (ifExists) return false;
  //   return syn;
  // });
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
