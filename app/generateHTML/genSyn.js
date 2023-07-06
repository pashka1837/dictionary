import { searchInput } from '../variable.js';
import { handleSubmit } from '../handlers/handleSubmit.js';

async function synClick(syn) {
  searchInput.value = syn;
  await handleSubmit();
}

function createSynLi(syn, div) {
  const a = document.createElement(`a`);
  a.dataset.syn = syn;
  a.textContent = `${syn}/ `;
  a.addEventListener(`pointerdown`, async () => await synClick(syn), {
    once: true,
  });
  div.append(a);
}

function generateSynonyms(synonyms, word) {
  if (!synonyms || synonyms.length === 0) return false;
  let synAr = synonyms;
  if (synAr.length > 4) synAr = synAr.slice(0, 4);
  if (synAr.length === 0) return false;

  const containerSynEl = document.createElement(`div`);
  const pShallowTextSynonEl = document.createElement(`p`);
  const synonymsResultDiv = document.createElement(`div`);

  containerSynEl.classList.add(`synonyms`);
  pShallowTextSynonEl.classList.add(`shallowText`, `unselectable`);
  synonymsResultDiv.classList.add(`synonymsResult`);

  pShallowTextSynonEl.textContent = `Synonyms`;

  synAr.forEach((syn) => createSynLi(syn, synonymsResultDiv));

  containerSynEl.append(pShallowTextSynonEl, synonymsResultDiv);

  return containerSynEl;
}

export { generateSynonyms };

// synAr = synAr.filter((syn) => {
//   const ifExists = searchNode(synNode, syn);
//   if (ifExists) return false;
//   return syn;
// });
