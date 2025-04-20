import { handleUrlChange, watchUrlChanges } from "./core/router.js";
console.log("VolleySkip+ content script loaded");

handleUrlChange();
watchUrlChanges();