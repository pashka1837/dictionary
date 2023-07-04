import { genIntroHtml } from './generateHTML/genIntro.js';
import {
  searchInput,
  switchThemeBtn,
  searchForm,
  fontSelectBtn,
} from './variable.js';

import { focusOnBody } from './utils/util.js';
import { handleInputBlur, handleInputFocus } from './inputHandlers.js';

import {
  handleSwitchTheme,
  handleChooseFont,
  preloadTheme,
} from './styleChangers.js';

import { handleSubmit } from './handleSubmit.js';

const phoneticAndAudioDiv = genIntroHtml();
searchForm.insertAdjacentElement('afterend', phoneticAndAudioDiv);

window.addEventListener(`load`, async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js', { type: 'module' });
      console.log('serviceWorker succed');
    } catch (e) {
      console.log('serviceWorker failed');
    }
  }
});

window.onload = preloadTheme();
document.body.addEventListener(`pointerdown`, focusOnBody);
switchThemeBtn.addEventListener(`change`, handleSwitchTheme);
searchInput.addEventListener(`blur`, handleInputBlur);
searchInput.addEventListener(`focus`, handleInputFocus);
searchForm.addEventListener(`submit`, handleSubmit);
fontSelectBtn.addEventListener(`pointerdown`, handleChooseFont);
