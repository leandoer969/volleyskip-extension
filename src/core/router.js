import { initPanel, destroyPanel, isPanelInitialized } from "./panel.js";

let lastUrl = location.href;

export function handleUrlChange() {
  const isPlayer = location.pathname === "/player";
  if (isPlayer && !isPanelInitialized()) {
    waitForVideoAndInit();
  } else if (!isPlayer && isPanelInitialized()) {
    destroyPanel();
  }
}

export function watchUrlChanges() {
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      handleUrlChange();
    }
  }, 500);
}

function waitForVideoAndInit() {
  const checkInterval = setInterval(() => {
    if (location.pathname === "/player" && document.querySelector("video")) {
      clearInterval(checkInterval);
      setTimeout(() => {
        if (location.pathname === "/player" && !isPanelInitialized()) {
          initPanel();
        }
      }, 500);
    }
  }, 200);
}