export function $(id) {
    return document.getElementById(id);
  }
  
  export function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  
  export function formatSec(sec) {
    return `${Math.floor(sec).toString().padStart(2, "0")}s`;
  }
  
  export function createElement(tag, props = {}) {
    const el = document.createElement(tag);
    Object.assign(el, props);
    return el;
  }