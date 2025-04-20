(function(){"use strict";(()=>{let d=!1,i=0,s=0;function F(){d=!1,i=0,s=0}function N(){d=!1,i=0,s=0}function f(){return{loopActive:d,lStart:i,lEnd:s}}function E(n){return d=!d,d&&(s=n,i=Math.max(0,n-10)),d}function k(){i<s-1&&i++}function h(){i>0&&i--}function L(){s++}function I(){s>i+1&&s--}function y(n){const o=Math.floor(n/60),u=Math.floor(n%60);return`${o.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`}function D(n){return`${Math.floor(n).toString().padStart(2,"0")}s`}function w(n,o={}){const u=document.createElement(n);return Object.assign(u,o),u}document.addEventListener("fullscreenchange",()=>{const n=document.fullscreenElement||document.body,o=W();o&&n.appendChild(o)});function G(n){var C,z,M,P,A,R,X,$,j,U;const o=()=>document.querySelector("video");setInterval(()=>{const e=o();if(!e)return;const{loopActive:t,lStart:c,lEnd:r}=f(),v=document.getElementById("vs-current-time"),m=document.getElementById("vs-speed"),p=document.getElementById("vs-loop"),V=document.getElementById("vs-loop-start-time"),q=document.getElementById("vs-loop-end-time"),Y=document.getElementById("vs-loop-duration"),g=document.getElementById("vs-loop-settings-container");v&&(v.textContent=`⏱️ ${y(e.currentTime)}`),m&&(m.value=e.playbackRate),t?(p==null||p.classList.add("active-loop"),g&&(g.style.display="block"),V&&(V.textContent=y(c)),q&&(q.textContent=y(r)),Y&&(Y.textContent=D(r-c))):(p==null||p.classList.remove("active-loop"),g&&(g.style.display="none"))},500),setInterval(()=>{const e=o(),{loopActive:t,lEnd:c,lStart:r}=f();t&&e&&e.currentTime>c&&(e.currentTime=r)},300),(C=document.getElementById("vs-back"))==null||C.addEventListener("click",()=>{const e=o();e&&(e.currentTime-=5)}),(z=document.getElementById("vs-forward"))==null||z.addEventListener("click",()=>{const e=o();e&&(e.currentTime+=5)}),(M=document.getElementById("vs-play"))==null||M.addEventListener("click",()=>{const e=o();e&&(e.paused?e.play():e.pause())}),(P=document.getElementById("vs-speed"))==null||P.addEventListener("change",e=>{const t=o();t&&(t.playbackRate=parseFloat(e.target.value))}),(A=document.getElementById("vs-loop"))==null||A.addEventListener("click",()=>{const e=o();e&&E(e.currentTime)}),(R=document.getElementById("vs-loop-start-dec"))==null||R.addEventListener("click",h),(X=document.getElementById("vs-loop-start-inc"))==null||X.addEventListener("click",k),($=document.getElementById("vs-loop-end-dec"))==null||$.addEventListener("click",I),(j=document.getElementById("vs-loop-end-inc"))==null||j.addEventListener("click",L);const l=document.getElementById("vs-info"),B=document.getElementById("vs-help-overlay");l==null||l.addEventListener("mouseenter",()=>B.style.display="block"),l==null||l.addEventListener("mouseleave",()=>B.style.display="none"),(U=document.getElementById("vs-top-row"))==null||U.addEventListener("mousedown",e=>{const t=e.clientX-n.offsetLeft,c=e.clientY-n.offsetTop,r=m=>{n.style.left=`${m.clientX-t}px`,n.style.top=`${m.clientY-c}px`},v=()=>{document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",v)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",v)}),document.addEventListener("keydown",e=>{const t=o();if(!(!t||["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)))switch(e.key.toLowerCase()){case"arrowleft":t.currentTime-=5;break;case"arrowright":t.currentTime+=5;break;case"arrowup":t.playbackRate=Math.min(3,t.playbackRate+.25);break;case"arrowdown":t.playbackRate=Math.max(.25,t.playbackRate-.25);break;case" ":e.preventDefault(),t.paused?t.play():t.pause();break;case"s":E(t.currentTime);break;case"a":t.currentTime;break;case"b":t.currentTime;break;case"q":h();break;case"w":k();break;case"o":I();break;case"p":L();break;case"z":t.currentTime=f().lStart;break;case"r":t.currentTime=f().lStart,t.play();break}})}let a=null,b=!1;function x(){return b}function H(){if(b)return;b=!0;const n=w("style",{textContent:`
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
    `});document.head.appendChild(n),a=w("div",{id:"vs-panel"}),a.innerHTML=`
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
  `,document.body.appendChild(a),F(),G(a)}function O(){a&&(a.remove(),a=null),N(),b=!1}function W(){return a}let S=location.href;function T(){const n=location.pathname==="/player";n&&!x()?K():!n&&x()&&O()}function J(){setInterval(()=>{location.href!==S&&(S=location.href,T())},500)}function K(){const n=setInterval(()=>{location.pathname==="/player"&&document.querySelector("video")&&(clearInterval(n),setTimeout(()=>{location.pathname==="/player"&&!x()&&H()},500))},200)}console.log("VolleySkip+ content script loaded"),T(),J()})()})();
