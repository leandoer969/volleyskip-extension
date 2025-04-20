// core/state.js
let loopActive = false;
let lStart = 0;
let lEnd = 0;

export function setupLoopControls() {
  loopActive = false;
  lStart = 0;
  lEnd = 0;
}

export function teardownLoopControls() {
  loopActive = false;
  lStart = 0;
  lEnd = 0;
}

export function getLoopState() {
  return { loopActive, lStart, lEnd };
}

export function toggleLoop(currentTime) {
  loopActive = !loopActive;
  if (loopActive) {
    lEnd = currentTime;
    lStart = Math.max(0, currentTime - 10);
  }
  return loopActive;
}

export function incrementStart() {
  if (lStart < lEnd - 1) lStart++;
}

export function decrementStart() {
  if (lStart > 0) lStart--;
}

export function incrementEnd() {
  lEnd++;
}

export function decrementEnd() {
  if (lEnd > lStart + 1) lEnd--;
}