const touchArea = document.body;

const navEL = document.querySelector(`nav`);

const popUpEl = document.querySelector(`.fontSelPopUp`);

const fontSelectBtn = document.querySelector(`.fontSelect`);
const switchThemeBtn = document.querySelector(`.switch input`);

const cancelSearchBtn = document.querySelector(`.cancelSearchBtn`);
const searchBtn = document.querySelector(`.searchBtn`);
const searchInput = document.querySelector(`.search input `);
const searchForm = document.querySelector(`.search`);

const synNode = {};

const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const header = new Headers({
  Accept: 'application/json',
});

const regexForInputVal =
  /\`|\-|\_|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|[0-9]/g;

export {
  touchArea,
  navEL,
  searchInput,
  searchForm,
  fontSelectBtn,
  switchThemeBtn,
  baseUrl,
  header,
  regexForInputVal,
  popUpEl,
  cancelSearchBtn,
  searchBtn,
  synNode,
};
