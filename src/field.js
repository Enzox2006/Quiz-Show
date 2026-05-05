const fieldWidth = 1920;
const fieldHeight = 1080;

document.body.style.cssText = `
    background: linear-gradient(135deg, #1a0a3c 0%, #0a0018 100%);
    margin: 0; padding: 0; overflow: hidden;
    width: 100%; height: 100%;
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
`;

let field = document.createElement("div");
document.body.appendChild(field);
field.style.position = "absolute";
field.style.transformOrigin = "0px 0px";
field.style.width = fieldWidth + "px";
field.style.height = fieldHeight + "px";
field.style.overflow = "hidden";
field.style.background = "linear-gradient(135deg, #1a0a3c 0%, #0a0018 100%)";

function fit() {
    let vp = window.visualViewport;
    let w = vp ? vp.width  : window.innerWidth;
    let h = vp ? vp.height : window.innerHeight;
    let scale = Math.min(w / fieldWidth, h / fieldHeight);
    let xMargin = (w - scale * fieldWidth) / 2;
    let yMargin = (h - scale * fieldHeight) / 2;
    field.style.transform = `scale(${scale})`;
    field.style.left = xMargin + "px";
    field.style.top  = yMargin + "px";
}

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fit);
}

fit();
addEventListener("resize", fit);
addEventListener("DOMContentLoaded", fit);

function tryLockLandscape() {
    if (screen.orientation && typeof screen.orientation.lock === "function") {
        screen.orientation.lock("landscape").catch(() => {});
    }
}

tryLockLandscape();

let rotateOverlay = document.createElement("div");
rotateOverlay.style.cssText = `
    display: none;
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: #0a0018;
    flex-direction: column; align-items: center; justify-content: center; gap: 36px;
    z-index: 9999;
`;

let rotateIconWrap = document.createElement("div");
rotateIconWrap.style.cssText = `
    width: 120px; height: 120px;
    border: 3px solid rgba(240,200,0,0.4);
    border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    animation: rotatePulse 2s ease-in-out infinite;
`;
rotateIconWrap.innerHTML = "📱";
rotateIconWrap.style.fontSize = "70px";

let rotateText = document.createElement("div");
rotateText.innerHTML = "Ruota il dispositivo";
rotateText.style.cssText = `
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 48px; font-weight: 700; color: #f0c800;
    letter-spacing: 3px; text-align: center;
`;

let rotateSubText = document.createElement("div");
rotateSubText.innerHTML = "Il gioco funziona in modalità orizzontale";
rotateSubText.style.cssText = `
    font-family: 'Barlow', sans-serif;
    font-size: 26px; color: rgba(255,255,255,0.45); text-align: center;
`;

let rotateStyle = document.createElement("style");
rotateStyle.innerHTML = `
    @keyframes rotatePulse {
        0%, 100% { transform: rotate(0deg); opacity: 0.7; }
        50%       { transform: rotate(15deg); opacity: 1; }
    }
`;
document.head.appendChild(rotateStyle);

rotateOverlay.appendChild(rotateIconWrap);
rotateOverlay.appendChild(rotateText);
rotateOverlay.appendChild(rotateSubText);
document.body.appendChild(rotateOverlay);

function isMobileDevice() {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0)
        && Math.min(screen.width, screen.height) < 900;
}

function checkOrientation() {
    if (!isMobileDevice()) {
        rotateOverlay.style.display = "none";
        fit();
        return;
    }
    let portrait = window.innerHeight > window.innerWidth;
    if (portrait) {
        rotateOverlay.style.display = "flex";
        tryLockLandscape();
    } else {
        rotateOverlay.style.display = "none";
        fit();
    }
}

addEventListener("resize", checkOrientation);
addEventListener("DOMContentLoaded", checkOrientation);

if (screen.orientation) {
    screen.orientation.addEventListener("change", () => {
        setTimeout(checkOrientation, 100);
    });
}

checkOrientation();
