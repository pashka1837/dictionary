const touchArea = document.body;
const searchInput = document.querySelector(`.search input `);
const searchForm = document.querySelector(`.search`);
const resultDiv = document.querySelector(`.result`);
const bottomDiv = document.querySelector(`.bottom`);
const fontSelectBtn = document.querySelector(`.fontSelect`);

const popUpEl = document.querySelector(`.fontSelPopUp`);
const cancelSearchBtn = document.querySelector(`.cancelSearchBtn`);
const searchBtn = document.querySelector(`.searchBtn`);

const switchThemeBtn = document.querySelector(`.switch input`);

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
  resultDiv,
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
};
