function createDefLi(def, ul) {
  const liEl = document.createElement(`li`);
  liEl.textContent = def.definition;
  ul.append(liEl);
}

function createSynLi(syn, div) {
  const a = document.createElement(`a`);
  a.dataset.syn = syn;
  a.textContent = `${syn}/ `;
  div.append(a);
}

function generateMeaning(definitions) {
  if (!definitions || definitions.length === 0) return false;

  const ulEl = document.createElement(`ul`);

  if (definitions.length > 4) {
    const defAr = definitions.slice(0, 3);
    defAr.forEach((def) => createDefLi(def, ulEl));
  } else {
    definitions.forEach((def) => createDefLi(def, ulEl));
  }
  return ulEl;
}

function generateSynonyms(synonyms) {
  if (!synonyms || synonyms.length === 0) return false;

  const containerSynEl = document.createElement(`div`);
  const pShallowTextSynonEl = document.createElement(`p`);
  const synonymsResultDiv = document.createElement(`div`);

  containerSynEl.classList.add(`container`, `synonyms`);
  pShallowTextSynonEl.classList.add(`shallowText`);
  synonymsResultDiv.classList.add(`synonymsResult`);

  pShallowTextSynonEl.textContent = `Synonyms`;

  if (synonyms.length > 4) {
    const synAr = synonyms.slice(0, 3);
    synAr.forEach((syn) => createSynLi(syn, synonymsResultDiv));
  } else {
    synonyms.forEach((syn) => createSynLi(syn, synonymsResultDiv));
  }

  containerSynEl.append(pShallowTextSynonEl, synonymsResultDiv);

  return containerSynEl;
}

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

  containerEl.classList.add(`container`, `${partOfSpeechMod.join(`_`)}`);
  deviderEl.classList.add(`divider`);
  pPartOfSpeechEl.classList.add(`partOfSpeech`);
  pShallowTextEl.classList.add(`shallowText`);

  pPartOfSpeechEl.textContent = `${partOfSpeechMod.join(` `)}`;
  pShallowTextEl.textContent = `Meaning`;

  deviderEl.append(pPartOfSpeechEl, hrEl);
  containerEl.append(deviderEl, pShallowTextEl);

  const ulEl = generateMeaning(definitions);
  ulEl && containerEl.append(ulEl);

  const containerSynEl = generateSynonyms(synonyms);
  containerSynEl && containerEl.append(containerSynEl);

  return containerEl;
}

export { handleMeaningHtml };
// definitions.forEach((def) => {
//   const liEl = document.createElement(`li`);
//   liEl.textContent = def.definition;
//   ulEl.append(liEl);
// });

// for (let i = 0; i < 3; i++) {
//   const a = document.createElement(`a`);
//   a.dataset.syn = synonyms[i];
//   a.textContent = `${synonyms[i]} / `;
//   synonymsResultDiv.append(a);
// }
