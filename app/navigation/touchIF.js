import { touchArea } from '../variable.js';
import { moveBackPage } from './navigate.js';
import { wait } from '../utils/util.js';

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

async function touchMove(e) {
  if (!isTouchDevice()) {
    e.preventDefault();
    return;
  }
  if (isSwiped) {
    getXY(e);
    const diffX = mouseX - initialX;
    const diffY = mouseY - initialY;
    if (Math.abs(diffX) > Math.abs(diffY))
      if (diffX > 120) {
        return moveBackPage();
      }
  }
}

function touchUp() {
  isSwiped = false;
}

isTouchDevice();

async function addTouchEventsListeners() {
  await wait(400);
  touchArea.addEventListener(events[deviceType].down, touchDown);
  touchArea.addEventListener(events[deviceType].move, touchMove);
  touchArea.addEventListener(events[deviceType].up, touchUp);
  touchArea.addEventListener(`mouseleave`, touchUp);
}

function removeTouchEventsListeners() {
  touchArea.removeEventListener(events[deviceType].down, touchDown);
  touchArea.removeEventListener(events[deviceType].move, touchMove);
  touchArea.removeEventListener(events[deviceType].up, touchUp);
  touchArea.removeEventListener(`mouseleave`, touchUp);
}

export { addTouchEventsListeners, removeTouchEventsListeners, touchUp };
