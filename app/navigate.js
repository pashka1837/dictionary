import { handleSubmit } from './app.js';
import { searchInput, words } from './variable.js';

export async function moveBackPage(word) {
  searchInput.value = word;
  words.pop();
  handleSubmit();
}
