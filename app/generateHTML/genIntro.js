export function genIntroHtml(word = false, transcript = false) {
  const introDiv = document.createElement(`div`);
  const innerDiv = document.createElement(`div`);
  const searchedWord = document.createElement(`h2`);
  const transcriptWord = document.createElement(`p`);

  introDiv.classList.add(`phoneticAndAudio`);
  innerDiv.classList.add(`phonetic`);
  transcriptWord.classList.add(`transcript`);

  searchedWord.textContent = word || 'This is a Dictionary.';
  transcriptWord.textContent = transcript || 'You can search for any word.';

  innerDiv.append(searchedWord, transcriptWord);
  introDiv.append(innerDiv);
  return introDiv;
}
