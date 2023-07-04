import { handleSubmit } from './handleSubmit.js';
import { searchInput, words } from './variable.js';

export async function moveBackPage(word) {
  searchInput.value = word;
  words.pop();
  await handleSubmit();
}
