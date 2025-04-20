// core/events.js
import { toggleLoop, getLoopState, incrementStart, decrementStart, incrementEnd, decrementEnd } from "./state.js";
import { formatTime, formatSec } from "./utils.js";

import { getPanelElement } from "./panel.js";

document.addEventListener("fullscreenchange", () => {
  const container = document.fullscreenElement || document.body;
  const panel = getPanelElement();
  if (panel) container.appendChild(panel);
});

export function bindEvents(panel) {
  const video = () => document.querySelector("video");

  const updateLiveInfo = () => {
    const vid = video();
    if (!vid) return;

    const { loopActive, lStart, lEnd } = getLoopState();
    const ct = document.getElementById("vs-current-time");
    const sp = document.getElementById("vs-speed");
    const loopBtn = document.getElementById("vs-loop");
    const start = document.getElementById("vs-loop-start-time");
    const end = document.getElementById("vs-loop-end-time");
    const dur = document.getElementById("vs-loop-duration");
    const container = document.getElementById("vs-loop-settings-container");

    ct && (ct.textContent = `⏱️ ${formatTime(vid.currentTime)}`);
    sp && (sp.value = vid.playbackRate);

    if (loopActive) {
      loopBtn?.classList.add("active-loop");
      if (container) container.style.display = "block";
      if (start) start.textContent = formatTime(lStart);
      if (end) end.textContent = formatTime(lEnd);
      if (dur) dur.textContent = formatSec(lEnd - lStart);
    } else {
      loopBtn?.classList.remove("active-loop");
      if (container) container.style.display = "none";
    }
  };

  setInterval(updateLiveInfo, 500);
  setInterval(() => {
    const vid = video();
    const { loopActive, lEnd, lStart } = getLoopState();
    if (loopActive && vid && vid.currentTime > lEnd) {
      vid.currentTime = lStart;
    }
  }, 300);

  // Button controls
  document.getElementById("vs-back")?.addEventListener("click", () => {
    const vid = video();
    if (vid) vid.currentTime -= 5;
  });

  document.getElementById("vs-forward")?.addEventListener("click", () => {
    const vid = video();
    if (vid) vid.currentTime += 5;
  });

  document.getElementById("vs-play")?.addEventListener("click", () => {
    const vid = video();
    if (vid) vid.paused ? vid.play() : vid.pause();
  });

  document.getElementById("vs-speed")?.addEventListener("change", e => {
    const vid = video();
    if (vid) vid.playbackRate = parseFloat(e.target.value);
  });

  document.getElementById("vs-loop")?.addEventListener("click", () => {
    const vid = video();
    if (vid) toggleLoop(vid.currentTime);
  });

  // A/B loop adjusters
  document.getElementById("vs-loop-start-dec")?.addEventListener("click", decrementStart);
  document.getElementById("vs-loop-start-inc")?.addEventListener("click", incrementStart);
  document.getElementById("vs-loop-end-dec")?.addEventListener("click", decrementEnd);
  document.getElementById("vs-loop-end-inc")?.addEventListener("click", incrementEnd);

  // Tooltip
  const infoIcon = document.getElementById("vs-info");
  const help = document.getElementById("vs-help-overlay");
  infoIcon?.addEventListener("mouseenter", () => help.style.display = "block");
  infoIcon?.addEventListener("mouseleave", () => help.style.display = "none");

  // Dragging
  document.getElementById("vs-top-row")?.addEventListener("mousedown", e => {
    const offsetX = e.clientX - panel.offsetLeft;
    const offsetY = e.clientY - panel.offsetTop;
    const move = e => {
      panel.style.left = `${e.clientX - offsetX}px`;
      panel.style.top = `${e.clientY - offsetY}px`;
    };
    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", e => {
    const vid = video();
    if (!vid || ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

    switch (e.key.toLowerCase()) {
      case "arrowleft": vid.currentTime -= 5; break;
      case "arrowright": vid.currentTime += 5; break;
      case "arrowup": vid.playbackRate = Math.min(3, vid.playbackRate + 0.25); break;
      case "arrowdown": vid.playbackRate = Math.max(0.25, vid.playbackRate - 0.25); break;
      case " ": e.preventDefault(); vid.paused ? vid.play() : vid.pause(); break;
      case "s": toggleLoop(vid.currentTime); break;
      case "a": getLoopState().lStart = vid.currentTime; break;
      case "b": getLoopState().lEnd = vid.currentTime; break;
      case "q": decrementStart(); break;
      case "w": incrementStart(); break;
      case "o": decrementEnd(); break;
      case "p": incrementEnd(); break;
      case "z": vid.currentTime = getLoopState().lStart; break;
      case "r": vid.currentTime = getLoopState().lStart; vid.play(); break;
    }
  });
}
