import { genIntroHtml } from './generateHTML/genIntro.js';
import {
  searchInput,
  switchThemeBtn,
  searchForm,
  fontSelectBtn,
  touchArea,
} from './variable.js';

import { focusOnBody } from './utils/util.js';
import {
  handleInputBlur,
  handleInputFocus,
} from './handlers/handleInputField.js';

import {
  handleSwitchTheme,
  handleChooseFont,
  preloadTheme,
  locationOfPopUp,
} from './styleChangers.js';

import { handleSubmit } from './handlers/handleSubmit.js';

const phoneticAndAudioDiv = genIntroHtml();
searchForm.insertAdjacentElement('afterend', phoneticAndAudioDiv);

window.addEventListener(`load`, async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js', { type: 'module' });
    } catch {
      console.log('serviceWorker failed');
    }
  }
});

window.addEventListener('load', preloadTheme);
window.addEventListener('resize', locationOfPopUp);
touchArea.addEventListener(`pointerdown`, focusOnBody);
switchThemeBtn.addEventListener(`change`, handleSwitchTheme);
searchInput.addEventListener(`blur`, handleInputBlur);
searchInput.addEventListener(`focus`, handleInputFocus);
searchForm.addEventListener(`submit`, handleSubmit);
fontSelectBtn.addEventListener(`pointerdown`, handleChooseFont);
