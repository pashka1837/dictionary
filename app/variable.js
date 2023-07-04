const touchArea = document.body;

const popUpEl = document.querySelector(`.fontSelPopUp`);

const phoneticAndAudioDiv = document.querySelector(`.phoneticAndAudio`);
const searchedWord = document.querySelector(`.phonetic h2`);
const transcriptWord = document.querySelector(`.transcript`);

const fontSelectBtn = document.querySelector(`.fontSelect`);
const switchThemeBtn = document.querySelector(`.switch input`);

const cancelSearchBtn = document.querySelector(`.cancelSearchBtn`);
const searchBtn = document.querySelector(`.searchBtn`);
const searchInput = document.querySelector(`.search input `);
const searchForm = document.querySelector(`.search`);

const bottomDiv = document.querySelector(`.bottom`);

const notFoundDiv = document.querySelector(`.notFound`);

const words = [];

const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const header = new Headers({
  Accept: 'application/json',
});

const regexForInputVal =
  /\`|\-|\_|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|[0-9]/g;

export {
  touchArea,
  searchInput,
  searchForm,
  phoneticAndAudioDiv,
  searchedWord,
  transcriptWord,
  bottomDiv,
  fontSelectBtn,
  switchThemeBtn,
  baseUrl,
  header,
  regexForInputVal,
  popUpEl,
  cancelSearchBtn,
  searchBtn,
  words,
  notFoundDiv,
};
