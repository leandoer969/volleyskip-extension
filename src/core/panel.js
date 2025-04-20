// core/panel.js
import { setupLoopControls, teardownLoopControls } from "./state.js";
import { bindEvents } from "./events.js";
import { $, createElement } from "./utils.js";

let panel = null;
let initialized = false;

export function isPanelInitialized() {
  return initialized;
}

export function initPanel() {
  if (initialized) return;
  initialized = true;

  const style = createElement("style", {
    textContent: `
      #vs-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 500px;
        background: rgba(10,10,10,0.9);
        color: #fff;
        font-family: sans-serif;
        border-radius: 12px;
        padding: 16px;
        z-index: 9999;
        box-shadow: 0 6px 12px rgba(0,0,0,0.4);
        user-select: none;
      }
      #vs-top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      #vs-title { font-weight: bold; }
      #vs-extra-controls { margin-top: 8px; }
      #vs-live-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      #vs-playback-controls button, #vs-loop {
        padding: 4px 8px;
        border: none;
        border-radius: 6px;
        background: #333;
        color: #fff;
        cursor: pointer;
        transition: transform 0.1s;
      }
      #vs-playback-controls button:hover, #vs-loop:hover {
        background: #555;
        transform: scale(1.1);
      }
      #vs-speed-control select {
        margin-left: 4px;
        padding: 4px 8px;
        border: none;
        border-radius: 6px;
        background: #333;
        color: #fff;
        cursor: pointer;
      }
      .active-loop { background: green !important; }
      #vs-loop-settings-container {
        margin-top: 8px;
        display: none;
      }
      #vs-loop-settings {
        border: 1px solid #555;
        padding: 4px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: monospace;
        font-size: 12px;
      }
      #vs-loop-settings button {
        margin: 0 2px;
        padding: 2px 6px;
        font-size: 12px;
      }
      #vs-loop-settings span {
        margin: 0 4px;
      }
      #vs-help-overlay {
        position: absolute;
        top: 40px;
        right: 20px;
        background: #f0f0f0;
        color: #000;
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        font-size: 12px;
        display: none;
        z-index: 10000;
        white-space: pre-line;
      }
    `
  });

  document.head.appendChild(style);

  panel = createElement("div", { id: "vs-panel" });
  panel.innerHTML = `
    <div id="vs-full">
      <div id="vs-top-row">
        <div id="vs-top-left"><span id="vs-title">VolleySkip+ 🎛️</span></div>
        <div id="vs-top-middle"></div>
        <div id="vs-top-right"><span id="vs-info">ℹ️</span></div>
      </div>
      <div id="vs-extra-controls">
        <div id="vs-live-info">
          <span id="vs-current-time">⏱️ 00:00</span>
          <div id="vs-playback-controls">
            <button id="vs-back">⏪</button>
            <button id="vs-play">⏯️</button>
            <button id="vs-forward">⏩</button>
          </div>
          <div id="vs-speed-control">
            <span>🚀</span>
            <select id="vs-speed">
              <option value="0.5">0.50x</option>
              <option value="0.75">0.75x</option>
              <option value="1" selected>1.00x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.50x</option>
              <option value="2">2.00x</option>
            </select>
          </div>
          <button id="vs-loop" class="loop-btn">🔁</button>
        </div>
        <div id="vs-loop-settings-container">
          <div id="vs-loop-settings">
            <span>🅰️</span>
            <span id="vs-loop-start-time">00:00</span>
            <button id="vs-loop-start-dec">-</button>
            <button id="vs-loop-start-inc">+</button>
            <span id="vs-loop-duration">00s</span>
            <button id="vs-loop-end-dec">-</button>
            <button id="vs-loop-end-inc">+</button>
            <span id="vs-loop-end-time">00:00</span>
            <span>🅱️</span>
          </div>
        </div>
      </div>
    </div>
    <div id="vs-help-overlay">
      ℹ️ VolleySkip+ Guide
      • ⏪ / ⏩ – Skip 5s
      • ⏯️ – Play/Pause
      • 🚀 – Change playback speed
      • 🔁 – Toggle Loop Mode
         → When active, set loop A and B using [-][+] buttons
      • Loop duration shows as [XXs] in middle
      • 🅰️ and 🅱️ mark loop start and end
    </div>
  `;

  document.body.appendChild(panel);

  setupLoopControls();
  bindEvents(panel);
}

export function destroyPanel() {
  if (panel) {
    panel.remove();
    panel = null;
  }
  teardownLoopControls();
  initialized = false;
}

export function getPanelElement() {
  return panel;
}