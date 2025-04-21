# VolleySkip+ 🎛️

**VolleySkip+** is a Chrome Extension that adds advanced playback controls to the video player on [tv.volleyballworld.com](https://tv.volleyballworld.com), giving you full command over skipping, looping, speed, and more.


---

## ✨ Features

- ⏪⏯️⏩ Play, pause, skip 5s back/forward
- 🚀 Playback speed control (0.5x to 2x)
- 🔁 Looping with start/end (🅰️/🅱️)
- 🧠 Keyboard shortcuts for all actions
- 🖱️ Draggable panel UI
- 📺 Fullscreen-compatible

---

## 📦 Installation (Development Mode)

1. Clone this repository  
2. Install dependencies and build:

```bash
npm install
npm run build
```
3.	Open chrome://extensions
4.	Enable Developer mode (top right)
5.	Click “Load unpacked” and select the public/ folder

## 🛠 Development Workflow
	•	Source files are in src/ and modularized
	•	Final bundle is built to dist/
	•	content.js is automatically copied into public/ after build

Build command:

```bash
npm run build
```


## 🎮 Keyboard Shortcuts

| Key         | Action                      |
|-------------|-----------------------------|
| ⬅️ / ➡️     | Skip 5 seconds              |
| ⬆️ / ⬇️     | Speed up / slow down        |
| Space       | Play / Pause                |
| `S`         | Toggle loop mode            |
| `A` / `B`   | Set loop start / end        |
| `Q` / `W`   | Adjust loop start (−/+)     |
| `O` / `P`   | Adjust loop end (−/+)       |
| `Z`         | Jump to loop start (🅰️)     |
| `R`         | Replay from loop start      |

---

## 🔐 Chrome Web Store Publishing

To prepare a release:

1. Run:

```bash
npm run build

```

2.	Go to chrome://extensions
3.	Click Pack Extension
    •	Select the public/ folder as the root
    •	Upload the generated .crx and .pem to /releases for safekeeping

## 🧪 Coming Soon
•	Save loop settings with Chrome storage
•	Clip export (WebM)
•	Toolbar popup with quick actions


## 🧠 Author

Built by leandoer969
MIT License