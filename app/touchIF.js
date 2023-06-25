import { touchArea, words } from './variable.js';
import { moveBackPage } from './navigate.js';

const rectLeft = touchArea.getBoundingClientRect().left;
const rectTop = touchArea.getBoundingClientRect().top;
let mouseX;
let initialX = 0;
let mouseY;
let initialY = 0;
let isSwiped;
let deviceType;

const events = {
  mouse: {
    down: `pointerdown`,
    move: `pointermove`,
    up: `pointerup`,
  },
  touch: {
    down: `touchstart`,
    move: `touchmove`,
    up: `touchend`,
  },
};

function isTouchDevice() {
  try {
    document.createEvent(`TouchEvent`);
    deviceType = `touch`;
    return true;
  } catch {
    deviceType = `mouse`;
    return false;
  }
}

function getXY(e) {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
}

function touchDown(e) {
  isSwiped = true;
  getXY(e);
  initialX = mouseX;
  initialY = mouseY;
}

function touchMove(e) {
  if (!isTouchDevice()) {
    e.preventDefault();
  }
  if (isSwiped) {
    getXY(e);
    const diffX = mouseX - initialX;
    const diffY = mouseY - initialY;
    if (Math.abs(diffX) > Math.abs(diffY))
      if (diffX > 100 && words.length > 0)
        moveBackPage(words[words.length - 1]);
  }
}

function touchUp(e) {
  isSwiped = false;
}

isTouchDevice();

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function addTouchEventsListeners() {
  if (words.length === 0) return;
  await wait(300);
  touchArea.addEventListener(events[deviceType].down, touchDown);
  touchArea.addEventListener(events[deviceType].move, touchMove);
  touchArea.addEventListener(events[deviceType].up, touchUp);
  touchArea.addEventListener(`mouseleave`, touchUp);
  window.addEventListener(`load`, touchUp);
}

function removeTouchEventsListeners() {
  touchArea.removeEventListener(events[deviceType].down, touchDown);
  touchArea.removeEventListener(events[deviceType].move, touchMove);
  touchArea.removeEventListener(events[deviceType].up, touchUp);
  touchArea.removeEventListener(`mouseleave`, touchUp);
  window.removeEventListener(`load`, touchUp);
}

export { addTouchEventsListeners, removeTouchEventsListeners };
