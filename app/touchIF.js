import { touchArea } from './variable.js';
import { moveBackPage, moveNextPage } from './navigate.js';
import { wait } from './utils/util.js';

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
async function quickie() {
  const res = await fetch('home.html');
  const result = await res.text();
  console.log(result, document);
  document.body.innerHTML = result;
}

async function touchMove(e) {
  if (!isTouchDevice()) {
    e.preventDefault();
  }
  if (isSwiped) {
    getXY(e);
    const diffX = mouseX - initialX;
    const diffY = mouseY - initialY;
    if (Math.abs(diffX) > Math.abs(diffY))
      if (diffX > 100) {
        return moveBackPage();
      }
    // if (diffX < -100) return moveNextPage(words[words.length - 1]);
  }
}

function touchUp() {
  isSwiped = false;
}

isTouchDevice();

async function addTouchEventsListeners() {
  // if (words.length === 0) return;
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
