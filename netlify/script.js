// ==UserScript==
// @name         rustyCode
// @description  how should i code
// @version      1
// @author       H._.ns
// @match        *://*.moomoo.io/*
// @grant        none
// @license      MIT
// ==/UserScript==
let anglePrecisionDivisor = 48;
let autoPlaceAngles = [];
let autoPlaceVisualEnabled = true;
(function() {
    const firebaseScript = document.createElement('script');
    firebaseScript.src = "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js";
    firebaseScript.onload = () => {
        const firestoreScript = document.createElement('script');
        firestoreScript.src = "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js";
        firestoreScript.onload = () => {
            const firebaseConfig = {
                apiKey: "AIzaSyAgdKCTEziWLYiCO_x8nJHFHIb9D0b2nqk",
                authDomain: "momoo-auth.firebaseapp.com",
                projectId: "momoo-auth",
                storageBucket: "momoo-auth.firebasestorage.app",
                messagingSenderId: "1079736929316",
                appId: "1:1079736929316:web:73edc8d53b0f94ad921cb1",
                measurementId: "G-W91Q36L47F"
              };
            firebase.initializeApp(firebaseConfig);
            window.db = firebase.firestore();
            showLoginModal(() => {
                const scriptSrc = "index-6b10514b.js";
                const scriptTags = document.querySelectorAll(`script[src*="${scriptSrc}"]`);
                if (scriptTags.length > 0) {
                    scriptTags[0].remove();
                }
            });
        };
        document.head.appendChild(firestoreScript);
    };
    document.head.appendChild(firebaseScript);

    function showLoginModal(callback) {
        const overlay = document.createElement('div');
        overlay.id = 'loginIndex';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = '99999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        const modal = document.createElement('div');
        modal.style.background = 'linear-gradient(135deg, #232526 0%, #414345 100%)';
        modal.style.borderRadius = '16px';
        modal.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
        modal.style.padding = '32px 28px 24px 28px';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.minWidth = '320px';
        modal.style.maxWidth = '90vw';
        modal.style.position = 'relative';
        modal.style.border = '1.5px solid #fff2';
        
        const title = document.createElement('h2');
        title.innerText = 'Inicio de Sesión';
        title.style.color = '#fff';
        title.style.marginBottom = '18px';
        title.style.letterSpacing = '1px';
        title.style.fontWeight = 'bold';
        modal.appendChild(title);

        const userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.placeholder = 'Usuario';
        userInput.style.marginBottom = '12px';
        userInput.style.padding = '10px';
        userInput.style.borderRadius = '8px';
        userInput.style.border = '1px solid #ccc';
        userInput.style.width = '100%';
        userInput.style.fontSize = '16px';
        modal.appendChild(userInput);

        const passInput = document.createElement('input');
        passInput.type = 'password';
        passInput.placeholder = 'Contraseña';
        passInput.style.marginBottom = '18px';
        passInput.style.padding = '10px';
        passInput.style.borderRadius = '8px';
        passInput.style.border = '1px solid #ccc';
        passInput.style.width = '100%';
        passInput.style.fontSize = '16px';
        modal.appendChild(passInput);

        const errorMsg = document.createElement('div');
        errorMsg.style.color = '#ff6b6b';
        errorMsg.style.marginBottom = '10px';
        errorMsg.style.height = '18px';
        errorMsg.style.fontSize = '15px';
        errorMsg.style.textAlign = 'center';
        modal.appendChild(errorMsg);

        const btn = document.createElement('button');
        btn.innerText = 'Entrar';
        btn.style.background = 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.padding = '10px 24px';
        btn.style.borderRadius = '8px';
        btn.style.fontSize = '16px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = 'bold';
        btn.style.marginBottom = '8px';
        modal.appendChild(btn);

        btn.onclick = () => {
            const username = userInput.value.trim();
            const password = passInput.value.trim();
            errorMsg.innerText = '';
            if (!username || !password) {
                errorMsg.innerText = 'Completa ambos campos';
                return;
            }
            if (!window.db) {
                errorMsg.innerText = 'Firestore no está listo';
                return;
            }
            window.db.collection('users')
            .where('username', '==', username)
            .where('password', '==', password)
            .where('active', '==', true)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    fetch('https://api.ipify.org?format=json')
                        .then(res => res.json())
                        .then(data => {
                            snapshot.forEach(doc => {
                                window.db.collection('users').doc(doc.id).update({
                                    lastIP: data.ip,
                                    lastLogin: new Date()
                                });
                            });
                        });
                    overlay.remove();
                    callback();
                } else {
                    errorMsg.innerText = 'Usuario, contraseña incorrectos o cuenta desactivada';
                }
            })
            .catch(() => {
                errorMsg.innerText = 'Error de conexión';
            });
        };

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }
})();

(function() {
    const scriptSrc = "index-6b10514b.js";
    const scriptTags = document.querySelectorAll(`script[src*="${scriptSrc}"]`);
    if (scriptTags.length > 0) {
        scriptTags[0].remove();
    }
})();

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 192) {
        const chatHolder = document.getElementById("gameUI");
        if (chatHolder) {
            const currentDisplay = chatHolder.style.display;
            chatHolder.style.display = currentDisplay === "none" ? "block" : "none";
        }
    }
});

function verify(id) {
    return document.getElementById(id);
}

function loadScript(url, callback) {
    let script = document.createElement("script");
    script.src = url;
    script.onload = () => {
        if (callback) callback();
    };
    script.onerror = (error) => {
    };
    document.body.appendChild(script);
}

const msgpackUrl = "https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js";
const customScriptUrl = null;

loadScript(msgpackUrl, () => {
    loadScript(customScriptUrl);
});

window.oncontextmenu = function() {
    return false;
};

let config = window.config;
let recording;

config.clientSendRate = 9;
config.serverUpdateRate = 9;

config.deathFadeout = 0;

config.playerCapacity = 50;
window.config.maxPlayers = 50;

config.isSandbox = window.location.hostname == "sandbox.moomoo.io";

config.skinColors = ["#bf8f54", "#4c4c4c", "#896c4b",
                     "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3",
                     "#8bc373", "#91b2db", "#4952cc",
                    ];

config.weaponVariants = [{
    id: 0,
    src: "",
    xp: 0,
    val: 1,
}, {
    id: 1,
    src: "_g",
    xp: 3000,
    val: 1.1,
}, {
    id: 2,
    src: "_d",
    xp: 7000,
    val: 1.18,
}, {
    id: 3,
    src: "_r",
    poison: true,
    xp: 12000,
    val: 1.18,
}, {
    id: 4,
    src: "_e",
    poison: true,
    heal: true,
    xp: 24000,
    val: 1.18,
}];

config.anotherVisual = false;
config.useWebGl = false;
config.resetRender = true;

function waitTime(timeout) {
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, timeout);
    });
}

let canStore;
if (typeof(Storage) !== "undefined") {
    canStore = true;
}

function saveVal(name, val) {
    if (canStore)
        localStorage.setItem(name, val);
}

function deleteVal(name) {
    if (canStore)
        localStorage.removeItem(name);
}

function getSavedVal(name) {
    if (canStore)
        return localStorage.getItem(name);
    return null;
}

let gC = function(a, b) {
    try {
        let res = JSON.parse(getSavedVal(a));
        if (typeof res === "object") {
            return b;
        } else {
            return res;
        }
    } catch (e) {
        return b;
    }
};

function setConfigs() {
    return {
        placeVis: false,
        killChat: false,
        autoBuy: true,
        autoBuyEquip: true,
        autoPush: true,
        revTick: true,
        spikeTick: true,
        predictTick: true,
        autoPlace: true,
        autoReplace: true,
        antiTrap: true,
        slowOT: false,
        attackDir: false,
        showDir: false,
        autoRespawn: false,
    };
}

let configs = setConfigs();

window.removeConfigs = function() {
    for (let cF in configs) {
        deleteVal(cF, configs[cF]);
    }
};

for (let cF in configs) {
    configs[cF] = gC(cF, configs[cF]);
}

window.changeMenu = function() {};
window.debug = function() {};
window.wasdMode = function() {};

window.startGrind = function() {};

window.resBuild = function() {};
window.toggleVisual = function() {};

window.prepareUI = function() {};
window.leave = function() {};

const openPanelBtn = document.createElement('button');
openPanelBtn.id = 'openPanelBtn';
openPanelBtn.innerHTML = '⚙️';
openPanelBtn.style.cssText = `
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 100000;
    background: #23272f;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 26px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    cursor: pointer;
    transition: background 0.2s;
`;
openPanelBtn.onmouseenter = () => openPanelBtn.style.background = '#2e3340';
openPanelBtn.onmouseleave = () => openPanelBtn.style.background = '#23272f';
document.body.appendChild(openPanelBtn);

const panel = document.createElement('div');
panel.id = 'menuDiv';
panel.style.cssText = `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-120%);
    width: 420px;
    max-width: 98vw;
    background: #181a1b;
    color: #e0e0e0;
    border-radius: 0 0 18px 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.32);
    z-index: 100001;
    padding: 18px 18px 12px 18px;
    transition: transform 0.32s cubic-bezier(.4,2,.6,1);
    font-family: 'Segoe UI', Arial, sans-serif;
`;

panel.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:19px;font-weight:600;letter-spacing:0.5px;">Panel de Opciones</span>
        <button id="closePanelBtn" style="background:none;border:none;color:#fff;font-size:22px;cursor:pointer;">✕</button>
    </div>
    <div id="switchesGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;"></div>
`;
document.body.appendChild(panel);

openPanelBtn.onclick = () => {
    panel.style.transform = 'translateX(-50%) translateY(0)';
    openPanelBtn.style.display = 'none';
};
panel.querySelector('#closePanelBtn').onclick = () => {
    panel.style.transform = 'translateX(-50%) translateY(-120%)';
    setTimeout(() => openPanelBtn.style.display = '', 320);
};

const configLabels = {
    autoPlace: 'Auto Place',
    autoReplace: 'Auto Replace',
    killChat: 'Disable Chat',
    autoBuy: 'Auto Buy',
    autoBuyEquip: 'Auto Equip',
    autoPush: 'Auto Push',
    revTick: 'Reverse Tick',
    spikeTick: 'Spike Tick',
    predictTick: 'Predict Tick',
    antiTrap: 'Anti Trap',
    slowOT: 'Slow OT',
    attackDir: 'Attack Dir',
    showDir: 'Show Dir',
    autoRespawn: 'Auto Respawn',
    safeAntiSpikeTick: 'Anti Spike Tick',
    backupNobullInsta: 'Nobull Insta',
    turretGear: 'Turret Asistance',
    placeVis: 'Render Placer',
    debug: 'Debug',
};

const configKeys = [
    'autoPlace', 'autoReplace', 'killChat', 'autoBuy', 'autoBuyEquip', 'autoPush',
    'revTick', 'spikeTick', 'predictTick', 'antiTrap', 'slowOT', 'attackDir',
    'showDir', 'autoRespawn', 'safeAntiSpikeTick', 'backupNobullInsta', 'turretGear',
    'placeVis', 'debug'
];

const extraOptions = [
    { id: 'instaType', label: 'Insta Type', type: 'select', options: [
        { value: 'normal', text: 'Normal' },
        { value: 'rapido', text: 'Rápido' },
        { value: 'oneShot', text: 'Seguro' }
    ] },
    { id: 'antiBullType', label: 'AntiBull', type: 'select', options: [
        { value: 'noab', text: 'Desactivado' },
        { value: 'abreload', text: 'Primary' },
        { value: 'abalway', text: 'Siempre' }
    ] },
    { id: 'predictType', label: 'Predict Placement', type: 'select', options: [
        { value: 'simple', text: 'Predict' },
        { value: 'avanzado', text: 'Ignore' }
    ] },
    { id: 'weaponGrind', label: 'Auto Grind', type: 'toggle' },
];

const tabsBar = document.createElement('div');
tabsBar.style.display = 'flex';
tabsBar.style.justifyContent = 'center';
tabsBar.style.gap = '12px';
tabsBar.style.marginBottom = '12px';

const tabPrincipal = document.createElement('button');
tabPrincipal.textContent = 'Principal';
tabPrincipal.style.cssText = `
    background: #3a8fff;
    color: #fff;
    border: none;
    border-radius: 8px 8px 0 0;
    padding: 7px 22px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px #0001;
`;
const tabAvanzado = document.createElement('button');
tabAvanzado.textContent = 'Avanzado';
tabAvanzado.style.cssText = `
    background: #23272f;
    color: #fff;
    border: none;
    border-radius: 8px 8px 0 0;
    padding: 7px 22px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px #0001;
`;
tabsBar.appendChild(tabPrincipal);
tabsBar.appendChild(tabAvanzado);
panel.insertBefore(tabsBar, panel.children[1]);
const pagePrincipal = document.createElement('div');
pagePrincipal.id = 'pagePrincipal';
pagePrincipal.style.display = 'block';
const pageAvanzado = document.createElement('div');
pageAvanzado.id = 'pageAvanzado';
pageAvanzado.style.display = 'none';
const switchesGrid = document.createElement('div');
switchesGrid.style.display = 'grid';
switchesGrid.style.gridTemplateColumns = '1fr 1fr';
switchesGrid.style.gap = '10px 18px';
pagePrincipal.appendChild(switchesGrid);
for (const key of configKeys) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.background = 'rgba(44,48,60,0.82)';
    row.style.borderRadius = '8px';
    row.style.padding = '7px 12px';
    row.style.fontSize = '15px';
    row.style.fontWeight = '400';
    row.style.gap = '10px';

    const label = document.createElement('span');
    label.textContent = configLabels[key] || key;
    label.style.flex = '1';
    const toggle = document.createElement('label');
    toggle.className = 'switch';
    toggle.style.cssText = 'position:relative;display:inline-block;width:38px;height:22px;';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!configs[key];
    input.style.display = 'none';
    input.onchange = () => {
        configs[key] = input.checked;
        saveVal(key, input.checked);
        if (typeof setConfigs === 'function') setConfigs();
        if (key === 'renderPlacer') {
            if (typeof window.toggleRenderPlacer === 'function') window.toggleRenderPlacer(input.checked);
        }
        if (key === 'debug') {
            if (typeof window.toggleDebug === 'function') window.toggleDebug(input.checked);
        }
        circle.style.transform = input.checked ? 'translateX(16px)' : 'none';
    };
    Object.defineProperty(configs, key, {
        set(val) {
            input.checked = !!val;
            saveVal(key, !!val);
        },
        get() {
            return input.checked;
        }
    });
    const slider = document.createElement('span');
    slider.className = 'slider';
    slider.style.cssText = `
        position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;
        background:#444;transition:.3s;border-radius:22px;
    `;
    slider.onmouseover = () => slider.style.background = '#3a8fff';
    slider.onmouseleave = () => slider.style.background = '#444';
    const circle = document.createElement('span');
    circle.style.cssText = `
        position:absolute;content:'';height:18px;width:18px;left:2px;bottom:2px;
        background:#fff;transition:.3s;border-radius:50%;box-shadow:0 1px 4px #0002;
        transform: ${input.checked ? 'translateX(16px)' : 'none'};
    `;
    slider.appendChild(circle);
    toggle.appendChild(input);
    toggle.appendChild(slider);

    row.appendChild(label);
    row.appendChild(toggle);
    switchesGrid.appendChild(row);
}
let placeVisHidden = document.getElementById('placeVis');
if (!placeVisHidden) {
    placeVisHidden = document.createElement('input');
    placeVisHidden.type = 'checkbox';
    placeVisHidden.id = 'placeVis';
    placeVisHidden.style.display = 'none';
    document.body.appendChild(placeVisHidden);
}
placeVisHidden.checked = !!configs.placeVis;

Object.defineProperty(configs, 'placeVis', {
    set(val) {
        placeVisHidden.checked = !!val;
        saveVal('placeVis', !!val);
    },
    get() {
        return placeVisHidden.checked;
    }
});

pagePrincipal.appendChild(switchesGrid);
const advancedGrid = document.createElement('div');
advancedGrid.style.display = 'grid';
advancedGrid.style.gridTemplateColumns = '1fr 1fr';
advancedGrid.style.gap = '10px 18px';
pageAvanzado.appendChild(advancedGrid);

for (const opt of extraOptions) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.background = 'rgba(44,48,60,0.82)';
    row.style.borderRadius = '8px';
    row.style.padding = '7px 12px';
    row.style.fontSize = '15px';
    row.style.fontWeight = '400';
    row.style.gap = '10px';
    row.id = opt.id + '_row';

    const label = document.createElement('span');
    label.textContent = opt.label;
    label.style.flex = '1';
    label.htmlFor = opt.id;

    if (opt.type === 'select') {
        const select = document.createElement('select');
        select.id = opt.id;
        select.style.cssText = 'width: 120px; padding: 4px 8px; border-radius: 6px; border: 1px solid #444; background: #23272f; color: #fff; font-size: 15px;';
        for (const option of opt.options) {
            const optElem = document.createElement('option');
            optElem.value = option.value;
            optElem.textContent = option.text;
            select.appendChild(optElem);
        }
        row.appendChild(label);
        row.appendChild(select);
    } else if (opt.type === 'toggle') {
        const toggle = document.createElement('label');
        toggle.className = 'switch';
        toggle.style.cssText = 'position:relative;display:inline-block;width:38px;height:22px;';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = opt.id;
        input.style.display = 'none';
        const slider = document.createElement('span');
        slider.className = 'slider';
        slider.style.cssText = `
            position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;
            background:#444;transition:.3s;border-radius:22px;
        `;
        slider.onmouseover = () => slider.style.background = '#3a8fff';
        slider.onmouseleave = () => slider.style.background = '#444';
        const circle = document.createElement('span');
        circle.style.cssText = `
            position:absolute;content:'';height:18px;width:18px;left:2px;bottom:2px;
            background:#fff;transition:.3s;border-radius:50%;box-shadow:0 1px 4px #0002;
        `;
        slider.appendChild(circle);
        toggle.appendChild(input);
        toggle.appendChild(slider);
        row.appendChild(label);
        row.appendChild(toggle);
    }
    advancedGrid.appendChild(row);
}

panel.appendChild(pagePrincipal);
panel.appendChild(pageAvanzado);

function activarTab(tab) {
    if (tab === 'principal') {
        pagePrincipal.style.display = 'block';
        pageAvanzado.style.display = 'none';
        tabPrincipal.style.background = '#3a8fff';
        tabAvanzado.style.background = '#23272f';
    } else {
        pagePrincipal.style.display = 'none';
        pageAvanzado.style.display = 'block';
        tabPrincipal.style.background = '#23272f';
        tabAvanzado.style.background = '#3a8fff';
    }
}
tabPrincipal.onclick = () => activarTab('principal');
tabAvanzado.onclick = () => activarTab('avanzado');
activarTab('principal');
if (typeof tabsBar !== 'undefined') {
    tabPrincipal.style.background = '#23272b';
    tabPrincipal.style.color = '#e0e0e0';
    tabAvanzado.style.background = '#23272b';
    tabAvanzado.style.color = '#e0e0e0';
    tabPrincipal.onfocus = tabAvanzado.onfocus = null;
}

const updateSwitchRowStyles = (row, input) => {
    row.style.background = input.checked ? '#263445' : 'rgba(30,32,34,0.92)';
    row.style.borderRadius = '8px';
    row.style.padding = '7px 12px';
    row.style.fontSize = '15px';
    row.style.fontWeight = '400';
    row.style.gap = '10px';
    row.style.transition = 'background 0.25s';
};
const style = document.createElement('style');
style.textContent = `
.switch input:checked + .slider {
    background: #3a3a3a;
}
.switch .slider {
    background: #23272b;
    box-shadow: 0 2px 8px #0002;
}
.switch .slider span {
    left: 2px;
    bottom: 2px;
    background: #e0e0e0;
    transition: .3s;
}
.switch input:checked + .slider span {
    background: #7fd1ff;
}
#menuDiv button, #menuDiv select {
    background: #23272b !important;
    color: #e0e0e0 !important;
    border: 1px solid #333 !important;
}
#menuDiv button:focus, #menuDiv button:hover {
    background: #31343a !important;
}
`;
document.head.appendChild(style);



let openMenu = false;

let WS = undefined;
let socketID = undefined;

let useWasd = false;
let packetEngine = 0;
let secTime = 1000;
let firstSend = {
    sec: false
};
let game = {
    TICK: 0,
    tickQueue: [],
    tickBase: function(set, tick) {
        if (this.tickQueue[this.TICK + tick]) {
            this.tickQueue[this.TICK + tick].push(set);
        } else {
            this.tickQueue[this.TICK + tick] = [set];
        }
    },
    tickRate: (1000 / config.serverUpdateRate),
    tickSpeed: 0,
    lastTick: performance.now()
};
let modConsole = [];

let dontSend = false;
let lastMoveDir = undefined;
let lastsp = ["cc", 1, "__proto__"];

WebSocket.prototype.nsend = WebSocket.prototype.send;
WebSocket.prototype.send = function(message) {
    if (!WS) {
        WS = this;
        WS.addEventListener("message", function(msg) {
            getMessage(msg);
        });
        WS.addEventListener("close", (event) => {
            if (event.code == 4001) {
                window.location.reload();
            }
        });
    }
    if (WS == this) {
        dontSend = false;

        let data = new Uint8Array(message);
        let parsed = window.msgpack.decode(data);
        let type = parsed[0];
        data = parsed[1];

        if (type == "6") {

            if (data[0]) {
                let profanity = ["cunt", "whore", "fuck", "shit", "faggot", "nigger", "nigga", "dick", "vagina", "minge", "cock", "rape", "cum", "sex", "tits", "penis", "clit", "pussy", "meatcurtain", "jizz", "prune", "douche", "wanker", "damn", "bitch", "dick", "fag", "bastard", ];
                let tmpString;
                profanity.forEach((profany) => {
                    if (data[0].indexOf(profany) > -1) {
                        tmpString = "";
                        for (let i = 0; i < profany.length; ++i) {
                            if (i == 1) {
                                tmpString += String.fromCharCode(0);
                            }
                            tmpString += profany[i];
                        }
                        let re = new RegExp(profany, "g");
                        data[0] = data[0].replace(re, tmpString);
                    }
                });

                data[0] = data[0].slice(0, 30);
            }

        } else if (type == "L") {
            data[0] = data[0] + (String.fromCharCode(0).repeat(7));
            data[0] = data[0].slice(0, 7);
        } else if (type == "M") {
            data[0].name = data[0].name == "" ? "unknown" : "" + data[0].name;
            data[0].moofoll = true;
            data[0].skin = data[0].skin == 10 ? "__proto__" : data[0].skin;
            lastsp = [data[0].name, data[0].moofoll, data[0].skin];
        } else if (type == "D") {
            if ((HANS.lastDir == data[0]) || [null, undefined].includes(data[0])) {
                dontSend = true;
            } else {
                HANS.lastDir = data[0];
            }
        } else if (type == "d") {
            if (!data[2]) {
                dontSend = true;
            } else {
                if (![null, undefined].includes(data[1])) {
                    HANS.lastDir = data[1];
                }
            }
        } else if (type == "K") {
            if (!data[1]) {
                dontSend = true;
            }
        } else if (type == "S") {
            instaC.wait = !instaC.wait;
            dontSend = true;
        } else if (type == "f") {
            if (data[1]) {
                if (player.moveDir == data[0]) {
                    dontSend = true;
                }
                player.moveDir = data[0];
            } else {
                dontSend = true;
            }
        }
        if (!dontSend) {
            let binary = window.msgpack.encode([type, data]);
            this.nsend(binary);

            if (!firstSend.sec) {
                firstSend.sec = true;
                setTimeout(() => {
                    firstSend.sec = false;
                    packetEngine = 0;
                }, secTime);
            }

            packetEngine++;
        }
    } else {
        this.nsend(message);
    }
}

function packet(type) {
    let data = Array.prototype.slice.call(arguments, 1);
    let binary = window.msgpack.encode([type, data]);
    WS.send(binary);
}


let io = {
    send: packet
};

function getMessage(message) {
    let data = new Uint8Array(message.data);
    let parsed = window.msgpack.decode(data);
    let type = parsed[0];
    data = parsed[1];
    let events = {
        A: setInitData,
        C: setupGame,
        D: addPlayer,
        E: removePlayer,
        a: updatePlayers,
        G: updateLeaderboard,
        H: loadGameObject,
        I: loadAI,
        J: animateAI,
        K: gatherAnimation,
        L: wiggleGameObject,
        M: shootTurret,
        N: updatePlayerValue,
        O: updateHealth,
        P: killPlayer,
        Q: killObject,
        R: killObjects,
        S: updateItemCounts,
        T: updateAge,
        U: updateUpgrades,
        V: updateItems,
        X: addProjectile,
        3: setPlayerTeam,
        4: setAlliancePlayers,
        5: updateStoreItems,
        6: receiveChat,
        7: updateMinimap,
        8: showText,
        9: pingMap,
        0: pingSocketResponse,
    };
    if (type == "io-init") {
        socketID = data[0];
    } else {
        if (events[type]) {
            events[type].apply(undefined, data);
        }
    }
}

Math.lerpAngle = function(value1, value2, amount) {
    let difference = Math.abs(value2 - value1);
    if (difference > Math.PI) {
        if (value1 > value2) {
            value2 += Math.PI * 2;
        } else {
            value1 += Math.PI * 2;
        }
    }
    let value = value2 + ((value1 - value2) * amount);
    if (value >= 0 && value <= Math.PI * 2) return value;
    return value % (Math.PI * 2);
};

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    if (r < 0)
        r = 0;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};

function resetMoveDir() {
    keys = {};
    io.send("e");
}

let allChats = [];
let ticks = {
    tick: 0,
    delay: 0,
    time: [],
    manage: [],
};
let ais = [];
let players = [];
let alliances = [];
let alliancePlayers = [];
let gameObjects = [];
let lstOfObjects = [];
let projectiles = [];
let deadPlayers = [];

let breakObjects = [];

let player;
let playerSID;
let tmpObj;

let enemy = [];
let nears = [];
let near = [];

let HANS = {
    reloaded: false,
    waitHit: 0,
    autoAim: false,
    revAim: false,
    ageInsta: true,
    reSync: false,
    bullTick: 0,
    anti0Tick: 0,
    antiSync: false,
    safeVariant: function(tmpObj) {
        return tmpObj.primaryIndex == 3 && tmpObj.primaryVariant < 2;
    },
    safePrimary: function(tmpObj) {
        return [0, 8].includes(tmpObj.primaryIndex);
    },
    safeSecondary: function(tmpObj) {
        return [10, 11, 14].includes(tmpObj.secondaryIndex);
    },
    lastDir: 0,
    autoPush: false,
    pushData: {}
}

function findID(tmpObj, tmp) {
    return tmpObj.find((THIS) => THIS.id == tmp);
}

function findSID(tmpObj, tmp) {
    return tmpObj.find((THIS) => THIS.sid == tmp);
}

function findPlayerByID(id) {
    return findID(players, id);
}

function findPlayerBySID(sid) {
    return findSID(players, sid);
}

function findAIBySID(sid) {
    return findSID(ais, sid);
}

function findObjectBySid(sid) {
    return findSID(gameObjects, sid);
}

function findProjectileBySid(sid) {
    return findSID(gameObjects, sid);
}

let adCard = verify("adCard");
adCard.remove();
let promoImageHolder = verify("promoImgHolder");
promoImageHolder.remove();

let chatButton = verify("chatButton");
chatButton.remove();
let gameCanvas = verify("gameCanvas");
let mainContext = gameCanvas.getContext("2d");
let mapDisplay = verify("mapDisplay");
let mapContext = mapDisplay.getContext("2d");
mapDisplay.width = 300;
mapDisplay.height = 300;
let storeMenu = verify("storeMenu");
let storeHolder = verify("storeHolder");
let upgradeHolder = verify("upgradeHolder");
let upgradeCounter = verify("upgradeCounter");
let chatBox = verify("chatBox");
chatBox.autocomplete = "off";
chatBox.style.textAlign = "center";
chatBox.style.width = "18em";
let chatHolder = verify("chatHolder");
let actionBar = verify("actionBar");
let leaderboardData = verify("leaderboardData");
let itemInfoHolder = verify("itemInfoHolder");
let menuCardHolder = verify("menuCardHolder");
let mainMenu = verify("mainMenu");
let diedText = verify("diedText");
let screenWidth;
let screenHeight;
let maxScreenWidth = config.maxScreenWidth;
let maxScreenHeight = config.maxScreenHeight;
let pixelDensity = 1;
let delta;
let now;
let lastUpdate = performance.now();
let camX;
let camY;
let tmpDir;
let mouseX = 0;
let mouseY = 0;
let allianceMenu = verify("allianceMenu");
let waterMult = 1;
let waterPlus = 0;
let outlineColor = "#525252";
let darkOutlineColor = "#3d3f42";
let outlineWidth = 5.5;

let firstSetup = true;
let keys = {};
let moveKeys = {
    87: [0, -1],
    38: [0, -1],
    83: [0, 1],
    40: [0, 1],
    65: [-1, 0],
    37: [-1, 0],
    68: [1, 0],
    39: [1, 0],
};

let attackState = 0;
let inGame = false;

let macro = {};
let mills = {
    place: 0,
    placeSpawnPads: 0
};
let lastDir;

let lastLeaderboardData = [];

let inWindow = true;
window.onblur = function() {
    inWindow = false;
};
window.onfocus = function() {
    inWindow = true;
};
let ms = {
    avg: 0,
    max: 0,
    min: 0,
    delay: 0
}
function pingSocketResponse() {
    let pingTime = window.pingTime;
    const pingDisplay = document.getElementById("pingDisplay")
    pingDisplay.innerText = "© H._.ns | " + pingTime + "ms";

    if (pingTime > ms.max || isNaN(ms.max)) {
        ms.max = pingTime;
    }
    if (pingTime < ms.min || isNaN(ms.min)) {
        ms.min = pingTime;
    }
}

let placeVisible = [];


class Utils {
    constructor() {

        let mathABS = Math.abs,
            mathCOS = Math.cos,
            mathSIN = Math.sin,
            mathPOW = Math.pow,
            mathSQRT = Math.sqrt,
            mathATAN2 = Math.atan2,
            mathPI = Math.PI;

        let _this = this;

        this.round = function(n, v) {
            return Math.round(n * v) / v;
        };
        this.toRad = function(angle) {
            return angle * (mathPI / 180);
        };
        this.toAng = function(radian) {
            return radian / (mathPI / 180);
        };
        this.randInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        this.randFloat = function(min, max) {
            return Math.random() * (max - min + 1) + min;
        };
        this.lerp = function(value1, value2, amount) {
            return value1 + (value2 - value1) * amount;
        };
        this.decel = function(val, cel) {
            if (val > 0)
                val = Math.max(0, val - cel);
            else if (val < 0)
                val = Math.min(0, val + cel);
            return val;
        };
        this.getDistance = function(x1, y1, x2, y2) {
            let dx = x2 - x1;
            let dy = y2 - y1;
            return mathSQRT(dx * dx + dy * dy);
        };

        this.getDist = function(tmp1, tmp2, type1, type2) {
            let tmpXY1 = {
                x: type1 == 0 ? tmp1.x : type1 == 1 ? tmp1.x1 : type1 == 2 ? tmp1.x2 : type1 == 3 && tmp1.x3,
                y: type1 == 0 ? tmp1.y : type1 == 1 ? tmp1.y1 : type1 == 2 ? tmp1.y2 : type1 == 3 && tmp1.y3,
            };
            let tmpXY2 = {
                x: type2 == 0 ? tmp2.x : type2 == 1 ? tmp2.x1 : type2 == 2 ? tmp2.x2 : type2 == 3 && tmp2.x3,
                y: type2 == 0 ? tmp2.y : type2 == 1 ? tmp2.y1 : type2 == 2 ? tmp2.y2 : type2 == 3 && tmp2.y3,
            };

            let dx = tmpXY2.x - tmpXY1.x;
            let dy = tmpXY2.y - tmpXY1.y;

            return mathSQRT(dx * dx + dy * dy);
        };
        this.getDirection = function(x1, y1, x2, y2) {
            return mathATAN2(y1 - y2, x1 - x2);
        };
        this.getDirect = function(tmp1, tmp2, type1, type2) {
            let tmpXY1 = {
                x: type1 == 0 ? tmp1.x : type1 == 1 ? tmp1.x1 : type1 == 2 ? tmp1.x2 : type1 == 3 && tmp1.x3,
                y: type1 == 0 ? tmp1.y : type1 == 1 ? tmp1.y1 : type1 == 2 ? tmp1.y2 : type1 == 3 && tmp1.y3,
            };
            let tmpXY2 = {
                x: type2 == 0 ? tmp2.x : type2 == 1 ? tmp2.x1 : type2 == 2 ? tmp2.x2 : type2 == 3 && tmp2.x3,
                y: type2 == 0 ? tmp2.y : type2 == 1 ? tmp2.y1 : type2 == 2 ? tmp2.y2 : type2 == 3 && tmp2.y3,
            };
            return mathATAN2(tmpXY1.y - tmpXY2.y, tmpXY1.x - tmpXY2.x);
        };
        this.getAngleDist = function(a, b) {
            let p = mathABS(b - a) % (mathPI * 2);
            return (p > mathPI ? (mathPI * 2) - p : p);
        };
        this.isNumber = function(n) {
            return (typeof n == "number" && !isNaN(n) && isFinite(n));
        };
        this.isString = function(s) {
            return (s && typeof s == "string");
        };
        this.kFormat = function(num) {
            return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
        };
        this.sFormat = function(num) {
            let fixs = [{
                num: 1e3,
                string: "k"
            },
                        {
                            num: 1e6,
                            string: "m"
                        },
                        {
                            num: 1e9,
                            string: "b"
                        },
                        {
                            num: 1e12,
                            string: "q"
                        }
                       ].reverse();
            let sp = fixs.find(v => num >= v.num);
            if (!sp) return num;
            return (num / sp.num).toFixed(1) + sp.string;
        };
        this.capitalizeFirst = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        this.fixTo = function(n, v) {
            return parseFloat(n.toFixed(v));
        };
        this.sortByPoints = function(a, b) {
            return parseFloat(b.points) - parseFloat(a.points);
        };
        this.lineInRect = function(recX, recY, recX2, recY2, x1, y1, x2, y2) {
            let minX = x1;
            let maxX = x2;
            if (x1 > x2) {
                minX = x2;
                maxX = x1;
            }
            if (maxX > recX2)
                maxX = recX2;
            if (minX < recX)
                minX = recX;
            if (minX > maxX)
                return false;
            let minY = y1;
            let maxY = y2;
            let dx = x2 - x1;
            if (Math.abs(dx) > 0.0000001) {
                let a = (y2 - y1) / dx;
                let b = y1 - a * x1;
                minY = a * minX + b;
                maxY = a * maxX + b;
            }
            if (minY > maxY) {
                let tmp = maxY;
                maxY = minY;
                minY = tmp;
            }
            if (maxY > recY2)
                maxY = recY2;
            if (minY < recY)
                minY = recY;
            if (minY > maxY)
                return false;
            return true;
        };
        this.containsPoint = function(element, x, y) {
            let bounds = element.getBoundingClientRect();
            let left = bounds.left + window.scrollX;
            let top = bounds.top + window.scrollY;
            let width = bounds.width;
            let height = bounds.height;

            let insideHorizontal = x > left && x < left + width;
            let insideVertical = y > top && y < top + height;
            return insideHorizontal && insideVertical;
        };
        this.mousifyTouchEvent = function(event) {
            let touch = event.changedTouches[0];
            event.screenX = touch.screenX;
            event.screenY = touch.screenY;
            event.clientX = touch.clientX;
            event.clientY = touch.clientY;
            event.pageX = touch.pageX;
            event.pageY = touch.pageY;
        };
        this.hookTouchEvents = function(element, skipPrevent) {
            let preventDefault = !skipPrevent;
            let isHovering = false;
            let passive = false;
            element.addEventListener("touchstart", this.checkTrusted(touchStart), passive);
            element.addEventListener("touchmove", this.checkTrusted(touchMove), passive);
            element.addEventListener("touchend", this.checkTrusted(touchEnd), passive);
            element.addEventListener("touchcancel", this.checkTrusted(touchEnd), passive);
            element.addEventListener("touchleave", this.checkTrusted(touchEnd), passive);

            function touchStart(e) {
                _this.mousifyTouchEvent(e);
                window.setUsingTouch(true);
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (element.onmouseover)
                    element.onmouseover(e);
                isHovering = true;
            }

            function touchMove(e) {
                _this.mousifyTouchEvent(e);
                window.setUsingTouch(true);
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (_this.containsPoint(element, e.pageX, e.pageY)) {
                    if (!isHovering) {
                        if (element.onmouseover)
                            element.onmouseover(e);
                        isHovering = true;
                    }
                } else {
                    if (isHovering) {
                        if (element.onmouseout)
                            element.onmouseout(e);
                        isHovering = false;
                    }
                }
            }

            function touchEnd(e) {
                _this.mousifyTouchEvent(e);
                window.setUsingTouch(true);
                if (preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (isHovering) {
                    if (element.onclick)
                        element.onclick(e);
                    if (element.onmouseout)
                        element.onmouseout(e);
                    isHovering = false;
                }
            }
        };
        this.removeAllChildren = function(element) {
            while (element.hasChildNodes()) {
                element.removeChild(element.lastChild);
            }
        };
        this.generateElement = function(config) {
            let element = document.createElement(config.tag || "div");

            function bind(configValue, elementValue) {
                if (config[configValue])
                    element[elementValue] = config[configValue];
            }
            bind("text", "textContent");
            bind("html", "innerHTML");
            bind("class", "className");
            for (let key in config) {
                switch (key) {
                    case "tag":
                    case "text":
                    case "html":
                    case "class":
                    case "style":
                    case "hookTouch":
                    case "parent":
                    case "children":
                        continue;
                    default:
                        break;
                }
                element[key] = config[key];
            }
            if (element.onclick)
                element.onclick = this.checkTrusted(element.onclick);
            if (element.onmouseover)
                element.onmouseover = this.checkTrusted(element.onmouseover);
            if (element.onmouseout)
                element.onmouseout = this.checkTrusted(element.onmouseout);
            if (config.style) {
                element.style.cssText = config.style;
            }
            if (config.hookTouch) {
                this.hookTouchEvents(element);
            }
            if (config.parent) {
                config.parent.appendChild(element);
            }
            if (config.children) {
                for (let i = 0; i < config.children.length; i++) {
                    element.appendChild(config.children[i]);
                }
            }
            return element;
        };
        this.checkTrusted = function(callback) {
            return function(ev) {
                if (ev && ev instanceof Event && (ev && typeof ev.isTrusted == "boolean" ? ev.isTrusted : true)) {
                    callback(ev);
                }
            };
        };
        this.randomString = function(length) {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        this.countInArray = function(array, val) {
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === val) count++;
            }
            return count;
        };
        this.hexToRgb = function(hex) {
            return hex.slice(1).match(/.{1,2}/g).map(g => parseInt(g, 16));
        };
        this.getRgb = function(r, g, b) {
            return [r / 255, g / 255, b / 255].join(", ");
        };
    }
};
class Animtext {
    constructor() {
        this.init = function (x, y, scale, speed, life, text, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.scale = scale;
            this.startScale = this.scale;
            this.maxScale = scale * 1.5;
            this.scaleSpeed = 0.7;
            this.speed = speed;
            this.life = life;
            this.text = text;
            this.acc = 1;
            this.alpha = 0;
            this.maxLife = life;
            this.ranX = UTILS.randFloat(-1, 1);
        };

        this.update = function (delta) {
            if (this.life > 0) {
                this.life -= delta;
                this.y -= this.speed * delta;
                if (this.life <= 200) {
                    if (this.alpha > 0) {
                        this.alpha = Math.max(0, this.alpha - (delta / 300));
                    }
                } else {
                    if (this.alpha < 1) {
                        this.alpha = Math.min(1, this.alpha + (delta / 100));
                    }
                }
                if (this.life <= 0) {
                    this.life = 0;
                }
            }
        };

        this.render = function (ctxt, xOff, yOff, value) {
            ctxt.lineWidth = 5;
            ctxt.fillStyle = this.color;
            ctxt.strokeStyle = "#3d3f42";
            ctxt.font = this.scale + "px Hammersmith One";
            ctxt.textAlign = "center";
            ctxt.textBaseline = "middle";

            ctxt.globalAlpha = this.alpha;

            ctxt.strokeText(this.text, this.x - xOff, this.y - yOff);
            ctxt.fillText(this.text, this.x - xOff, this.y - yOff);

            ctxt.globalAlpha = 1;
        };
    }
}
class Textmanager {
    constructor() {
        this.texts = [];
        this.stack = [];

        this.update = function(delta, ctxt, xOff, yOff) {
            ctxt.textBaseline = "middle";
            ctxt.textAlign = "center";
            for (let i = 0; i < this.texts.length; ++i) {
                if (this.texts[i].life) {
                    this.texts[i].update(delta);
                    this.texts[i].render(ctxt, xOff, yOff);
                }
            }
        };

        this.showText = function(x, y, scale, speed, life, text, color) {
            let tmpText;
            for (let i = 0; i < this.texts.length; ++i) {
                if (!this.texts[i].life) {
                    tmpText = this.texts[i];
                    break;
                }
            }
            if (!tmpText) {
                tmpText = new Animtext();
                this.texts.push(tmpText);
            }
            tmpText.init(x, y, scale, speed, life, text, color);
        };
    }
}

class GameObject {
    constructor(sid) {
        this.sid = sid;

        this.init = function(x, y, dir, scale, type, data, owner) {
            data = data || {};
            this.sentTo = {};
            this.gridLocations = [];
            this.active = true;
            this.render = true;
            this.doUpdate = data.doUpdate;
            this.x = x;
            this.y = y;
            this.dir = dir;
            this.lastDir = dir;
            this.xWiggle = 0;
            this.yWiggle = 0;
            this.visScale = scale;
            this.scale = scale;
            this.type = type;
            this.id = data.id;
            this.owner = owner;
            this.name = data.name;
            this.isItem = (this.id != undefined);
            this.group = data.group;
            this.maxHealth = data.health;
            this.health = this.maxHealth;
            this.layer = 2;
            if (this.group != undefined) {
                this.layer = this.group.layer;
            } else if (this.type == 0) {
                this.layer = 3;
            } else if (this.type == 2) {
                this.layer = 0;
            } else if (this.type == 4) {
                this.layer = -1;
            }
            this.colDiv = data.colDiv || 1;
            this.blocker = data.blocker;
            this.ignoreCollision = data.ignoreCollision;
            this.dontGather = data.dontGather;
            this.hideFromEnemy = data.hideFromEnemy;
            this.friction = data.friction;
            this.projDmg = data.projDmg;
            this.dmg = data.dmg;
            this.pDmg = data.pDmg;
            this.pps = data.pps;
            this.zIndex = data.zIndex || 0;
            this.turnSpeed = data.turnSpeed;
            this.req = data.req;
            this.trap = data.trap;
            this.healCol = data.healCol;
            this.teleport = data.teleport;
            this.boostSpeed = data.boostSpeed;
            this.projectile = data.projectile;
            this.shootRange = data.shootRange;
            this.shootRate = data.shootRate;
            this.shootCount = this.shootRate;
            this.spawnPoint = data.spawnPoint;
            this.onNear = 0;
            this.breakObj = false;
            this.alpha = data.alpha || 1;
            this.maxAlpha = data.alpha || 1;
            this.damaged = 0;
        };

        this.changeHealth = function(amount, doer) {
            this.health += amount;
            return (this.health <= 0);
        };

        this.getScale = function(sM, ig) {
            sM = sM || 1;
            return this.scale * ((this.isItem || this.type == 2 || this.type == 3 || this.type == 4) ?
                                 1 : (0.6 * sM)) * (ig ? 1 : this.colDiv);
        };

        this.visibleToPlayer = function(player) {
            return !(this.hideFromEnemy) || (this.owner && (this.owner == player ||
                                                            (this.owner.team && player.team == this.owner.team)));
        };

        this.update = function(delta) {
            if (this.active) {
                if (this.xWiggle) {
                    this.xWiggle *= Math.pow(0.99, delta);
                }
                if (this.yWiggle) {
                    this.yWiggle *= Math.pow(0.99, delta);
                }
                let d2 = UTILS.getAngleDist(this.lastDir, this.dir);
                if (d2 > 0.01) {
                    this.dir += d2 / 5;
                } else {
                    this.dir = this.lastDir;
                }
            } else {
                if (this.alive) {
                    this.alpha -= delta / (200 / this.maxAlpha);
                    this.visScale += delta / (this.scale / 2.5);
                    if (this.alpha <= 0) {
                        this.alpha = 0;
                        this.alive = false;
                    }
                }
            }
        };

        this.isTeamObject = function(tmpObj) {
            return this.owner == null ? true : (this.owner && tmpObj.sid == this.owner.sid || tmpObj.findAllianceBySid(this.owner.sid));
        };
    }
}
class Items {
    constructor() {
        this.groups = [{
            id: 0,
            name: "food",
            layer: 0
        }, {
            id: 1,
            name: "walls",
            place: true,
            limit: 30,
            layer: 0
        }, {
            id: 2,
            name: "spikes",
            place: true,
            limit: 15,
            layer: 0
        }, {
            id: 3,
            name: "mill",
            place: true,
            limit: 7,
            layer: 1
        }, {
            id: 4,
            name: "mine",
            place: true,
            limit: 1,
            layer: 0
        }, {
            id: 5,
            name: "trap",
            place: true,
            limit: 6,
            layer: -1
        }, {
            id: 6,
            name: "booster",
            place: true,
            limit: 12,
            layer: -1
        }, {
            id: 7,
            name: "turret",
            place: true,
            limit: 2,
            layer: 1
        }, {
            id: 8,
            name: "watchtower",
            place: true,
            limit: 12,
            layer: 1
        }, {
            id: 9,
            name: "buff",
            place: true,
            limit: 4,
            layer: -1
        }, {
            id: 10,
            name: "spawn",
            place: true,
            limit: 1,
            layer: -1
        }, {
            id: 11,
            name: "sapling",
            place: true,
            limit: 2,
            layer: 0
        }, {
            id: 12,
            name: "blocker",
            place: true,
            limit: 3,
            layer: -1
        }, {
            id: 13,
            name: "teleporter",
            place: true,
            limit: 2,
            layer: -1
        }];

        this.projectiles = [{
            indx: 0,
            layer: 0,
            src: "arrow_1",
            dmg: 25,
            speed: 1.6,
            scale: 103,
            range: 1000
        }, {
            indx: 1,
            layer: 1,
            dmg: 25,
            scale: 20
        }, {
            indx: 0,
            layer: 0,
            src: "arrow_1",
            dmg: 35,
            speed: 2.5,
            scale: 103,
            range: 1200
        }, {
            indx: 0,
            layer: 0,
            src: "arrow_1",
            dmg: 30,
            speed: 2,
            scale: 103,
            range: 1200
        }, {
            indx: 1,
            layer: 1,
            dmg: 16,
            scale: 20
        }, {
            indx: 0,
            layer: 0,
            src: "bullet_1",
            dmg: 50,
            speed: 3.6,
            scale: 160,
            range: 1400
        }];

        this.weapons = [{
            id: 0,
            type: 0,
            name: "tool hammer",
            desc: "tool for gathering all resources",
            src: "hammer_1",
            length: 140,
            width: 140,
            xOff: -3,
            yOff: 18,
            dmg: 25,
            range: 65,
            gather: 1,
            speed: 300
        }, {
            id: 1,
            type: 0,
            age: 2,
            name: "hand axe",
            desc: "gathers resources at a higher rate",
            src: "axe_1",
            length: 140,
            width: 140,
            xOff: 3,
            yOff: 24,
            dmg: 30,
            spdMult: 1,
            range: 70,
            gather: 2,
            speed: 400
        }, {
            id: 2,
            type: 0,
            age: 8,
            pre: 1,
            name: "great axe",
            desc: "deal more damage and gather more resources",
            src: "great_axe_1",
            length: 140,
            width: 140,
            xOff: -8,
            yOff: 25,
            dmg: 35,
            spdMult: 1,
            range: 75,
            gather: 4,
            speed: 400
        }, {
            id: 3,
            type: 0,
            age: 2,
            name: "short sword",
            desc: "increased attack power but slower move speed",
            src: "sword_1",
            iPad: 1.3,
            length: 130,
            width: 210,
            xOff: -8,
            yOff: 46,
            dmg: 35,
            spdMult: 0.85,
            range: 110,
            gather: 1,
            speed: 300
        }, {
            id: 4,
            type: 0,
            age: 8,
            pre: 3,
            name: "katana",
            desc: "greater range and damage",
            src: "samurai_1",
            iPad: 1.3,
            length: 130,
            width: 210,
            xOff: -8,
            yOff: 59,
            dmg: 40,
            spdMult: 0.8,
            range: 118,
            gather: 1,
            speed: 300
        }, {
            id: 5,
            type: 0,
            age: 2,
            name: "polearm",
            desc: "long range melee weapon",
            src: "spear_1",
            iPad: 1.3,
            length: 130,
            width: 210,
            xOff: -8,
            yOff: 53,
            dmg: 45,
            knock: 0.2,
            spdMult: 0.82,
            range: 142,
            gather: 1,
            speed: 700
        }, {
            id: 6,
            type: 0,
            age: 2,
            name: "bat",
            desc: "fast long range melee weapon",
            src: "bat_1",
            iPad: 1.3,
            length: 110,
            width: 180,
            xOff: -8,
            yOff: 53,
            dmg: 20,
            knock: 0.7,
            range: 110,
            gather: 1,
            speed: 300
        }, {
            id: 7,
            type: 0,
            age: 2,
            name: "daggers",
            desc: "really fast short range weapon",
            src: "dagger_1",
            iPad: 0.8,
            length: 110,
            width: 110,
            xOff: 18,
            yOff: 0,
            dmg: 20,
            knock: 0.1,
            range: 65,
            gather: 1,
            hitSlow: 0.1,
            spdMult: 1.13,
            speed: 100
        }, {
            id: 8,
            type: 0,
            age: 2,
            name: "stick",
            desc: "great for gathering but very weak",
            src: "stick_1",
            length: 140,
            width: 140,
            xOff: 3,
            yOff: 24,
            dmg: 1,
            spdMult: 1,
            range: 70,
            gather: 7,
            speed: 400
        }, {
            id: 9,
            type: 1,
            age: 6,
            name: "hunting bow",
            desc: "bow used for ranged combat and hunting",
            src: "bow_1",
            req: ["wood", 4],
            length: 120,
            width: 120,
            xOff: -6,
            yOff: 0,
            Pdmg: 25,
            projectile: 0,
            spdMult: 0.75,
            speed: 600
        }, {
            id: 10,
            type: 1,
            age: 6,
            name: "great hammer",
            desc: "hammer used for destroying structures",
            src: "great_hammer_1",
            length: 140,
            width: 140,
            xOff: -9,
            yOff: 25,
            dmg: 10,
            Pdmg: 10,
            spdMult: 0.88,
            range: 75,
            sDmg: 7.5,
            gather: 1,
            speed: 400
        }, {
            id: 11,
            type: 1,
            age: 6,
            name: "wooden shield",
            desc: "blocks projectiles and reduces melee damage",
            src: "shield_1",
            length: 120,
            width: 120,
            shield: 0.2,
            xOff: 6,
            yOff: 0,
            Pdmg: 0,
            spdMult: 0.7
        }, {
            id: 12,
            type: 1,
            age: 8,
            pre: 9,
            name: "crossbow",
            desc: "deals more damage and has greater range",
            src: "crossbow_1",
            req: ["wood", 5],
            aboveHand: true,
            armS: 0.75,
            length: 120,
            width: 120,
            xOff: -4,
            yOff: 0,
            Pdmg: 35,
            projectile: 2,
            spdMult: 0.7,
            speed: 700
        }, {
            id: 13,
            type: 1,
            age: 9,
            pre: 12,
            name: "repeater crossbow",
            desc: "high firerate crossbow with reduced damage",
            src: "crossbow_2",
            req: ["wood", 10],
            aboveHand: true,
            armS: 0.75,
            length: 120,
            width: 120,
            xOff: -4,
            yOff: 0,
            Pdmg: 30,
            projectile: 3,
            spdMult: 0.7,
            speed: 230
        }, {
            id: 14,
            type: 1,
            age: 6,
            name: "mc grabby",
            desc: "steals resources from enemies",
            src: "grab_1",
            length: 130,
            width: 210,
            xOff: -8,
            yOff: 53,
            dmg: 0,
            Pdmg: 0,
            steal: 250,
            knock: 0.2,
            spdMult: 1.05,
            range: 125,
            gather: 0,
            speed: 700
        }, {
            id: 15,
            type: 1,
            age: 9,
            pre: 12,
            name: "musket",
            desc: "slow firerate but high damage and range",
            src: "musket_1",
            req: ["stone", 10],
            aboveHand: true,
            rec: 0.35,
            armS: 0.6,
            hndS: 0.3,
            hndD: 1.6,
            length: 205,
            width: 205,
            xOff: 25,
            yOff: 0,
            Pdmg: 50,
            projectile: 5,
            hideProjectile: true,
            spdMult: 0.6,
            speed: 1500
        }];

        this.list = [{
            group: this.groups[0],
            name: "apple",
            desc: "restores 20 health when consumed",
            req: ["food", 10],
            consume: function(doer) {
                return doer.changeHealth(20, doer);
            },
            scale: 22,
            holdOffset: 15,
            healing: 20,
            itemID: 0,
            itemAID: 16,
        }, {
            age: 3,
            group: this.groups[0],
            name: "cookie",
            desc: "restores 40 health when consumed",
            req: ["food", 15],
            consume: function(doer) {
                return doer.changeHealth(40, doer);
            },
            scale: 27,
            holdOffset: 15,
            healing: 40,
            itemID: 1,
            itemAID: 17,
        }, {
            age: 7,
            group: this.groups[0],
            name: "cheese",
            desc: "restores 30 health and another 50 over 5 seconds",
            req: ["food", 25],
            consume: function(doer) {
                if (doer.changeHealth(30, doer) || doer.health < 100) {
                    doer.dmgOverTime.dmg = -10;
                    doer.dmgOverTime.doer = doer;
                    doer.dmgOverTime.time = 5;
                    return true;
                }
                return false;
            },
            scale: 27,
            holdOffset: 15,
            healing: 30,
            itemID: 2,
            itemAID: 18,
        }, {
            group: this.groups[1],
            name: "wood wall",
            desc: "provides protection for your village",
            req: ["wood", 10],
            projDmg: true,
            health: 380,
            scale: 50,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 3,
            itemAID: 19,
        }, {
            age: 3,
            group: this.groups[1],
            name: "stone wall",
            desc: "provides improved protection for your village",
            req: ["stone", 25],
            health: 900,
            scale: 50,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 4,
            itemAID: 20,
        }, {
            age: 7,
            group: this.groups[1],
            name: "castle wall",
            desc: "provides powerful protection for your village",
            req: ["stone", 35],
            health: 1500,
            scale: 52,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 5,
            itemAID: 21,
        }, {
            group: this.groups[2],
            name: "spikes",
            desc: "damages enemies when they touch them",
            req: ["wood", 20, "stone", 5],
            health: 400,
            dmg: 20,
            scale: 49,
            spritePadding: -23,
            holdOffset: 8,
            placeOffset: -5,
            itemID: 6,
            itemAID: 22,
            shadow: {
                offsetX: 5,
                offsetY: 5,
                color: "rgba()"
            }

        }, {
            age: 5,
            group: this.groups[2],
            name: "greater spikes",
            desc: "damages enemies when they touch them",
            req: ["wood", 30, "stone", 10],
            health: 500,
            dmg: 35,
            scale: 52,
            spritePadding: -23,
            holdOffset: 8,
            placeOffset: -5,
            itemID: 7,
            itemAID: 23,
        }, {
            age: 9,
            group: this.groups[2],
            name: "poison spikes",
            desc: "poisons enemies when they touch them",
            req: ["wood", 35, "stone", 15],
            health: 600,
            dmg: 30,
            pDmg: 5,
            scale: 52,
            spritePadding: -23,
            holdOffset: 8,
            placeOffset: -5,
            itemID: 8,
            itemAID: 24,
        }, {
            age: 9,
            group: this.groups[2],
            name: "spinning spikes",
            desc: "damages enemies when they touch them",
            req: ["wood", 30, "stone", 20],
            health: 500,
            dmg: 45,
            turnSpeed: 0.1,
            scale: 52,
            spritePadding: -23,
            holdOffset: 8,
            placeOffset: -5,
            itemID: 9,
            itemAID: 25,
        }, {
            group: this.groups[3],
            name: "windmill",
            desc: "generates gold over time",
            req: ["wood", 50, "stone", 10],
            health: 400,
            pps: 1,
            turnSpeed: 0.1,
            spritePadding: 25,
            iconLineMult: 12,
            scale: 45,
            holdOffset: 20,
            placeOffset: 5,
            itemID: 10,
            itemAID: 26,
        }, {
            age: 5,
            group: this.groups[3],
            name: "faster windmill",
            desc: "generates more gold over time",
            req: ["wood", 60, "stone", 20],
            health: 500,
            pps: 1.5,
            turnSpeed: 0.0025,
            spritePadding: 25,
            iconLineMult: 12,
            scale: 47,
            holdOffset: 20,
            placeOffset: 5,
            itemID: 11,
            itemAID: 27,
        }, {
            age: 8,
            group: this.groups[3],
            name: "power mill",
            desc: "generates more gold over time",
            req: ["wood", 100, "stone", 50],
            health: 800,
            pps: 2,
            turnSpeed: 0.005,
            spritePadding: 25,
            iconLineMult: 12,
            scale: 47,
            holdOffset: 20,
            placeOffset: 5,
            itemID: 12,
            itemAID: 28,
        }, {
            age: 5,
            group: this.groups[4],
            type: 2,
            name: "mine",
            desc: "allows you to mine stone",
            req: ["wood", 20, "stone", 100],
            iconLineMult: 12,
            scale: 65,
            holdOffset: 20,
            placeOffset: 0,
            itemID: 13,
            itemAID: 29,
        }, {
            age: 5,
            group: this.groups[11],
            type: 0,
            name: "sapling",
            desc: "allows you to farm wood",
            req: ["wood", 150],
            iconLineMult: 12,
            colDiv: 0.5,
            scale: 110,
            holdOffset: 50,
            placeOffset: -15,
            itemID: 14,
            itemAID: 30,
        }, {
            age: 4,
            group: this.groups[5],
            name: "pit trap",
            desc: "pit that traps enemies if they walk over it",
            req: ["wood", 30, "stone", 30],
            trap: true,
            ignoreCollision: true,
            hideFromEnemy: true,
            health: 500,
            colDiv: 0.2,
            scale: 50,
            holdOffset: 20,
            placeOffset: -5,
            alpha: 0.6,
            itemID: 15,
            itemAID: 31,
        }, {
            age: 4,
            group: this.groups[6],
            name: "boost pad",
            desc: "provides boost when stepped on",
            req: ["stone", 20, "wood", 5],
            ignoreCollision: true,
            boostSpeed: 1.5,
            health: 150,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 16,
            itemAID: 32,
        }, {
            age: 7,
            group: this.groups[7],
            doUpdate: true,
            name: "turret",
            desc: "defensive structure that shoots at enemies",
            req: ["wood", 200, "stone", 150],
            health: 800,
            projectile: 1,
            shootRange: 700,
            shootRate: 2200,
            scale: 43,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 17,
            itemAID: 33,
        }, {
            age: 7,
            group: this.groups[8],
            name: "platform",
            desc: "platform to shoot over walls and cross over water",
            req: ["wood", 20],
            ignoreCollision: true,
            zIndex: 1,
            health: 300,
            scale: 43,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 18,
            itemAID: 34,
        }, {
            age: 7,
            group: this.groups[9],
            name: "healing pad",
            desc: "standing on it will slowly heal you",
            req: ["wood", 30, "food", 10],
            ignoreCollision: true,
            healCol: 15,
            health: 400,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 19,
            itemAID: 35,
        }, {
            age: 9,
            group: this.groups[10],
            name: "spawn pad",
            desc: "you will spawn here when you die but it will dissapear",
            req: ["wood", 100, "stone", 100],
            health: 400,
            ignoreCollision: true,
            spawnPoint: true,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 20,
            itemAID: 36,
        }, {
            age: 7,
            group: this.groups[12],
            name: "blocker",
            desc: "blocks building in radius",
            req: ["wood", 30, "stone", 25],
            ignoreCollision: true,
            blocker: 300,
            health: 400,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 21,
            itemAID: 37,
        }, {
            age: 7,
            group: this.groups[13],
            name: "teleporter",
            desc: "teleports you to a random point on the map",
            req: ["wood", 60, "stone", 60],
            ignoreCollision: true,
            teleport: true,
            health: 200,
            colDiv: 0.7,
            scale: 45,
            holdOffset: 20,
            placeOffset: -5,
            itemID: 22,
            itemAID: 38
        }];

        this.checkItem = {
            index: function(id, myItems) {
                return [0, 1, 2].includes(id) ? 0 : [3, 4, 5].includes(id) ? 1 : [6, 7, 8, 9].includes(id) ? 2 : [10, 11, 12].includes(id) ? 3 : [13, 14].includes(id) ? 5 : [15, 16].includes(id) ? 4 : [17, 18, 19, 21, 22].includes(id) ? [13, 14].includes(myItems) ? 6 :
                5 :
                id == 20 ? [13, 14].includes(myItems) ? 7 :
                6 :
                undefined;
            }
        }

        for (let i = 0; i < this.list.length; ++i) {
            this.list[i].id = i;
            if (this.list[i].pre) this.list[i].pre = i - this.list[i].pre;
        }

        if (typeof window !== "undefined") {
            function shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            }
        }
    }
}
class Objectmanager {
    constructor(GameObject, liztobj, UTILS, config, players, server) {
        let mathFloor = Math.floor,
            mathABS = Math.abs,
            mathCOS = Math.cos,
            mathSIN = Math.sin,
            mathPOW = Math.pow,
            mathSQRT = Math.sqrt;

        this.ignoreAdd = false;
        this.hitObj = [];

        this.disableObj = function(obj) {
            obj.active = false;
        };

        let tmpObj;
        this.add = function(sid, x, y, dir, s, type, data, setSID, owner) {
            tmpObj = findObjectBySid(sid);
            if (!tmpObj) {
                tmpObj = gameObjects.find((tmp) => !tmp.active);
                if (!tmpObj) {
                    tmpObj = new GameObject(sid);
                    gameObjects.push(tmpObj);
                }
            }
            if (setSID) {
                tmpObj.sid = sid;
            }
            tmpObj.init(x, y, dir, s, type, data, owner);
        };

        this.disableBySid = function(sid) {
            let find = findObjectBySid(sid);
            if (find) {
                this.disableObj(find);
            }
        };

        this.removeAllItems = function(sid, server) {
            gameObjects.filter((tmp) => tmp.active && tmp.owner && tmp.owner.sid == sid).forEach((tmp) => this.disableObj(tmp));
        };

        this.checkItemLocation = function(x, y, s, sM, indx, ignoreWater, placer) {
            let cantPlace = liztobj.find((tmp) => tmp.active && UTILS.getDistance(x, y, tmp.x, tmp.y) < s + (tmp.blocker ? tmp.blocker : tmp.getScale(sM, tmp.isItem)));
            if (cantPlace) return false;
            if (!ignoreWater && indx != 18 && y >= config.mapScale / 2 - config.riverWidth / 2 && y <= config.mapScale / 2 + config.riverWidth / 2) return false;
            return true;
        };

    }
}
class Projectile {
    constructor(players, ais, objectManager, items, config, UTILS, server) {

        this.init = function(indx, x, y, dir, spd, dmg, rng, scl, owner) {
            this.active = true;
            this.tickActive = true;
            this.indx = indx;
            this.x = x;
            this.y = y;
            this.x2 = x;
            this.y2 = y;
            this.dir = dir;
            this.skipMov = true;
            this.speed = spd;
            this.dmg = dmg;
            this.scale = scl;
            this.range = rng;
            this.r2 = rng;
            this.owner = owner;
        };

        this.update = function(delta) {
            if (this.active) {
                let tmpSpeed = this.speed * delta;
                if (!this.skipMov) {
                    this.x += tmpSpeed * Math.cos(this.dir);
                    this.y += tmpSpeed * Math.sin(this.dir);
                    this.range -= tmpSpeed;
                    if (this.range <= 0) {
                        this.x += this.range * Math.cos(this.dir);
                        this.y += this.range * Math.sin(this.dir);
                        tmpSpeed = 1;
                        this.range = 0;
                        this.active = false;
                    }
                } else {
                    this.skipMov = false;
                }
            }
        };
        this.tickUpdate = function(delta) {
            if (this.tickActive) {
                let tmpSpeed = this.speed * delta;
                if (!this.skipMov) {
                    this.x2 += tmpSpeed * Math.cos(this.dir);
                    this.y2 += tmpSpeed * Math.sin(this.dir);
                    this.r2 -= tmpSpeed;
                    if (this.r2 <= 0) {
                        this.x2 += this.r2 * Math.cos(this.dir);
                        this.y2 += this.r2 * Math.sin(this.dir);
                        tmpSpeed = 1;
                        this.r2 = 0;
                        this.tickActive = false;
                    }
                } else {
                    this.skipMov = false;
                }
            }
        };
    }
};
class Store {
    constructor() {
        this.hats = [{
            id: 45,
            name: "Shame!",
            dontSell: true,
            price: 0,
            scale: 120,
            desc: "hacks are for losers"
        }, {
            id: 51,
            name: "Moo Cap",
            price: 0,
            scale: 120,
            desc: "coolest mooer around"
        }, {
            id: 50,
            name: "Apple Cap",
            price: 0,
            scale: 120,
            desc: "apple farms remembers"
        }, {
            id: 28,
            name: "Moo Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 29,
            name: "Pig Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 30,
            name: "Fluff Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 36,
            name: "Pandou Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 37,
            name: "Bear Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 38,
            name: "Monkey Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 44,
            name: "Polar Head",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 35,
            name: "Fez Hat",
            price: 0,
            scale: 120,
            desc: "no effect"
        }, {
            id: 42,
            name: "Enigma Hat",
            price: 0,
            scale: 120,
            desc: "join the enigma army"
        }, {
            id: 43,
            name: "Blitz Hat",
            price: 0,
            scale: 120,
            desc: "hey everybody i'm blitz"
        }, {
            id: 49,
            name: "Bob XIII Hat",
            price: 0,
            scale: 120,
            desc: "like and subscribe"
        }, {
            id: 57,
            name: "Pumpkin",
            price: 50,
            scale: 120,
            desc: "Spooooky"
        }, {
            id: 8,
            name: "Bummle Hat",
            price: 100,
            scale: 120,
            desc: "no effect"
        }, {
            id: 2,
            name: "Straw Hat",
            price: 500,
            scale: 120,
            desc: "no effect"
        }, {
            id: 15,
            name: "Winter Cap",
            price: 600,
            scale: 120,
            desc: "allows you to move at normal speed in snow",
            coldM: 1
        }, {
            id: 5,
            name: "Cowboy Hat",
            price: 1000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 4,
            name: "Ranger Hat",
            price: 2000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 18,
            name: "Explorer Hat",
            price: 2000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 31,
            name: "Flipper Hat",
            price: 2500,
            scale: 120,
            desc: "have more control while in water",
            watrImm: true
        }, {
            id: 1,
            name: "Marksman Cap",
            price: 3000,
            scale: 120,
            desc: "increases arrow speed and range",
            aMlt: 1.3
        }, {
            id: 10,
            name: "Bush Gear",
            price: 3000,
            scale: 160,
            desc: "allows you to disguise yourself as a bush"
        }, {
            id: 48,
            name: "Halo",
            price: 3000,
            scale: 120,
            desc: "no effect"
        }, {
            id: 6,
            name: "Soldier Helmet",
            price: 4000,
            scale: 120,
            desc: "reduces damage taken but slows movement",
            spdMult: 0.94,
            dmgMult: 0.75
        }, {
            id: 23,
            name: "Anti Venom Gear",
            price: 4000,
            scale: 120,
            desc: "makes you immune to poison",
            poisonRes: 1
        }, {
            id: 13,
            name: "Medic Gear",
            price: 5000,
            scale: 110,
            desc: "slowly regenerates health over time",
            healthRegen: 3
        }, {
            id: 9,
            name: "Miners Helmet",
            price: 5000,
            scale: 120,
            desc: "earn 1 extra gold per resource",
            extraGold: 1
        }, {
            id: 32,
            name: "Musketeer Hat",
            price: 5000,
            scale: 120,
            desc: "reduces cost of projectiles",
            projCost: 0.5
        }, {
            id: 7,
            name: "Bull Helmet",
            price: 6000,
            scale: 120,
            desc: "increases damage done but drains health",
            healthRegen: -5,
            dmgMultO: 1.5,
            spdMult: 0.96
        }, {
            id: 22,
            name: "Emp Helmet",
            price: 6000,
            scale: 120,
            desc: "turrets won't attack but you move slower",
            antiTurret: 1,
            spdMult: 0.7
        }, {
            id: 12,
            name: "Booster Hat",
            price: 6000,
            scale: 120,
            desc: "increases your movement speed",
            spdMult: 1.16
        }, {
            id: 26,
            name: "Barbarian Armor",
            price: 8000,
            scale: 120,
            desc: "knocks back enemies that attack you",
            dmgK: 0.6
        }, {
            id: 21,
            name: "Plague Mask",
            price: 10000,
            scale: 120,
            desc: "melee attacks deal poison damage",
            poisonDmg: 5,
            poisonTime: 6
        }, {
            id: 46,
            name: "Bull Mask",
            price: 10000,
            scale: 120,
            desc: "bulls won't target you unless you attack them",
            bullRepel: 1
        }, {
            id: 14,
            name: "Windmill Hat",
            topSprite: true,
            price: 10000,
            scale: 120,
            desc: "generates points while worn",
            pps: 1.5
        }, {
            id: 11,
            name: "Spike Gear",
            topSprite: true,
            price: 10000,
            scale: 120,
            desc: "deal damage to players that damage you",
            dmg: 0.45
        }, {
            id: 53,
            name: "Turret Gear",
            topSprite: true,
            price: 10000,
            scale: 120,
            desc: "you become a walking turret",
            turret: {
                proj: 1,
                range: 700,
                rate: 2500
            },
            spdMult: 0.7
        }, {
            id: 20,
            name: "Samurai Armor",
            price: 12000,
            scale: 120,
            desc: "increased attack speed and fire rate",
            atkSpd: 0.78
        }, {
            id: 58,
            name: "Dark Knight",
            price: 12000,
            scale: 120,
            desc: "restores health when you deal damage",
            healD: 0.4
        }, {
            id: 27,
            name: "Scavenger Gear",
            price: 15000,
            scale: 120,
            desc: "earn double points for each kill",
            kScrM: 2
        }, {
            id: 40,
            name: "Tank Gear",
            price: 15000,
            scale: 120,
            desc: "increased damage to buildings but slower movement",
            spdMult: 0.3,
            bDmg: 3.3
        }, {
            id: 52,
            name: "Thief Gear",
            price: 15000,
            scale: 120,
            desc: "steal half of a players gold when you kill them",
            goldSteal: 0.5
        }, {
            id: 55,
            name: "Bloodthirster",
            price: 20000,
            scale: 120,
            desc: "Restore Health when dealing damage. And increased damage",
            healD: 0.25,
            dmgMultO: 1.2,
        }, {
            id: 56,
            name: "Assassin Gear",
            price: 20000,
            scale: 120,
            desc: "Go invisible when not moving. Can't eat. Increased speed",
            noEat: true,
            spdMult: 1.1,
            invisTimer: 1000
        }];

        this.accessories = [{
            id: 12,
            name: "Snowball",
            price: 1000,
            scale: 105,
            xOff: 18,
            desc: "no effect"
        }, {
            id: 9,
            name: "Tree Cape",
            price: 1000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 10,
            name: "Stone Cape",
            price: 1000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 3,
            name: "Cookie Cape",
            price: 1500,
            scale: 90,
            desc: "no effect"
        }, {
            id: 8,
            name: "Cow Cape",
            price: 2000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 11,
            name: "Monkey Tail",
            price: 2000,
            scale: 97,
            xOff: 25,
            desc: "Super speed but reduced damage",
            spdMult: 1.35,
            dmgMultO: 0.2
        }, {
            id: 17,
            name: "Apple Basket",
            price: 3000,
            scale: 80,
            xOff: 12,
            desc: "slowly regenerates health over time",
            healthRegen: 1
        }, {
            id: 6,
            name: "Winter Cape",
            price: 3000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 4,
            name: "Skull Cape",
            price: 4000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 5,
            name: "Dash Cape",
            price: 5000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 2,
            name: "Dragon Cape",
            price: 6000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 1,
            name: "Super Cape",
            price: 8000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 7,
            name: "Troll Cape",
            price: 8000,
            scale: 90,
            desc: "no effect"
        }, {
            id: 14,
            name: "Thorns",
            price: 10000,
            scale: 115,
            xOff: 20,
            desc: "no effect"
        }, {
            id: 15,
            name: "Blockades",
            price: 10000,
            scale: 95,
            xOff: 15,
            desc: "no effect"
        }, {
            id: 20,
            name: "Devils Tail",
            price: 10000,
            scale: 95,
            xOff: 20,
            desc: "no effect"
        }, {
            id: 16,
            name: "Sawblade",
            price: 12000,
            scale: 90,
            spin: true,
            xOff: 0,
            desc: "deal damage to players that damage you",
            dmg: 0.15
        }, {
            id: 13,
            name: "Angel Wings",
            price: 15000,
            scale: 138,
            xOff: 22,
            desc: "slowly regenerates health over time",
            healthRegen: 3
        }, {
            id: 19,
            name: "Shadow Wings",
            price: 15000,
            scale: 138,
            xOff: 22,
            desc: "increased movement speed",
            spdMult: 1.1
        }, {
            id: 18,
            name: "Blood Wings",
            price: 20000,
            scale: 178,
            xOff: 26,
            desc: "restores health when you deal damage",
            healD: 0.2
        }, {
            id: 21,
            name: "Corrupt X Wings",
            price: 20000,
            scale: 178,
            xOff: 26,
            desc: "deal damage to players that damage you",
            dmg: 0.25
        }];
    }
};
class ProjectileManager {
    constructor(Projectile, projectiles, players, ais, objectManager, items, config, UTILS, server) {
        this.addProjectile = function(x, y, dir, range, speed, indx, owner, ignoreObj, layer, inWindow) {
            let tmpData = items.projectiles[indx];
            let tmpProj;
            for (let i = 0; i < projectiles.length; ++i) {
                if (!projectiles[i].active) {
                    tmpProj = projectiles[i];
                    break;
                }
            }
            if (!tmpProj) {
                tmpProj = new Projectile(players, ais, objectManager, items, config, UTILS, server);
                tmpProj.sid = projectiles.length;
                projectiles.push(tmpProj);
            }
            tmpProj.init(indx, x, y, dir, speed, tmpData.dmg, range, tmpData.scale, owner);
            tmpProj.ignoreObj = ignoreObj;
            tmpProj.layer = layer || tmpData.layer;
            tmpProj.inWindow = inWindow;
            tmpProj.src = tmpData.src;
            return tmpProj;
        };
    }
};
class AiManager {

    constructor(ais, AI, players, items, objectManager, config, UTILS, scoreCallback, server) {

        this.aiTypes = [{
            id: 0,
            src: "cow_1",
            killScore: 150,
            health: 500,
            weightM: 0.8,
            speed: 0.00095,
            turnSpeed: 0.001,
            scale: 72,
            drop: ["food", 50]
        }, {
            id: 1,
            src: "pig_1",
            killScore: 200,
            health: 800,
            weightM: 0.6,
            speed: 0.00085,
            turnSpeed: 0.001,
            scale: 72,
            drop: ["food", 80]
        }, {
            id: 2,
            name: "Bull",
            src: "bull_2",
            hostile: true,
            dmg: 20,
            killScore: 1000,
            health: 1800,
            weightM: 0.5,
            speed: 0.00094,
            turnSpeed: 0.00074,
            scale: 78,
            viewRange: 800,
            chargePlayer: true,
            drop: ["food", 100]
        }, {
            id: 3,
            name: "Bully",
            src: "bull_1",
            hostile: true,
            dmg: 20,
            killScore: 2000,
            health: 2800,
            weightM: 0.45,
            speed: 0.001,
            turnSpeed: 0.0008,
            scale: 90,
            viewRange: 900,
            chargePlayer: true,
            drop: ["food", 400]
        }, {
            id: 4,
            name: "Wolf",
            src: "wolf_1",
            hostile: true,
            dmg: 8,
            killScore: 500,
            health: 300,
            weightM: 0.45,
            speed: 0.001,
            turnSpeed: 0.002,
            scale: 84,
            viewRange: 800,
            chargePlayer: true,
            drop: ["food", 200]
        }, {
            id: 5,
            name: "Quack",
            src: "chicken_1",
            dmg: 8,
            killScore: 2000,
            noTrap: true,
            health: 300,
            weightM: 0.2,
            speed: 0.0018,
            turnSpeed: 0.006,
            scale: 70,
            drop: ["food", 100]
        }, {
            id: 6,
            name: "MOOSTAFA",
            nameScale: 50,
            src: "enemy",
            hostile: true,
            dontRun: true,
            fixedSpawn: true,
            spawnDelay: 60000,
            noTrap: true,
            colDmg: 100,
            dmg: 40,
            killScore: 8000,
            health: 18000,
            weightM: 0.4,
            speed: 0.0007,
            turnSpeed: 0.01,
            scale: 80,
            spriteMlt: 1.8,
            leapForce: 0.9,
            viewRange: 1000,
            hitRange: 210,
            hitDelay: 1000,
            chargePlayer: true,
            drop: ["food", 100]
        }, {
            id: 7,
            name: "Treasure",
            hostile: true,
            nameScale: 35,
            src: "crate_1",
            fixedSpawn: true,
            spawnDelay: 120000,
            colDmg: 200,
            killScore: 5000,
            health: 20000,
            weightM: 0.1,
            speed: 0.0,
            turnSpeed: 0.0,
            scale: 70,
            spriteMlt: 1.0
        }, {
            id: 8,
            name: "MOOFIE",
            src: "wolf_2",
            hostile: true,
            fixedSpawn: true,
            dontRun: true,
            hitScare: 4,
            spawnDelay: 30000,
            noTrap: true,
            nameScale: 35,
            dmg: 10,
            colDmg: 100,
            killScore: 3000,
            health: 7000,
            weightM: 0.45,
            speed: 0.0015,
            turnSpeed: 0.002,
            scale: 90,
            viewRange: 800,
            chargePlayer: true,
            drop: ["food", 1000]
        }, {
            id: 9,
            name: "💀MOOFIE",
            src: "wolf_2",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 50,
            spawnDelay: 6e4,
            noTrap: !0,
            nameScale: 35,
            dmg: 12,
            colDmg: 100,
            killScore: 3e3,
            health: 9e3,
            weightM: .45,
            speed: .0015,
            turnSpeed: .0025,
            scale: 94,
            viewRange: 1440,
            chargePlayer: !0,
            drop: ["food", 3e3],
            minSpawnRange: .85,
            maxSpawnRange: .9
        }, {
            id: 10,
            name: "💀Wolf",
            src: "wolf_1",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 50,
            spawnDelay: 3e4,
            dmg: 10,
            killScore: 700,
            health: 500,
            weightM: .45,
            speed: .00115,
            turnSpeed: .0025,
            scale: 88,
            viewRange: 1440,
            chargePlayer: !0,
            drop: ["food", 400],
            minSpawnRange: .85,
            maxSpawnRange: .9
        }, {
            id: 11,
            name: "💀Bully",
            src: "bull_1",
            hostile: !0,
            fixedSpawn: !0,
            dontRun: !0,
            hitScare: 50,
            dmg: 20,
            killScore: 5e3,
            health: 5e3,
            spawnDelay: 1e5,
            weightM: .45,
            speed: .00115,
            turnSpeed: .0025,
            scale: 94,
            viewRange: 1440,
            chargePlayer: !0,
            drop: ["food", 800],
            minSpawnRange: .85,
            maxSpawnRange: .9
        }];

        this.spawn = function(x, y, dir, index) {
            let tmpObj = ais.find((tmp) => !tmp.active);
            if (!tmpObj) {
                tmpObj = new AI(ais.length, objectManager, players, items, UTILS, config, scoreCallback, server);
                ais.push(tmpObj);
            }
            tmpObj.init(x, y, dir, index, this.aiTypes[index]);
            return tmpObj;
        };
    }

};

class AI {
    constructor(sid, objectManager, players, items, UTILS, config, scoreCallback, server) {
        this.sid = sid;
        this.isAI = true;
        this.nameIndex = UTILS.randInt(0, config.cowNames.length - 1);

        this.init = function(x, y, dir, index, data) {
            this.x = x;
            this.y = y;
            this.startX = data.fixedSpawn ? x : null;
            this.startY = data.fixedSpawn ? y : null;
            this.xVel = 0;
            this.yVel = 0;
            this.zIndex = 0;
            this.dir = dir;
            this.dirPlus = 0;
            this.showName = 'aaa';
            this.index = index;
            this.src = data.src;
            if (data.name) this.name = data.name;
            this.weightM = data.weightM;
            this.speed = data.speed;
            this.killScore = data.killScore;
            this.turnSpeed = data.turnSpeed;
            this.scale = data.scale;
            this.maxHealth = data.health;
            this.leapForce = data.leapForce;
            this.health = this.maxHealth;
            this.chargePlayer = data.chargePlayer;
            this.viewRange = data.viewRange;
            this.drop = data.drop;
            this.dmg = data.dmg;
            this.hostile = data.hostile;
            this.dontRun = data.dontRun;
            this.hitRange = data.hitRange;
            this.hitDelay = data.hitDelay;
            this.hitScare = data.hitScare;
            this.spriteMlt = data.spriteMlt;
            this.nameScale = data.nameScale;
            this.colDmg = data.colDmg;
            this.noTrap = data.noTrap;
            this.spawnDelay = data.spawnDelay;
            this.hitWait = 0;
            this.waitCount = 1000;
            this.moveCount = 0;
            this.targetDir = 0;
            this.active = true;
            this.alive = true;
            this.runFrom = null;
            this.chargeTarget = null;
            this.dmgOverTime = {};
        };

        let tmpRatio = 0;
        let animIndex = 0;
        this.animate = function(delta) {
            if (this.animTime > 0) {
                this.animTime -= delta;
                if (this.animTime <= 0) {
                    this.animTime = 0;
                    this.dirPlus = 0;
                    tmpRatio = 0;
                    animIndex = 0;
                } else {
                    if (animIndex == 0) {
                        tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
                        this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio));
                        if (tmpRatio >= 1) {
                            tmpRatio = 1;
                            animIndex = 1;
                        }
                    } else {
                        tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
                        this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio));
                    }
                }
            }
        };

        this.startAnim = function() {
            this.animTime = this.animSpeed = 600;
            this.targetAngle = Math.PI * 0.8;
            tmpRatio = 0;
            animIndex = 0;
        };

    };

};

class addCh {
    constructor(x, y, chat, tmpObj) {
        this.x = x;
        this.y = y;
        this.alpha = 0;
        this.active = true;
        this.alive = false;
        this.chat = chat;
        this.owner = tmpObj;
    };
};

class DeadPlayer {
    constructor(x, y, dir, buildIndex, weaponIndex, weaponVariant, skinColor, scale, name) {
        this.x = x;
        this.y = y;
        this.lastDir = dir;
        this.dir = dir + Math.PI;
        this.buildIndex = buildIndex;
        this.weaponIndex = weaponIndex;
        this.weaponVariant = weaponVariant;
        this.skinColor = skinColor;
        this.scale = scale;
        this.visScale = 0;
        this.name = name;
        this.alpha = 1;
        this.active = true;
        this.animate = function(delta) {
            let d2 = UTILS.getAngleDist(this.lastDir, this.dir);
            if (d2 > 0.01) {
                this.dir += d2 / 20;
            } else {
                this.dir = this.lastDir;
            }
            if (this.visScale < this.scale) {
                this.visScale += delta / (this.scale / 2);
                if (this.visScale >= this.scale) {
                    this.visScale = this.scale;
                }
            }
            this.alpha -= delta / 30000;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.active = false;
            }
        }
    }
};

class Player {
    constructor(id, sid, config, UTILS, projectileManager, objectManager, players, ais, items, hats, accessories, server, scoreCallback, iconCallback) {
        this.id = id;
        this.sid = sid;
        this.tmpScore = 0;
        this.team = null;
        this.latestSkin = 0;
        this.oldSkinIndex = 0;
        this.skinIndex = 0;
        this.latestTail = 0;
        this.oldTailIndex = 0;
        this.tailIndex = 0;
        this.hitTime = 0;
        this.lastHit = 0;
        this.lastBleed = {
            amount: 0,
            time: 0,
            healed: true,
        };
        this.showName = 'NOOO';
        this.tails = {};

        for (let i = 0; i < accessories.length; ++i) {
            if (accessories[i].price <= 0)
                this.tails[accessories[i].id] = 1;
        }
        this.skins = {};
        for (let i = 0; i < hats.length; ++i) {
            if (hats[i].id <= 0)
                this.skins[hats[i].id] = 1;
        }

        this.points = 0;
        this.dt = 0;
        this.hidden = false;
        this.itemCounts = {};
        this.isPlayer = true;
        this.pps = 0;
        this.moveDir = undefined;
        this.skinRot = 0;
        this.lastPing = 0;
        this.iconIndex = 0;
        this.skinColor = 0;
        this.dist2 = 0;
        this.aim2 = 0;
        this.maxSpeed = 1;
        this.chat = {
            message: null,
            count: 0
        };
        this.backupNobull = true;
        this.spawn = function(moofoll) {
            this.attacked = false;
            this.timeDamaged = 0;
            this.timeHealed = 0;
            this.pinge = 0;
            this.millPlace = 'NOOO';
            this.lastshamecount = 0;
            this.death = false;
            this.spinDir = 0;
            this.sync = false;
            this.antiBull = 0;
            this.bullTimer = 0;
            this.poisonTimer = 0;
            this.active = true;
            this.alive = true;
            this.lockMove = false;
            this.lockDir = false;
            this.minimapCounter = 0;
            this.chatCountdown = 0;
            this.shameCount = 0;
            this.shameTimer = 0;
            this.sentTo = {};
            this.gathering = 0;
            this.gatherIndex = 0;
            this.shooting = {};
            this.shootIndex = 9;
            this.autoGather = 0;
            this.animTime = 0;
            this.animSpeed = 0;
            this.mouseState = 0;
            this.buildIndex = -1;
            this.weaponIndex = 0;
            this.weaponCode = 0;
            this.weaponVariant = 0;
            this.primaryIndex = undefined;
            this.secondaryIndex = undefined;
            this.dmgOverTime = {};
            this.noMovTimer = 0;
            this.maxXP = 300;
            this.XP = 0;
            this.age = 1;
            this.kills = 0;
            this.upgrAge = 2;
            this.upgradePoints = 0;
            this.x = 0;
            this.y = 0;
            this.oldXY = {
                x: 0,
                y: 0
            };
            this.zIndex = 0;
            this.xVel = 0;
            this.yVel = 0;
            this.slowMult = 1;
            this.dir = 0;
            this.dirPlus = 0;
            this.targetDir = 0;
            this.targetAngle = 0;
            this.maxHealth = 100;
            this.health = this.maxHealth;
            this.oldHealth = this.maxHealth;
            this.damaged = 0;
            this.scale = config.playerScale;
            this.speed = config.playerSpeed;
            this.resetMoveDir();
            this.resetResources(moofoll);
            this.items = [0, 3, 6, 10];
            this.weapons = [0];
            this.shootCount = 0;
            this.weaponXP = [];
            this.reloads = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                53: 0,
            };
            this.bowThreat = {
                9: 0,
                12: 0,
                13: 0,
                15: 0,
            };
            this.damageThreat = 0;
            this.inTrap = false;
            this.canEmpAnti = false;
            this.empAnti = false;
            this.soldierAnti = false;
            this.poisonTick = 0;
            this.bullTick = 0;
            this.setPoisonTick = false;
            this.setBullTick = false;
            this.antiTimer = 2;
        };

        this.resetMoveDir = function() {
            this.moveDir = undefined;
        };

        this.resetResources = function(moofoll) {
            for (let i = 0; i < config.resourceTypes.length; ++i) {
                this[config.resourceTypes[i]] = moofoll ? 100 : 0;
            }
        };

        this.getItemType = function(id) {
            let findindx = this.items.findIndex((ids) => ids == id);
            if (findindx != -1) {
                return findindx;
            } else {
                return items.checkItem.index(id, this.items);
            }
        };

        this.setData = function(data) {
            this.id = data[0];
            this.sid = data[1];
            this.name = data[2];
            this.x = data[3];
            this.y = data[4];
            this.dir = data[5];
            this.health = data[6];
            this.maxHealth = data[7];
            this.scale = data[8];
            this.skinColor = data[9];
        };

        this.updateTimer = function() {

            this.bullTimer -= 1;
            if (this.bullTimer <= 0) {
                this.setBullTick = false;
                this.bullTick = game.TICK - 1;
                this.bullTimer = config.serverUpdateRate;
            }
            this.poisonTimer -= 1;
            if (this.poisonTimer <= 0) {
                this.setPoisonTick = false;
                this.poisonTick = game.TICK - 1;
                this.poisonTimer = config.serverUpdateRate;
            }

        };
        this.update = function(delta) {
            if (this.active) {

                let gear = {
                    skin: findID(hats, this.skinIndex),
                    tail: findID(accessories, this.tailIndex)
                }
                let spdMult = ((this.buildIndex >= 0) ? 0.5 : 1) * (items.weapons[this.weaponIndex].spdMult || 1) * (gear.skin ? (gear.skin.spdMult || 1) : 1) * (gear.tail ? (gear.tail.spdMult || 1) : 1) * (this.y <= config.snowBiomeTop ? ((gear.skin && gear.skin.coldM) ? 1 : config.snowSpeed) : 1) * this.slowMult;
                this.maxSpeed = spdMult;

            }
        };

        let tmpRatio = 0;
        let animIndex = 0;
        let crazyFactor = 3;
        let waveAmplitude = Math.PI / -16;
        this.animate = function(delta) {
            if (this.animTime > 0) {
                this.animTime -= delta;
                if (this.animTime <= 0) {
                    this.animTime = 0;
                    this.dirPlus = 0;
                    tmpRatio = 0;
                    animIndex = 0;
                } else {
                    if (animIndex == 0) {
                        tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
                        let progress = Math.min(1, tmpRatio);
                        this.dirPlus = UTILS.lerp(0, this.targetAngle, easeInOutSine(progress)) + waveAmplitude * Math.sin(progress * crazyFactor * Math.PI);
                        if (progress >= 1) {
                            tmpRatio = 1;
                            animIndex = 1;
                        }
                    } else {
                        tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
                        let progress = Math.max(0, tmpRatio);
                        this.dirPlus = UTILS.lerp(0, this.targetAngle, easeInOutSine(progress)) + waveAmplitude * Math.cos(progress * crazyFactor * Math.PI);
                    }
                }
            }
        };

        this.startAnim = function(didHit, index) {
            this.animTime = this.animSpeed = items.weapons[index].speed * 1.8;
            this.targetAngle = (didHit ? -config.hitAngle : -Math.PI);
            tmpRatio = 0;
            animIndex = 0;
        };

        this.canSee = function(other) {
            if (!other) return false;
            let dx = Math.abs(other.x - this.x) - other.scale;
            let dy = Math.abs(other.y - this.y) - other.scale;
            return dx <= (config.maxScreenWidth / 2) * 1.3 && dy <= (config.maxScreenHeight / 2) * 1.3;
        };

        this.judgeShame = function() {
            this.lastshamecount = this.shameCount;
            if (this.oldHealth < this.health) {
                if (this.hitTime) {
                    let timeSinceHit = game.TICK - this.hitTime;
                    this.lastHit = game.TICK;
                    this.hitTime = 0;
                    if (timeSinceHit < 2) {
                        this.shameCount++;
                    } else {
                        this.shameCount = Math.max(0, this.shameCount - 2);
                    }
                }
            } else if (this.oldHealth > this.health) {
                this.hitTime = game.TICK;
            }
        };
        this.addShameTimer = function() {
            this.shameCount = 0;
            this.shameTimer = 30;
            let interval = setInterval(() => {
                this.shameTimer--;
                if (this.shameTimer <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
        };

        this.isTeam = function(tmpObj) {
            return (this == tmpObj || (this.team && this.team == tmpObj.team));
        };

        this.findAllianceBySid = function(sid) {
            return this.team ? alliancePlayers.find((THIS) => THIS === sid) : null;
        };
        this.checkCanInsta = function(nobull) {
            let totally = 0;
            if (this.alive && inGame) {
                let primary = {
                    weapon: this.weapons[0],
                    variant: this.primaryVariant,
                    dmg: this.weapons[0] == undefined ? 0 : items.weapons[this.weapons[0]].dmg,
                };
                let secondary = {
                    weapon: this.weapons[1],
                    variant: this.secondaryVariant,
                    dmg: this.weapons[1] == undefined ? 0 : items.weapons[this.weapons[1]].Pdmg,
                };
                let bull = this.skins[7] && !nobull ? 1.5 : 1;
                let pV = primary.variant != undefined ? config.weaponVariants[primary.variant].val : 1;
                if (primary.weapon != undefined && this.reloads[primary.weapon] == 0) {
                    totally += primary.dmg * pV * bull;
                }
                if (secondary.weapon != undefined && this.reloads[secondary.weapon] == 0) {
                    totally += secondary.dmg;
                }
                if (this.skins[53] && this.reloads[53] <= (player.weapons[1] == 10 ? 0 : game.tickRate) && near.skinIndex != 22) {
                    totally += 25;
                }
                totally *= near.skinIndex == 6 ? 0.75 : 1;
                return totally;
            }
            return 0;
        };

        this.getNearbySpikeDamage = function() {
            let spikeDamage = 0;
            if (this.alive && inGame) {
                let nearbySpikes = gameObjects.filter(obj => 
                    obj.dmg && 
                    obj.active && 
                    !obj.isTeamObject(this) && 
                    UTILS.getDist(obj, this, 0, 2) <= (obj.scale + this.scale + 35)
                );
                
                for (let i = 0; i < nearbySpikes.length; i++) {
                    let spike = nearbySpikes[i];
                    let damage = spike.dmg || 0;
                    damage *= this.skinIndex == 6 ? 0.75 : 1;
                    spikeDamage += damage;
                }
            }
            return spikeDamage;
        };

        this.manageReload = function() {
            if (this.shooting[53]) {
                this.shooting[53] = 0;
                this.reloads[53] = (2500 - game.tickRate);
            } else {
                if (this.reloads[53] > 0) {
                    this.reloads[53] = Math.max(0, this.reloads[53] - game.tickRate);
                }
            }

            if (this.reloads[this.weaponIndex] <= 1000/9) {
                let index = this.weaponIndex;
                let nearObja = lstOfObjects.filter((e) => (e.active || e.alive) && e.health < e.maxHealth && e.group !== undefined && UTILS.getDist(e, player, 0, 2) <= (items.weapons[player.weaponIndex].range + e.scale));
                for(let i = 0; i < nearObja.length; i++) {
                    let aaa = nearObja[i];

                    let val = items.weapons[index].dmg * (config.weaponVariants[tmpObj[(index < 9 ? "prima" : "seconda") + "ryVariant"]].val) * (items.weapons[index].sDmg || 1) * 3.3;
                    let valaa = items.weapons[index].dmg * (config.weaponVariants[tmpObj[(index < 9 ? "prima" : "seconda") + "ryVariant"]].val) * (items.weapons[index].sDmg || 1);
                    if(aaa.health - (valaa) <= 0 && near.length) {
                        place(near.dist2<((near.scale * 1.8) + 50)?4:2, caf(aaa, player) + Math.PI);
                    }
                }
            }

            if (this.gathering || this.shooting[1]) {
                if (this.gathering) {
                    this.gathering = 0;
                    this.reloads[this.gatherIndex] = (items.weapons[this.gatherIndex].speed * (this.skinIndex == 20 ? 0.78 : 1));
                    this.attacked = true;
                }
                if (this.shooting[1]) {
                    this.shooting[1] = 0;
                    this.reloads[this.shootIndex] = (items.weapons[this.shootIndex].speed * (this.skinIndex == 20 ? 0.78 : 1));
                    this.attacked = true;
                }
            } else {
                this.attacked = false;
                if (this.buildIndex < 0) {
                    if (this.reloads[this.weaponIndex] > 0) {
                        this.reloads[this.weaponIndex] = Math.max(0, this.reloads[this.weaponIndex] - 110);
                        if (this == player) {
                            if (verify("weaponGrind").checked) {
                                for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
                                    checkPlace(player.getItemType(22), i);
                                }
                            }
                        }
                        if (this.reloads[this.primaryIndex] == 0 && this.reloads[this.weaponIndex] == 0) {
                            this.antiBull++;
                            game.tickBase(() => {
                                this.antiBull = 0;
                            }, 1);
                        }
                    }
                }
            }
        };

        this.addDamageThreat = function(tmpObj) {
            this.damageThreat = 0
            let primary = {
                weapon: this.primaryIndex,
                variant: this.primaryVariant
            };
            primary.dmg = primary.weapon == undefined ? 45 : items.weapons[primary.weapon].dmg;
            let secondary = {
                weapon: this.secondaryIndex,
                variant: this.secondaryVariant
            };
            secondary.dmg = secondary.weapon == undefined ? 75 : items.weapons[secondary.weapon].Pdmg;
            let bull = 1.5;
            let pV = primary.variant != undefined ? config.weaponVariants[primary.variant].val : 1.18;
            let sV = secondary.variant != undefined ? [9, 12, 13, 15].includes(secondary.weapon) ? 1 : config.weaponVariants[secondary.variant].val : 1.18;
            if (primary.weapon == undefined ? true : this.reloads[primary.weapon] == 0) {
                this.damageThreat += primary.dmg * pV * bull;
            }
            if (secondary.weapon == undefined ? true : this.reloads[secondary.weapon] == 0) {
                this.damageThreat += secondary.dmg * sV;
            }
            if (this.reloads[53] <= game.tickRate) {
                this.damageThreat += 25;
            }
            this.damageThreat *= tmpObj.skinIndex == 6 ? 0.75 : 1;
            if (!this.isTeam(tmpObj)) {
                if (this.dist2 <= 300) {
                    tmpObj.damageThreat += this.damageThreat;
                }
            }
        };
    }
};

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

function sendUpgrade(index) {
    player.reloads[index] = 0;
    packet("H", index);
}

function storeEquip(id, index) {
    packet("c", 0, id, index);
}

function storeBuy(id, index) {
    packet("c", 1, id, index);
}

function buyEquip(id, index) {
    let nID = player.skins[6] ? 6 : 0;
    if (player.alive && inGame) {
        if (index == 0) {
            if (player.skins[id]) {
                if (player.latestSkin != id) {
                    packet("c", 0, id, 0);
                }
            } else {
                if (configs.autoBuyEquip) {
                    let find = findID(hats, id);
                    if (find) {
                        if (player.points >= find.price) {
                            packet("c", 1, id, 0);
                            packet("c", 0, id, 0);
                        } else {
                            if (player.latestSkin != nID) {
                                packet("c", 0, nID, 0);
                            }
                        }
                    } else {
                        if (player.latestSkin != nID) {
                            packet("c", 0, nID, 0);
                        }
                    }
                } else {
                    if (player.latestSkin != nID) {
                        packet("c", 0, nID, 0);
                    }
                }
            }
        } else if (index == 1) {
            if (useWasd && (id != 11 && id != 0)) {
                if (player.latestTail != 0) {
                    packet("c", 0, 0, 1);
                }
                return;
            }
            if (player.tails[id]) {
                if (player.latestTail != id) {
                    packet("c", 0, id, 1);
                }
            } else {
                if (configs.autoBuyEquip) {
                    let find = findID(accessories, id);
                    if (find) {
                        if (player.points >= find.price) {
                            packet("c", 1, id, 1);
                            packet("c", 0, id, 1);
                        } else {
                            if (player.latestTail != 0) {
                                packet("c", 0, 0, 1);
                            }
                        }
                    } else {
                        if (player.latestTail != 0) {
                            packet("c", 0, 0, 1);
                        }
                    }
                } else {
                    if (player.latestTail != 0) {
                        packet("c", 0, 0, 1);
                    }
                }
            }
        }
    }
}

function selectToBuild(index, wpn) {
    packet("z", index, wpn);
}

function selectWeapon(index, isPlace) {
    if (!isPlace) {
        player.weaponCode = index;
    }
    packet("z", index, 1);
}

function sendAutoGather() {
    packet("K", 1, 1);
}

function sendAtck(id, angle) {
    packet("F", id, angle);
}

function place(itemId, angle, shouldRemove) {
    try {
        if (itemId === undefined) return;

        const item = items.list[player.items[itemId]];
        const tmpScale = player.scale + item.scale + (item.placeOffset || 0);
        const tmpX = player.x2 + tmpScale * Math.cos(angle);
        const tmpY = player.y2 + tmpScale * Math.sin(angle);

        const canPlaceItem = player.alive && inGame && (player.itemCounts[item.group.id] === undefined || (config.isSandbox ? true : player.itemCounts[item.group.id] < (item.group.limit ? item.group.limit : 99)));

        if (canPlaceItem) {
            selectToBuild(player.items[itemId]);
            sendAtck(1, angle);
            selectWeapon(player.weaponCode, 1);

            if (shouldRemove && configs.placeVis) {
                placeVisible.push({
                    x: tmpX,
                    y: tmpY,
                    name: item.name,
                    scale: item.scale,
                    dir: angle,
                    opacity: 0
                });

                game.tickBase(() => {
                    placeVisible.shift();
                }, 1);
            }
        }
    } catch (error) {
        console.error("Error while placing item:", error);
    }
}

function checkPlace(itemId, angle) {
    try {
        if (itemId === undefined) return;

        const item = items.list[player.items[itemId]];
        const tmpScale = player.scale + item.scale + (item.placeOffset || 0);
        const tmpX = player.x2 + tmpScale * Math.cos(angle);
        const tmpY = player.y2 + tmpScale * Math.sin(angle);

        if (objectManager.checkItemLocation(tmpX, tmpY, item.scale, 0.6, item.id, false, player)) {
            place(itemId, angle, true);
        }
    } catch (error) {
        console.error("Error while checking place:", error);
    }
}

function soldierMult(tmpObj) {
    return tmpObj.latestSkin == 6 ? 0.75 : 1;
}
function bullMult(tmpObj) {
    return tmpObj.latestSkin == 7 ? 0.50 : 1;
}

function healthBased() {
    if (player.health === 100) return 0;

    if (player.skinIndex === 45 || player.skinIndex === 56) return 0;

    const currentItem = items.list[player.items[0]];
    if (currentItem?.healing) {
        const remainingHealth = 100 - player.health;
        return Math.ceil(remainingHealth / currentItem.healing);
    }

    return -1;
}


function getAttacker(damaged) {
    let attackers = enemy.filter(tmp => {
        let rule = {
            three: tmp.attacked
        }
        return rule.three;
    });
    return attackers;
}

function performHealing(times) {
    for (let i = 0; i < times; i++) {
        place(0, getAttackDir());
    }
}

function healing() {
    performHealing(healthBased());
}

function timeHeal() {
    performHealing(healthBased());
}

function whenInstaHeal() {
    performHealing(1);
    const healthDeficit = 100 - player.health;
    const healingPower = items.list[player.items[0]].healing;
    return Math.ceil(healthDeficit / healingPower);
}


function noShameHeal() {
    place(0, getAttackDir());

    if (player.shameCount >= 5 || (player.skinIndex !== 6 && player.skinIndex !== 22)) {
        timeHeal();
    } else {
        const neededHealing = Math.ceil((100 - player.health) / items.list[player.items[0]].healing);
        timeHeal();
        return neededHealing;
    }
}


function antiSyncHealing() {
    if (HANS.antiSync) return;

    HANS.antiSync = true;
    const healAnti = setInterval(() => {
        if (player.shameCount < 5) {
            place(0, getAttackDir());
            buyEquip(6, 0);
        } else {
            stopHealing();
        }
    }, 75);

    const stopHealing = () => {
        clearInterval(healAnti);
        HANS.antiSync = false;
    };

    setTimeout(stopHealing, game.tickRate);
}



function biomeGear(returns) {
    const riverMinY = config.mapScale / 2 - config.riverWidth / 2;
    const riverMaxY = config.mapScale / 2 + config.riverWidth / 2;

    if (player.y2 >= riverMinY && player.y2 <= riverMaxY) {
        if (returns) return 31;
        buyEquip(31, 0);
        return returns ? 0 : undefined;
    }

    if (player.y2 <= config.snowBiomeTop) {
        const snowEquip = (enemy && near.dist2 <= 300) ? 6 : 15;
        if (returns) return snowEquip;
        buyEquip(15, 0);
        return 0;
    }

    const defaultEquip = (enemy && near.dist2 <= 300) ? 6 : 12;
    if (returns) return defaultEquip;
    buyEquip(defaultEquip, 0);

    return 0;
}



class Traps {
    constructor(UTILS, items) {
        this.dist = 0;
        this.aim = 0;
        this.inTrap = false;
        this.replaced = false;
        this.antiTrapped = false;
        this.info = {};
        this.trappling = false;
        this.spikeplacer = false;
        this.spikePlaced = false;
        this.spikSync = false;

        this.notFast = function() {
            return player.weapons[1] === 10 && ((this.info.health > items.weapons[player.weapons[0]].dmg) || player.weapons[0] === 5);
        };

        this.testCanPlace = function (id, first = -(Math.PI / 2), repeat = Math.PI / 2, plus = Math.PI / 18, radian, replacer, trouble) {
            try {
                const itemIndex = player.items[id] !== undefined ? player.items[id] : 0;
                if (itemIndex === undefined || !items.list[itemIndex]) {
                    console.error('Error en testCanPlace: item no encontrado para id', id, 'player.items:', player.items);
                    return;
                }
                const item = items.list[itemIndex];
                const tmpS = player.scale + item.scale + (item.placeOffset || 0);
                const mapHalf = config.mapScale / 2;
                const riverBounds = [mapHalf - config.riverWidth / 2, mapHalf + config.riverWidth / 2];
                const counts = { attempts: 0, placed: 0 };

                const tmpObjects = lstOfObjects.map(obj => ({
                    x: obj.x,
                    y: obj.y,
                    active: obj.active,
                    blocker: obj.blocker,
                    scale: obj.scale,
                    isItem: obj.isItem,
                    type: obj.type,
                    colDiv: obj.colDiv,
                    getScale(sM = 1, ignore = false) {
                        return this.scale * ((this.isItem || [2, 3, 4].includes(this.type)) ? 1 : 0.6 * sM) * (ignore ? 1 : this.colDiv);
                    }
                }));

                for (let i = first; i < repeat; i += plus) {
                    counts.attempts++;
                    const relAim = radian + i;
                    const tmpX = player.x2 + tmpS * Math.cos(relAim);
                    const tmpY = player.y2 + tmpS * Math.sin(relAim);

                    const cantPlace = tmpObjects.some(obj =>
                        obj.active &&
                        UTILS.getDistance(tmpX, tmpY, obj.x, obj.y) < item.scale + (obj.blocker || obj.getScale(0.6, obj.isItem))
                    );

                    if (cantPlace || (item.id !== 18 && tmpY >= riverBounds[0] && tmpY <= riverBounds[1])) continue;

                    if (!replacer && trouble) {
                        const aimDist = UTILS.getAngleDist(near.aim2, relAim);
                        if (trouble.inTrap ? aimDist <= Math.PI * 1.3 : aimDist <= config.gatherAngle / 2.6) {
                            place(2, relAim, 1);
                        } else if (player.items[4] === 15) {
                            place(4, relAim, 1);
                        }
                    } else {
                        place(id, relAim, 1);
                    }

                    tmpObjects.push({
                        x: tmpX,
                        y: tmpY,
                        active: true,
                        blocker: item.blocker,
                        scale: item.scale,
                        isItem: true,
                        type: null,
                        colDiv: item.colDiv,
                        getScale() {
                            return this.scale;
                        }
                    });

                    if (UTILS.getAngleDist(near.aim2, relAim) <= 1) {
                        counts.placed++;
                    }
                }

                if (counts.placed > 0 && replacer && item.dmg) {
                    const weaponRange = items.weapons[player.weapons[0]].range + player.scale * 1.8;
                    if (near.dist2 <= weaponRange && configs.spikeTick) {
                        instaC.canSpikeTick = true;
                        instaC.spikeTickType();
                    }
                }
            } catch (err) {
                console.error("Error in testCanPlace:", err);
            }
        };

        this.checkMySpikeTick = function () {
            try {
                const isSpikeWeapon = [3, 4, 5].includes(player.primaryIndex);
                const safeModeActive = HANS.autoPush;
                const reloadActive = player.primaryIndex === undefined || player.reloads[player.primaryIndex] > game.tickRate;
        
                if (!isSpikeWeapon || safeModeActive || reloadActive) return false;
        
                const spikeRange = items.weapons[player.primaryIndex || 5].range + player.scale * 1.8;
        
                if (near.dist2 > spikeRange) return false;
        
                const item = items.list[9];
                const itemOffset = item.scale + (item.placeOffset || 0);
                const detectionRadius = player.scale + itemOffset;
                const riverBounds = [config.mapScale / 2 - config.riverWidth / 2, config.mapScale / 2 + config.riverWidth / 2];
        
                for (let i = -1; i <= 1; i += 0.1) {
                    const relativeAim = UTILS.getDirect(player, near, 2, 2) + i;
                    const tmpX = player.x2 + detectionRadius * Math.cos(relativeAim);
                    const tmpY = player.y2 + detectionRadius * Math.sin(relativeAim);
        
                    const isBlocked = lstOfObjects.some(obj =>
                        obj.active &&
                        UTILS.getDistance(tmpX, tmpY, obj.x, obj.y) < item.scale + (obj.blocker || obj.getScale(0.6, obj.isItem))
                    );
        
                    const inRiver = tmpY >= riverBounds[0] && tmpY <= riverBounds[1];
        
                    if (!isBlocked && !inRiver) {
                        return true;
                    }
                }
            } catch (err) {
                console.error("Error in checkMySpikeTick:", err);
            }
        
            return false;
        };

        this.checkSpikeTick = function () {
            try {
                const isSpikeWeapon = [3, 4, 5].includes(near.primaryIndex);
                const safeModeActive = verify("safeAntiSpikeTick") ? verify("safeAntiSpikeTick").checked : false || HANS.autoPush;
                const reloadActive = near.primaryIndex === undefined || near.reloads[near.primaryIndex] > game.tickRate;

                if (!isSpikeWeapon || safeModeActive || reloadActive) return false;

                const spikeRange = items.weapons[near.primaryIndex || 5].range + near.scale * 1.8;

                if (near.dist2 > spikeRange) return false;

                const item = items.list[9];
                const itemOffset = item.scale + (item.placeOffset || 0);
                const detectionRadius = near.scale + itemOffset;
                const riverBounds = [config.mapScale / 2 - config.riverWidth / 2, config.mapScale / 2 + config.riverWidth / 2];

                for (let i = -1; i <= 1; i += 0.1) {
                    const relativeAim = UTILS.getDirect(player, near, 2, 2) + i;
                    const tmpX = near.x2 + detectionRadius * Math.cos(relativeAim);
                    const tmpY = near.y2 + detectionRadius * Math.sin(relativeAim);

                    const isBlocked = lstOfObjects.some(obj =>
                        obj.active &&
                        UTILS.getDistance(tmpX, tmpY, obj.x, obj.y) < item.scale + (obj.blocker || obj.getScale(0.6, obj.isItem))
                    );

                    const inRiver = tmpY >= riverBounds[0] && tmpY <= riverBounds[1];

                    if (!isBlocked && !inRiver) {
                        HANS.anti0Tick = 1;
                        return true;
                    }
                }
            } catch (err) {
                console.error("Error in checkSpikeTick:", err);
            }

            return false;
        };

        this.protect = function(aim) {
            if (!configs.antiTrap) return;
            if (player.items[4]) {
                let danger = instaC.canSpikeTick;
                this.testCanPlace(danger ? 2 : 4, -(Math.PI / 2), Math.PI / 2, Math.PI / 18, aim + Math.PI);
                this.antiTrapped = true;
            }
        };

        function getValidPlacementAngles(type) {
            if (!player || !player.alive) return [];
            let angles = [];
            let obj = items.list[player.items[type]];
            if (!obj) return [];
            for (let i = 0; i < anglePrecisionDivisor; i++) {
                let angle = i * 2 * Math.PI / anglePrecisionDivisor;
                let s = player.scale + obj.scale + (obj.placeOffset || 0);
                let x = player.x2 + s * Math.cos(angle);
                let y = player.y2 + s * Math.sin(angle);
                let canPlace = objectManager.checkItemLocation(
                    x, y, obj.scale, 0.6, obj.id, false, player
                );
                if (canPlace) angles.push(angle);
            }
            return angles;
        }
        
        this.autoPlace = function () {
            if (
                enemy.length &&
                configs.autoPlace &&
                !instaC.ticking &&
                UTILS.getDist(player, near, 0, 2) < 325
            ) {
                let danger = instaC.canSpikeTick;
                const nearTrap = gameObjects.find(
                    obj =>
                        obj.trap &&
                        obj.active &&
                        obj.isTeamObject(player) &&
                        UTILS.getDist(obj, near, 0, 2) <= near.scale + obj.getScale() + 5
                );

                const nearDistance = UTILS.getDist(player, near, 0, 2);
                let itemId = danger ? 2 : 4;
                let item = items.list[player.items[itemId]];
                if (!item) return;

                const activeObjects = gameObjects.filter(obj => obj.active);
                const playerPos = { x: player.x2, y: player.y2 };
                const enemyPos = { x: near.x2, y: near.y2 };

                const getMinDistanceToObstacles = (x, y) => {
                    let minDist = Infinity;
                    for (let i = 0; i < activeObjects.length; i++) {
                        const obj = activeObjects[i];
                        const dist = UTILS.getDistance(x, y, obj.x, obj.y) - obj.getScale();
                        if (dist < minDist) minDist = dist;
                    }
                    return minDist;
                };

                const evaluatePosition = (x, y, angle) => {
                    const distToEnemy = UTILS.getDistance(x, y, enemyPos.x, enemyPos.y);
                    const distToObstacles = getMinDistanceToObstacles(x, y);
                    
                    if (distToObstacles < 0) return -Infinity;
                    
                    let score = 0;
                    
                    const optimalDistance = 150;
                    const distanceScore = 1000 - Math.abs(distToEnemy - optimalDistance);
                    score += distanceScore;
                    
                    score += distToObstacles * 3;
                    
                    const angleToEnemy = Math.atan2(enemyPos.y - playerPos.y, enemyPos.x - playerPos.x);
                    const angleDiff = Math.abs(angle - angleToEnemy);
                    const angleScore = 500 - (angleDiff * 200);
                    score += angleScore;
                    
                    if (distToEnemy < 80) score -= 1000;
                    
                    return score;
                };

                const findBestPositions = () => {
                    if (this.lastPositionSearch && (game.TICK - this.lastPositionSearch) < 3) {
                        return this.cachedPositions || [];
                    }
                    
                    const positions = [];
                    const minRadius = Math.max(100, nearDistance - 30);
                    const maxRadius = Math.min(300, nearDistance + 80);
                    
                    const isCloseCombat = nearDistance < 150;
                    const angleSteps = isCloseCombat ? 16 : 12;
                    const radiusSteps = isCloseCombat ? 6 : 4;
                    
                    for (let i = 0; i < angleSteps; i++) {
                        const angle = (i * 2 * Math.PI) / angleSteps;
                        
                        for (let r = 0; r < radiusSteps; r++) {
                            const radius = minRadius + (maxRadius - minRadius) * (r / (radiusSteps - 1));
                            const x = playerPos.x + radius * Math.cos(angle);
                            const y = playerPos.y + radius * Math.sin(angle);
                            
                            if (!objectManager.checkItemLocation(x, y, item.scale, 0.6, item.id, false, player)) {
                                continue;
                            }
                            
                            const score = evaluatePosition(x, y, angle);
                            if (score > -Infinity) {
                                positions.push({ x, y, angle, score });
                            }
                        }
                    }
                    
                    this.cachedPositions = positions.sort((a, b) => b.score - a.score).slice(0, 2);
                    this.lastPositionSearch = game.TICK;
                    
                    return this.cachedPositions;
                };

                const bestPositions = findBestPositions();
                
                if (bestPositions.length > 0) {
                    const bestPos = bestPositions[0];
                    
                    if (nearTrap && nearDistance <= 375) {
                        const safePlacement = nearDistance <= 200;
                        
                        if (safePlacement) {
                            this.testCanPlace(
                                danger ? 2 : 4, 
                                bestPos.angle - Math.PI/8, 
                                bestPos.angle + Math.PI/8, 
                                Math.PI/48, 
                                bestPos.angle, 
                                0, 
                                { inTrap: true }
                            );
                        } else if (player.items[4] === 15) {
                            this.testCanPlace(
                                4, 
                                bestPos.angle - Math.PI/6, 
                                bestPos.angle + Math.PI/6, 
                                Math.PI/36, 
                                bestPos.angle
                            );
                        }
                    } else {
                        if (player.items[4] === 15) {
                            this.testCanPlace(4, 0, Math.PI * 2, Math.PI/48, bestPos.angle);
                        } else {
                            this.testCanPlace(
                                danger ? 2 : 4,
                                bestPos.angle - Math.PI/12,
                                bestPos.angle + Math.PI/12,
                                Math.PI/48,
                                bestPos.angle
                            );
                        }
                    }
                    
                    if (bestPositions.length > 1 && player.items[itemId] > 1) {
                        const secondBest = bestPositions[1];
                        if (Math.abs(bestPos.angle - secondBest.angle) > Math.PI/4) {
                            this.testCanPlace(
                                itemId,
                                secondBest.angle - Math.PI/12,
                                secondBest.angle + Math.PI/12,
                                Math.PI/48,
                                secondBest.angle
                            );
                        }
                    }
                }
                
                const shouldPlaceStrategic = (
                    player.items[itemId] > 3 && 
                    nearDistance < 200 && 
                    !this.lastStrategicPlace || 
                    (game.TICK - this.lastStrategicPlace) > 10
                );
                
                if (shouldPlaceStrategic) {
                    const strategicAngles = findStrategicAngles(enemyPos, playerPos, item.scale);
                    
                    if (strategicAngles.length > 0) {
                        const pos = strategicAngles[0];
                        if (player.items[itemId] > 0) {
                            this.testCanPlace(
                                itemId,
                                pos.angle - Math.PI/12,
                                pos.angle + Math.PI/12,
                                Math.PI/48,
                                pos.angle
                            );
                            this.lastStrategicPlace = game.TICK;
                        }
                    }
                }
                
                const shouldPlaceTrapPattern = (
                    player.items[4] === 15 && 
                    player.items[4] > 8 && 
                    nearDistance < 150 &&
                    (!this.lastTrapPatternPlace || (game.TICK - this.lastTrapPatternPlace) > 15)
                );
                
                if (shouldPlaceTrapPattern) {
                    const trapPattern = createTrapPattern(enemyPos.x, enemyPos.y, 100, 4);
                    
                    if (trapPattern.length > 0) {
                        const pos = trapPattern[0];
                        if (player.items[4] > 0) {
                            this.testCanPlace(
                                4,
                                pos.angle - Math.PI/12,
                                pos.angle + Math.PI/12,
                                Math.PI/32,
                                pos.angle
                            );
                            this.lastTrapPatternPlace = game.TICK;
                        }
                    }
                }
                
                const shouldPlaceDefensive = (
                    enemy.length > 2 && 
                    player.items[itemId] > 5 && 
                    nearDistance < 100 &&
                    (!this.lastDefensivePlace || (game.TICK - this.lastDefensivePlace) > 20)
                );
                
                if (shouldPlaceDefensive) {
                    placeDefensiveStructures(danger);
                    this.lastDefensivePlace = game.TICK;
                }
                
                const hasNearbyTraps = gameObjects.some(obj => 
                    obj.trap && 
                    obj.active && 
                    obj.isTeamObject(player) &&
                    UTILS.getDistance(player.x2, player.y2, obj.x, obj.y) < 250
                );
                
                const enemyTrapped = hasNearbyTraps && gameObjects.some(obj => 
                    obj.trap && 
                    obj.active && 
                    obj.isTeamObject(player) &&
                    UTILS.getDistance(obj.x, obj.y, near.x2, near.y2) <= near.scale + obj.getScale() + 15
                );
                
                const shouldPlaceSpikesAroundTraps = (
                    player.items[2] >= 1 && 
                    nearDistance < 300 && 
                    hasNearbyTraps &&
                    (!this.lastSpikesAroundTrapsPlace || (game.TICK - this.lastSpikesAroundTrapsPlace) > (enemyTrapped ? 6 : 8))
                );
                
                if (shouldPlaceSpikesAroundTraps) {
                    placeSpikesAroundTraps();
                    this.lastSpikesAroundTrapsPlace = game.TICK;
                }
                
                if (enemyTrapped && player.items[2] >= 1 && 
                    (!this.lastAggressiveSpikePlace || (game.TICK - this.lastAggressiveSpikePlace) > 3)) {
                    
                    const trappedTrap = gameObjects.find(obj => 
                        obj.trap && 
                        obj.active && 
                        obj.isTeamObject(player) &&
                        UTILS.getDistance(obj.x, obj.y, near.x2, near.y2) <= near.scale + obj.getScale() + 15
                    );
                    
                    if (trappedTrap) {
                        const trapToEnemyAngle = Math.atan2(near.y2 - trappedTrap.y, near.x2 - trappedTrap.x);
                        
                        const arcStart = trapToEnemyAngle - Math.PI/2;
                        const arcEnd = trapToEnemyAngle + Math.PI/2;
                        
                        for (let i = 0; i < 3; i++) {
                            const angle = arcStart + (arcEnd - arcStart) * (i / 2);
                            const radius = 65;
                            const x = trappedTrap.x + radius * Math.cos(angle);
                            const y = trappedTrap.y + radius * Math.sin(angle);
                            
                            if (objectManager.checkItemLocation(x, y, 20, 0.6, 2, false, player) && player.items[2] > 0) {
                                const spikeAngle = angle + Math.PI;
                                this.testCanPlace(2, spikeAngle - Math.PI/16, spikeAngle + Math.PI/16, Math.PI/32, spikeAngle);
                            }
                        }
                    }
                    
                    this.lastAggressiveSpikePlace = game.TICK;
                }
            }
        };

        function calculatePerfectAngle(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
        }

        function findStrategicAngles(enemyPos, playerPos, itemScale) {
            const angles = [];
            const baseAngle = Math.atan2(enemyPos.y - playerPos.y, enemyPos.x - playerPos.x);
            const optimalRadius = 120 + itemScale;
            
            const strategicOffsets = [
                0,
                Math.PI/4,
                -Math.PI/4,
                Math.PI/2,
                -Math.PI/2,
                Math.PI,
                Math.PI*3/4,
                -Math.PI*3/4
            ];
            
            for (const offset of strategicOffsets) {
                const angle = baseAngle + offset;
                const x = enemyPos.x + optimalRadius * Math.cos(angle);
                const y = enemyPos.y + optimalRadius * Math.sin(angle);
                
                if (objectManager.checkItemLocation(x, y, itemScale, 0.6, 2, false, player)) {
                    angles.push({
                        x, y, angle,
                        priority: Math.abs(offset) < Math.PI/6 ? 3 : Math.abs(offset) < Math.PI/3 ? 2 : 1
                    });
                }
            }
            
            return angles.sort((a, b) => b.priority - a.priority);
        }

        function createTrapPattern(centerX, centerY, radius, itemId) {
            const patterns = [];
            const item = items.list[player.items[itemId]];
            if (!item) return patterns;
            
            const starAngles = [0, 2*Math.PI/5, 4*Math.PI/5, 6*Math.PI/5, 8*Math.PI/5];
            for (const angle of starAngles) {
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                if (objectManager.checkItemLocation(x, y, item.scale, 0.6, item.id, false, player)) {
                    patterns.push({ x, y, angle });
                }
            }
            
            const circleAngles = 8;
            for (let i = 0; i < circleAngles; i++) {
                const angle = (i * 2 * Math.PI) / circleAngles;
                const x = centerX + (radius * 0.7) * Math.cos(angle);
                const y = centerY + (radius * 0.7) * Math.sin(angle);
                
                if (objectManager.checkItemLocation(x, y, item.scale, 0.6, item.id, false, player)) {
                    patterns.push({ x, y, angle });
                }
            }
            
            return patterns;
        }

        function placeSpikesAroundTraps() {
            if (player.items[2] < 1) return;
            
            const nearbyTraps = gameObjects.filter(obj => 
                obj.trap && 
                obj.active && 
                obj.isTeamObject(player) &&
                UTILS.getDistance(player.x2, player.y2, obj.x, obj.y) < 350
            );
            
            if (nearbyTraps.length === 0) return;
            
            const enemyTrapped = nearbyTraps.some(trap => {
                const distToEnemy = UTILS.getDistance(trap.x, trap.y, near.x2, near.y2);
                return distToEnemy <= near.scale + trap.getScale() + 10;
            });
            
            let bestTrap = null;
            let bestScore = -Infinity;
            
            for (const trap of nearbyTraps) {
                const distToEnemy = UTILS.getDistance(trap.x, trap.y, near.x2, near.y2);
                const distToPlayer = UTILS.getDistance(trap.x, trap.y, player.x2, player.y2);
                const score = (300 - distToEnemy) - (distToPlayer * 0.5);
                
                if (score > bestScore) {
                    bestScore = score;
                    bestTrap = trap;
                }
            }
            
            if (!bestTrap) return;
            
            const trapToEnemyAngle = Math.atan2(near.y2 - bestTrap.y, near.x2 - bestTrap.x);
            const enemyVel = { x: near.x2 - near.x1, y: near.y2 - near.y1 };
            const enemyMovementAngle = (enemyVel.x !== 0 || enemyVel.y !== 0)
                ? Math.atan2(enemyVel.y, enemyVel.x)
                : trapToEnemyAngle;
            
            let spikeAngles = [];
            
            if (enemyTrapped) {
                const trapToEnemyAngle = Math.atan2(near.y2 - bestTrap.y, near.x2 - bestTrap.x);
                
                const arcStart = trapToEnemyAngle - Math.PI/3; 
                const arcEnd = trapToEnemyAngle + Math.PI/3;
                const numAngles = 12;
                
                for (let i = 0; i < numAngles; i++) {
                    const angle = arcStart + (arcEnd - arcStart) * (i / (numAngles - 1));
                    const radius = 65;
                    const x = bestTrap.x + radius * Math.cos(angle);
                    const y = bestTrap.y + radius * Math.sin(angle);
                    
                    if (objectManager.checkItemLocation(x, y, 20, 0.6, 2, false, player)) {
                        const spikeAngle = angle + Math.PI;
                        spikeAngles.push({ x, y, angle: spikeAngle });
                    }
                }
                
                const innerRadius = 45;
                for (let i = 0; i < 8; i++) {
                    const angle = arcStart + (arcEnd - arcStart) * (i / 7);
                    const x = bestTrap.x + innerRadius * Math.cos(angle);
                    const y = bestTrap.y + innerRadius * Math.sin(angle);
                    
                    if (objectManager.checkItemLocation(x, y, 20, 0.6, 2, false, player)) {
                        const spikeAngle = angle + Math.PI;
                        spikeAngles.push({ x, y, angle: spikeAngle });
                    }
                }
                
                const strategicOffsets = [-Math.PI/6, -Math.PI/12, 0, Math.PI/12, Math.PI/6];
                for (const offset of strategicOffsets) {
                    const angle = trapToEnemyAngle + offset;
                    const x = bestTrap.x + 55 * Math.cos(angle);
                    const y = bestTrap.y + 55 * Math.sin(angle);
                    
                    if (objectManager.checkItemLocation(x, y, 20, 0.6, 2, false, player)) {
                        const spikeAngle = angle + Math.PI;
                        spikeAngles.push({ x, y, angle: spikeAngle });
                    }
                }
                
                const backupRadius = 75;
                for (let i = 0; i < 4; i++) {
                    const angle = (i * Math.PI / 2) + trapToEnemyAngle;
                    const x = bestTrap.x + backupRadius * Math.cos(angle);
                    const y = bestTrap.y + backupRadius * Math.sin(angle);
                    
                    if (objectManager.checkItemLocation(x, y, 20, 0.6, 2, false, player)) {
                        const spikeAngle = angle + Math.PI;
                        spikeAngles.push({ x, y, angle: spikeAngle });
                    }
                }
            } else {
                const combinedAngle = (trapToEnemyAngle + enemyMovementAngle) / 2;
                
                const pushAngles = [
                    combinedAngle + Math.PI/6,
                    combinedAngle - Math.PI/6,
                    combinedAngle + Math.PI/4, 
                    combinedAngle - Math.PI/4,
                    combinedAngle + Math.PI/8,
                    combinedAngle - Math.PI/8,
                    combinedAngle + Math.PI/12,
                    combinedAngle - Math.PI/12
                ];
                
                for (const angle of pushAngles) {
                    const x = bestTrap.x + 60 * Math.cos(angle);
                    const y = bestTrap.y + 60 * Math.sin(angle);
                    
                    if (objectManager.checkItemLocation(x, y, 20, 0.6, 2, false, player)) {
                        spikeAngles.push({ x, y, angle });
                    }
                }
            }
            
            const evaluatedSpikes = spikeAngles.map(spike => {
                const distToEnemy = UTILS.getDistance(spike.x, spike.y, near.x2, near.y2);
                const distToTrap = UTILS.getDistance(spike.x, spike.y, bestTrap.x, bestTrap.y);
                
                const spikeToTrapAngle = Math.atan2(bestTrap.y - spike.y, bestTrap.x - spike.x);
                const angleAlignment = Math.abs(spike.angle - spikeToTrapAngle);
                const angleAlignmentScore = (Math.PI - angleAlignment) * 100;
                
                const spikeToEnemyAngle = Math.atan2(near.y2 - spike.y, near.x2 - spike.x);
                const coverageScore = (Math.PI - Math.abs(spike.angle - spikeToEnemyAngle)) * 50;
                
                let score = (200 - distToEnemy) + (100 - Math.abs(distToTrap - 60)) + angleAlignmentScore + coverageScore;
                
                if (enemyTrapped) {
                    score += 500;
                    if (angleAlignment < Math.PI/6) {
                        score += 300;
                    }
                }
                
                return { ...spike, score };
            }).sort((a, b) => b.score - a.score);
            
            const maxSpikes = enemyTrapped ? Math.min(3, evaluatedSpikes.length, player.items[2]) : Math.min(2, evaluatedSpikes.length, player.items[2]);
            
            for (let i = 0; i < maxSpikes; i++) {
                const spike = evaluatedSpikes[i];
                if (player.items[2] > 0) {
                    const baseAngle = spike.angle;
                    const attempts = [
                        baseAngle,
                        baseAngle + Math.PI/32,
                        baseAngle - Math.PI/32,
                        baseAngle + Math.PI/16,
                        baseAngle - Math.PI/16,
                        baseAngle + Math.PI/32,
                        baseAngle - Math.PI/32
                    ];
                    
                    for (const attemptAngle of attempts) {
                        if (checkPlace(2, attemptAngle)) {
                            break;
                        }
                    }
                }
            }
        }

        function analyzeThreatLevel() {
            const threats = [];
            
            for (const enemyPlayer of enemy) {
                if (enemyPlayer && enemyPlayer.active) {
                    const dist = UTILS.getDist(player, enemyPlayer, 0, 2);
                    const weaponRange = items.weapons[enemyPlayer.primaryIndex || 0].range + enemyPlayer.scale * 1.8;
                    const isInRange = dist <= weaponRange;
                    const isSpikeWeapon = [3, 4, 5].includes(enemyPlayer.primaryIndex);
                    
                    threats.push({
                        enemy: enemyPlayer,
                        distance: dist,
                        isInRange,
                        isSpikeWeapon,
                        priority: isSpikeWeapon && isInRange ? 3 : isInRange ? 2 : 1
                    });
                }
            }
            
            return threats.sort((a, b) => b.priority - a.priority);
        }

        function placeDefensiveStructures(danger) {
            const threats = analyzeThreatLevel();
            if (threats.length === 0) return;
            
            const primaryThreat = threats[0];
            const threatPos = { x: primaryThreat.enemy.x2, y: primaryThreat.enemy.y2 };
            const playerPos = { x: player.x2, y: player.y2 };
            
            const barrierAngles = [];
            const baseAngle = Math.atan2(threatPos.y - playerPos.y, threatPos.x - playerPos.x);
            
            for (let i = -1; i <= 1; i++) {
                const angle = baseAngle + (i * Math.PI/4);
                barrierAngles.push(angle);
            }
            
            if (barrierAngles.length > 0) {
                const angle = barrierAngles[0];
                const x = playerPos.x + 80 * Math.cos(angle);
                const y = playerPos.y + 80 * Math.sin(angle);
                
                const itemId = danger ? 2 : 4;
                const item = items.list[player.items[itemId]];
                if (!item) return;
                
                if (objectManager.checkItemLocation(x, y, item.scale, 0.6, item.id, false, player)) {
                    this.testCanPlace(
                        itemId,
                        angle - Math.PI/12,
                        angle + Math.PI/12,
                        Math.PI/32,
                        angle
                    );
                }
            }
        }
        function isObjectBroken(object) {
            const healthThreshold = 20;
            return object.health < healthThreshold;
        }

        function analyzeReplacementStrategy(findObj, nearDistance, objDst) {
            const enemyWeaponRange = items.weapons[near.primaryIndex || 0].range + (near.scale * 1.8);
            const isEnemyInRange = nearDistance <= enemyWeaponRange;
            const isSpikeWeapon = [3, 4, 5].includes(near.primaryIndex);
            
            const nearbyStructures = gameObjects.filter(obj => 
                obj.active && 
                (obj.trap || obj.blocker) &&
                UTILS.getDistance(findObj.x, findObj.y, obj.x, obj.y) < 200
            );
            
            const structureDensity = nearbyStructures.length;
            
            if (isSpikeWeapon && isEnemyInRange) {
                return {
                    itemType: 2,
                    priority: 'high',
                    reason: 'enemy_spike_weapon'
                };
            } else if (structureDensity >= 3) {
                return {
                    itemType: 4,
                    priority: 'medium',
                    reason: 'high_structure_density'
                };
            } else if (player.items[4] === 15 && !isEnemyInRange) {
                return {
                    itemType: 4,
                    priority: 'medium',
                    reason: 'safe_trap_placement'
                };
            } else {
                return {
                    itemType: 2,
                    priority: 'normal',
                    reason: 'default_strategy'
                };
            }
        }

        function calculateOptimalPlacementAngle(findObj, strategy) {
            let baseAngle = Math.atan2(findObj.y - player.y2, findObj.x - player.x2);
            
            const enemyVel = { x: near.x2 - near.x1, y: near.y2 - near.y1 };
            if (enemyVel.x !== 0 || enemyVel.y !== 0) {
                const enemyVelAngle = Math.atan2(enemyVel.y, enemyVel.x);
                const angleDiff = Math.abs(baseAngle - enemyVelAngle);
                if (angleDiff < Math.PI/2) {
                    baseAngle = (baseAngle + enemyVelAngle) / 2;
                }
            }
            
            if (strategy.itemType === 4) {
                const nearbyTraps = gameObjects.filter(obj => 
                    obj.trap && 
                    obj.active && 
                    obj.isTeamObject(player) &&
                    UTILS.getDistance(findObj.x, findObj.y, obj.x, obj.y) < 150
                );
                
                if (nearbyTraps.length > 0) {
                    const trapAngle = Math.atan2(nearbyTraps[0].y - findObj.y, nearbyTraps[0].x - findObj.x);
                    return (baseAngle + trapAngle) / 2;
                }
            }
            
            return baseAngle;
        }
        this.replacer = function(findObj) {
            if (!findObj || !configs.autoReplace) return;
            if (!inGame) return;
            if (this.antiTrapped) return;

            game.tickBase(() => {
                const nearDistance = UTILS.getDist(player, near, 0, 2);
                const objDst = UTILS.getDist(findObj, player, 0, 2);
                const objToEnemyDist = UTILS.getDist(findObj, near, 0, 2);

                if (verify("weaponGrind") && verify("weaponGrind").checked && 
                    objDst <= items.weapons[player.weaponIndex].range + player.scale) return;

                const shouldReplace = (
                    objDst <= 350 &&
                    nearDistance <= 350 &&
                    objToEnemyDist <= 200 &&
                    nearDistance <= 400
                );

                if (!shouldReplace) return;

                const strategy = analyzeReplacementStrategy(findObj, nearDistance, objDst);
                const placementAngle = calculateOptimalPlacementAngle(findObj, strategy);
                
                if (player.items[strategy.itemType] <= 0) {
                    if (strategy.itemType === 4 && player.items[2] > 0) {
                        strategy.itemType = 2;
                    } else if (player.items[2] <= 0) {
                        return;
                    }
                }

                const angleAttempts = [
                    placementAngle,
                    placementAngle + Math.PI/32,
                    placementAngle - Math.PI/32
                ];
                
                let placementSuccess = false;
                for (const angle of angleAttempts) {
                    if (checkPlace(strategy.itemType, angle)) {
                        placementSuccess = true;
                        break;
                    }
                }
                
                if (!placementSuccess && strategy.itemType === 4 && player.items[2] > 0 && 
                    (!this.lastReplacerFallback || (game.TICK - this.lastReplacerFallback) > 5)) {
                    
                    for (const angle of angleAttempts) {
                        if (checkPlace(2, angle)) {
                            placementSuccess = true;
                            this.lastReplacerFallback = game.TICK;
                            break;
                        }
                    }
                }

                if (placementSuccess) {
                    this.replaced = true;
                    
                    const enemyWeaponRange = items.weapons[near.primaryIndex || 0].range + (near.scale * 1.8);
                    if (strategy.itemType === 2 && nearDistance <= enemyWeaponRange && configs.spikeTick) {
                        instaC.canSpikeTick = true;
                    }
                }
            }, 1);
        }
    }
}

class Instakill {
    constructor() {
        this.wait = false;
        this.can = false;
        this.isTrue = false;
        this.nobull = false;
        this.ticking = false;
        this.canSpikeTick = false;
        this.startTick = false;
        this.readyTick = false;
        this.canCounter = false;
        this.revTick = false;
        this.syncHit = false;

        this.changeType = function (type) {
            this.wait = false;
            this.isTrue = true;
            HANS.autoAim = true;
            near.backupNobull = false;

            const actions = {
                "rev": () => this.handleInstakill("rev"),
                "nobull": () => this.handleInstakill("nobull"),
                "normal": () => this.handleInstakill("normal"),
                "default": () => {
                    setTimeout(() => {
                        this.resetAutoAim();
                    }, 50);
                },
            };

            (actions[type] || actions.default)();
        };

        /**
         * @param {string} type - Tipo de instakill ("rev", "nobull", "normal").
         */
        this.handleInstakill = function (type) {
            whenInstaHeal();

            if (type === "rev") {
                selectWeapon(player.weapons[1]);
                buyEquip(53, 0);
                sendAutoGather();
                setTimeout(() => {
                    this.finishInstakill(player.weapons[0], 7, 225);
                }, 100);
            } else {
                selectWeapon(player.weapons[0]);
                buyEquip(7, 0);
                buyEquip(21, 1);
                sendAutoGather();
                setTimeout(() => {
                    const equip = type === "nobull" && player.reloads[53] === 0 ? 53 : 6;
                    this.finishInstakill(player.weapons[1], equip, 255);
                }, type === "nobull" ? 105 : 100);
            }
        };

        /**
         * Completa el instakill y resetea las propiedades.
         * @param {Object} weapon - Arma a seleccionar.
         * @param {number} equip - Equipo a comprar.
         * @param {number} delay - Tiempo de espera para completar.
         */
        this.finishInstakill = function (weapon, equip, delay) {
            selectWeapon(weapon);
            buyEquip(equip, 0);
            setTimeout(() => {
                sendAutoGather();
                this.resetAutoAim();
            }, delay);
        };

        /**
         * Resetea las propiedades relacionadas con auto-aim.
         */
        this.resetAutoAim = function () {
            this.isTrue = false;
            HANS.autoAim = false;
        };


        this.spikeTickType = function() {
            this.isTrue = true;
            HANS.autoAim = true;
            selectWeapon(player.weapons[0]);
            buyEquip(7, 0);
            sendAutoGather();
            game.tickBase(() => {
                buyEquip(53, 0);
                selectWeapon(player.weapons[0]);
                buyEquip(53, 0);
                game.tickBase(() => {
                    sendAutoGather();
                    this.isTrue = false;
                    HANS.autoAim = false;
                    buyEquip(6, 0);
                    buyEquip(21, 1);
                }, 3);
            }, 1);
        };

        this.counterType = function() {
            this.isTrue = true;
            HANS.autoAim = true;
            HANS.revAim = true;
            selectWeapon(player.weapons[1]);
            buyEquip(53, 0);
            buyEquip(19, 1);
            sendAutoGather();
            packet("f", near.aim2, 1);
            game.tickBase(() => {
                HANS.revAim = false;
                selectWeapon(player.weapons[0]);
                buyEquip(7, 0);
                buyEquip(19, 1);
                packet("f", near.aim2, 1);
                game.tickBase(() => {
                    sendAutoGather();
                    this.isTrue = false;
                    HANS.autoAim = false;
                    packet("f", undefined, 1);
                }, 1);
            }, 1);
        };

        this.antiCounterType = function() {
            HANS.autoAim = true;
            this.isTrue = true;
            selectWeapon(player.weapons[0]);
            buyEquip(6, 0);
            buyEquip(21, 1);
            io.send("D", near.aim2);
            sendAutoGather();
            game.tickBase(() => {
                buyEquip(player.reloads[53] == 0 ? player.skins[53] ? 53 : 6 : 6, 0);
                buyEquip(21, 1);
                game.tickBase(() => {
                    sendAutoGather();
                    this.isTrue = false;
                    HANS.autoAim = false;
                }, 1);
            }, 1);
        };

        this.rangeType = function(type) {
            this.isTrue = true;
            HANS.autoAim = true;
            if (type === "ageInsta") {
                this.ageInstaKill();
            } else {
                this.rangeInstaKill();
            }
        };

        this.ageInstaKill = function() {
            HANS.ageInsta = false;
            if (player.items[5] === 18) {
                place(5, near.aim2);
            }
            packet("f", undefined, 1);
            buyEquip(22, 0);
            buyEquip(21, 1);
            game.tickBase(() => {
                selectWeapon(player.weapons[1]);
                buyEquip(53, 0);
                buyEquip(21, 1);
                sendAutoGather();
                game.tickBase(() => {
                    sendUpgrade(12);
                    selectWeapon(player.weapons[1]);
                    buyEquip(53, 0);
                    buyEquip(21, 1);
                    game.tickBase(() => {
                        sendUpgrade(15);
                        selectWeapon(player.weapons[1]);
                        buyEquip(53, 0);
                        buyEquip(21, 1);
                        game.tickBase(() => {
                            sendAutoGather();
                            this.isTrue = false;
                            HANS.autoAim = false;
                        }, 1);
                    }, 1);
                }, 1);
            }, 1);
        };

        this.rangeInstaKill = function() {
            selectWeapon(player.weapons[1]);
            if (player.reloads[53] == 0 && near.dist2 <= 700 && near.skinIndex != 22) {
                buyEquip(53, 0);
            } else {
                buyEquip(20, 0);
            }
            buyEquip(0, 1);
            sendAutoGather();
            game.tickBase(() => {
                sendAutoGather();
                this.isTrue = false;
                HANS.autoAim = false;
            }, 1);
        };

        this.oneTickType = function() {
            io.send("7113213.29154");
            this.isTrue = true;
            HANS.autoAim = true;
            selectWeapon(player.weapons[1]);
            buyEquip(53, 0);
            buyEquip(19, 1);
            packet("f", near.aim2, 1);
            if (player.weapons[1] == 15) {
                HANS.revAim = true;
                sendAutoGather();
            }
            game.tickBase(() => {
                HANS.revAim = false;
                selectWeapon(player.weapons[0]);
                buyEquip(7, 0);
                buyEquip(19, 1);
                packet("f", near.aim2, 1);
                if (player.weapons[1] != 15) {
                    sendAutoGather();
                }
                game.tickBase(() => {
                    sendAutoGather();
                    this.isTrue = false;
                    HANS.autoAim = false;
                    packet("f", undefined, 1);
                }, 1);
            }, 1);
        };

        this.threeOneTickType = function() {
            io.send("Tick2");
            this.isTrue = true;
            HANS.autoAim = true;
            selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
            biomeGear();
            buyEquip(19, 1);
            packet("f", near.aim2, 1);
            game.tickBase(() => {
                selectWeapon(player.weapons[[10, 14].includes(player.weapons[1]) ? 1 : 0]);
                buyEquip(53, 0);
                buyEquip(19, 1);
                packet("f", near.aim2, 1);
                game.tickBase(() => {
                    selectWeapon(player.weapons[0]);
                    buyEquip(7, 0);
                    buyEquip(19, 1);
                    sendAutoGather();
                    packet("f", near.aim2, 1);
                    game.tickBase(() => {
                        sendAutoGather();
                        this.isTrue = false;
                        HANS.autoAim = false;
                        packet("f", undefined, 1);
                    }, 1);
                }, 1);
            }, 1);
        };

        this.kmTickType = function() {
            this.isTrue = true;
            HANS.autoAim = true;
            HANS.revAim = true;
            selectWeapon(player.weapons[1]);
            buyEquip(53, 0);
            buyEquip(19, 1);
            sendAutoGather();
            packet("f", near.aim2, 1);
            game.tickBase(() => {
                HANS.revAim = false;
                selectWeapon(player.weapons[0]);
                buyEquip(7, 0);
                buyEquip(19, 1);
                packet("f", near.aim2, 1);
                game.tickBase(() => {
                    sendAutoGather();
                    this.isTrue = false;
                    HANS.autoAim = false;
                    packet("f", undefined, 1);
                }, 1);
            }, 1);
        };

        this.boostTickType = function() {
            this.isTrue = true;
            HANS.autoAim = true;
            biomeGear();
            buyEquip(19, 1);
            packet("f", near.aim2, 1);
            game.tickBase(() => {
                if (player.weapons[1] == 15) {
                    HANS.revAim = true;
                }
                selectWeapon(player.weapons[[9, 12, 13, 15].includes(player.weapons[1]) ? 1 : 0]);
                buyEquip(53, 0);
                buyEquip(19, 1);
                if ([9, 12, 13, 15].includes(player.weapons[1])) {
                    sendAutoGather();
                }
                packet("f", near.aim2, 1);
                place(4, near.aim2);
                game.tickBase(() => {
                    HANS.revAim = false;
                    selectWeapon(player.weapons[0]);
                    buyEquip(7, 0);
                    buyEquip(19, 1);
                    if (![9, 12, 13, 15].includes(player.weapons[1])) {
                        sendAutoGather();
                    }
                    packet("f", near.aim2, 1);
                    game.tickBase(() => {
                        sendAutoGather();
                        this.isTrue = false;
                        HANS.autoAim = false;
                        packet("f", undefined, 1);
                    }, 1);
                }, 1);
            }, 1);
        };

        class MovementController {
            constructor(config) {
                this.config = config;
                this.ticking = false;
            }

            calculateDistanceRanges(goto, offset) {
                const scales = [1, 2, 4];
                const ranges = {
                    target: {
                        min: goto - offset,
                        max: goto + offset
                    }
                };

                scales.forEach(scale => {
                    const scaledDist = scale * this.config.playerScale;
                    ranges[`scale${scale}`] = {
                        min: goto - scaledDist,
                        max: goto + scaledDist
                    };
                });

                return ranges;
            }

            handleEquipment(primaryId, secondaryId) {
                const isInRiver = player.y2 >= this.config.mapScale / 2 - this.config.riverWidth / 2 &&
                                 player.y2 <= this.config.mapScale / 2 + this.config.riverWidth / 2;

                if (isInRiver && primaryId === 0) {
                    buyEquip(31, 0);
                } else {
                    buyEquip(primaryId, 0);
                }
                buyEquip(secondaryId, 1);
            }

            selectAppropriateWeapon() {
                const weaponIndex = [10, 14].includes(player.weapons[1]) ? 1 : 0;
                const desiredWeapon = player.weapons[weaponIndex];

                if (player.weaponIndex !== desiredWeapon || player.buildIndex > -1) {
                    selectWeapon(desiredWeapon);
                }
            }

            getEquipmentSetup(distance, ranges) {
                if (distance >= ranges.target.min && distance <= ranges.target.max) {
                    return { primary: 22, secondary: 11 };
                }

                if (distance <= ranges.scale4.min || distance >= ranges.scale4.max) {
                    return { primary: 'biome', secondary: 11 };
                }

                if (distance <= ranges.scale2.min || distance >= ranges.scale2.max) {
                    return { primary: 6, secondary: 12 };
                }

                if (distance <= ranges.scale1.min || distance >= ranges.scale1.max) {
                    return { primary: 22, secondary: 0 };
                }

                return { primary: 40, secondary: 0 };
            }

            gotoGoal(goto, offset) {
                if (!enemy.length) {
                    this.ticking = false;
                    return { dir: undefined, action: 0 };
                }

                const distance = near.dist2;
                const ranges = this.calculateDistanceRanges(goto, offset);
                this.ticking = true;

                if (distance >= ranges.target.min && distance <= ranges.target.max) {
                    this.handleEquipment(22, 11);
                    this.selectAppropriateWeapon();
                    return { dir: undefined, action: 1 };
                }

                const equipment = this.getEquipmentSetup(distance, ranges);

                if (equipment.primary === 'biome') {
                    biomeGear();
                } else {
                    this.handleEquipment(equipment.primary, equipment.secondary);
                }

                if (configs.none && distance <= ranges.scale1.max && distance >= ranges.scale1.min) {
                    if (player.buildIndex !== player.items[1]) {
                        selectToBuild(player.items[1]);
                    }
                } else {
                    this.selectAppropriateWeapon();
                }

                const moveDir = distance < ranges.target.min ?
                    near.aim2 + Math.PI :
                    (distance > ranges.target.max ? near.aim2 : undefined);

                return { dir: moveDir, action: 0 };
            }
        }

        const movementController = new MovementController(config);

        this.bowMovement = function() {
            let moveMent = this.gotoGoal(685, 3);
            if (moveMent.action) {
                if (player.reloads[53] == 0 && !this.isTrue) {
                    this.rangeType("ageInsta");
                } else {
                    packet("f", moveMent.dir, 1);
                }
            } else {
                packet("f", moveMent.dir, 1);
            }
        };

        this.tickMovement = function() {
            let moveMent = this.gotoGoal(238, 3);
            if (moveMent.action) {
                if (player.reloads[53] == 0 && !this.isTrue) {
                    this.boostTickType();
                } else {
                    packet("f", moveMent.dir, 1);
                }
            } else {
                packet("f", moveMent.dir, 1);
            }
        };

        this.kmTickMovement = function() {
            let moveMent = this.gotoGoal(240, 3);
            if (moveMent.action) {
                if (near.skinIndex != 22 && player.reloads[53] == 0 && !this.isTrue && ((game.TICK - near.poisonTick) % config.serverUpdateRate == 8)) {
                    this.kmTickType();
                } else {
                    packet("f", moveMent.dir, 1);
                }
            } else {
                packet("f", moveMent.dir, 1);
            }
        };

        this.boostTickMovement = function() {
            let dist = player.weapons[1] == 9 ? 365 : player.weapons[1] == 12 ? 380 : player.weapons[1] == 13 ? 365 : player.weapons[1] == 15 ? 365 : 370;
            let moveMent = this.gotoGoal(372, 3);
            if (moveMent.action) {
                if (player.reloads[53] == 0 && !this.isTrue) {
                    this.boostTickType();
                } else {
                    packet("f", moveMent.dir, 1);
                }
            } else {
                packet("f", moveMent.dir, 1);
            }
        };

        this.perfCheck = function (pl, nr) {
            if (nr.weaponIndex === 11 && UTILS.getAngleDist(nr.aim2 + Math.PI, nr.d2) <= config.shieldAngle) {
                return false;
            }

            if (![9, 12, 13, 15].includes(player.weapons[1])) {
                return true;
            }

            const pjs = {
                x: nr.x2 + 65 * Math.cos(nr.aim2 + Math.PI),
                y: nr.y2 + 65 * Math.sin(nr.aim2 + Math.PI)
            };

            if (UTILS.lineInRect(
                pl.x2 - pl.scale, pl.y2 - pl.scale,
                pl.x2 + pl.scale, pl.y2 + pl.scale,
                pjs.x, pjs.y, pjs.x, pjs.y
            )) {
                return true;
            }

            const isCollidingWithAI = ais.some(tmp =>
                tmp.visible && UTILS.lineInRect(
                    tmp.x2 - tmp.scale, tmp.y2 - tmp.scale,
                    tmp.x2 + tmp.scale, tmp.y2 + tmp.scale,
                    pjs.x, pjs.y, pjs.x, pjs.y
                )
            );

            if (isCollidingWithAI) {
                return false;
            }

            const isCollidingWithObjects = lstOfObjects.some(tmp => {
                if (!tmp.active || tmp.ignoreCollision) return false;
                const tmpScale = tmp.getScale();
                return UTILS.lineInRect(
                    tmp.x - tmpScale, tmp.y - tmpScale,
                    tmp.x + tmpScale, tmp.y + tmpScale,
                    pjs.x, pjs.y, pjs.x, pjs.y
                );
            });

            if (isCollidingWithObjects) {
                return false;
            }

            return true;
        };

    }
}

class Autobuy {
    constructor(buyHat, buyAcc) {
        this.hat = function() {
            buyHat.forEach((id) => {
                let find = findID(hats, id);
                if (find && !player.skins[id] && player.points >= find.price) packet("c", 1, id, 0);
            });
        };
        this.acc = function() {
            buyAcc.forEach((id) => {
                let find = findID(accessories, id);
                if (find && !player.tails[id] && player.points >= find.price) packet("c", 1, id, 1);
            });
        };
    }
};


class Autoupgrade {
    constructor() {
        this.sb = function(upg) {
            upg(3);
            upg(17);
            upg(31);
            upg(23);
            upg(9);
            upg(38);
        };
        this.kh = function(upg) {
            upg(3);
            upg(17);
            upg(31);
            upg(23);
            upg(10);
            upg(38);
            upg(4);
            upg(25);
        };
        this.pb = function(upg) {
            upg(5);
            upg(17);
            upg(32);
            upg(23);
            upg(9);
            upg(38);
        };
        this.ph = function(upg) {
            upg(5);
            upg(17);
            upg(32);
            upg(23);
            upg(10);
            upg(38);
            upg(28);
            upg(25);
        };
        this.db = function(upg) {
            upg(7);
            upg(17);
            upg(31);
            upg(23);
            upg(9);
            upg(34);
        };
        this.km = function(upg) {
            upg(7);
            upg(17);
            upg(31);
            upg(23);
            upg(10);
            upg(38);
            upg(4);
            upg(15);
        };
    };
};

class Damages {
    constructor(items) {
        this.calcDmg = function(dmg, val) {
            return dmg * val;
        };
        this.getAllDamage = function(dmg) {
            return [this.calcDmg(dmg, 0.75), dmg, this.calcDmg(dmg, 1.125), this.calcDmg(dmg, 1.5)];
        };
        this.weapons = [];
        for (let i = 0; i < items.weapons.length; i++) {
            let wp = items.weapons[i];
            let name = wp.name.split(" ").length <= 1 ? wp.name : (wp.name.split(" ")[0] + "_" + wp.name.split(" ")[1]);
            this.weapons.push(this.getAllDamage(i > 8 ? wp.Pdmg : wp.dmg));
            this[name] = this.weapons[i];
        }
    }
}

let tmpList = [];
let UTILS = new Utils();
let items = new Items();
let objectManager = new Objectmanager(GameObject, gameObjects, UTILS, config);
let store = new Store();
let hats = store.hats;
let accessories = store.accessories;
let projectileManager = new ProjectileManager(Projectile, projectiles, players, ais, objectManager, items, config, UTILS);
let aiManager = new AiManager(ais, AI, players, items, null, config, UTILS);
let textManager = new Textmanager();

let playerConditions = new Traps(UTILS, items);
let instaC = new Instakill();
let autoBuy = new Autobuy([40, 6, 7, 22, 53, 15, 31], [11, 21, 18, 13]);
let autoUpgrade = new Autoupgrade();

let lastDeath;
let minimapData;
let mapMarker = {};
let mapPings = [];
let tmpPing;

let antiinsta = true;
let antiinsta1 = false;

function sendChat(message) {
    packet("6", message.slice(0, 30));
}

let runAtNextTick = [];

function checkProjectileHolder(x, y, dir, range, speed, indx, layer, sid) {
    let weaponIndx = indx == 0 ? 9 : indx == 2 ? 12 : indx == 3 ? 13 : indx == 5 && 15;
    let projOffset = config.playerScale * 2;
    let projXY = {
        x: indx == 1 ? x : x - projOffset * Math.cos(dir),
        y: indx == 1 ? y : y - projOffset * Math.sin(dir),
    };
    let nearPlayer = players.filter((e) => e.visible && UTILS.getDist(projXY, e, 0, 2) <= e.scale).sort(function(a, b) {
        return UTILS.getDist(projXY, a, 0, 2) - UTILS.getDist(projXY, b, 0, 2);
    })[0];
    if (nearPlayer) {
        if (indx == 1) {
            nearPlayer.shooting[53] = 1;
        } else {
            nearPlayer.shootIndex = weaponIndx;
            nearPlayer.shooting[1] = 1;
            antiProj(nearPlayer, dir, range, speed, indx, weaponIndx);
        }
    }
}
let projectileCount = 0;

function antiProj(tmpObj, dir, range, speed, index, weaponIndex) {
    if (!tmpObj.isTeam(player)) {
        tmpDir = UTILS.getDirect(player, tmpObj, 2, 2);
        if (UTILS.getAngleDist(tmpDir, dir) <= 0.2) {
            tmpObj.bowThreat[weaponIndex]++;
            if (index == 5) {
                projectileCount++;
            }
            setTimeout(() => {
                tmpObj.bowThreat[weaponIndex]--;
                if (index == 5) {
                    projectileCount--;
                }
            }, range / speed);
            if (tmpObj.bowThreat[9] >= 1 && (tmpObj.bowThreat[12] >= 1 || tmpObj.bowThreat[15] >= 1)) {
                place(1, tmpObj.aim2);
                HANS.anti0Tick = 4;

                if (!HANS.antiSync) {
                    antiSyncHealing(4);
                }
            } else {
                if (projectileCount >= 2) {
                    place(1, tmpObj.aim2);
                    healing();
                    sendChat("sync is homo");
                    buyEquip(22, 0);
                    HANS.anti0Tick = 4;
                    if (!HANS.antiSync) {
                        antiSyncHealing(4);
                    }
                } else {
                    if (projectileCount === 1) {
                        buyEquip(6, 0);
                    } else {
                        if (projectileCount >= 2) {
                            healing();
                            buyEquip(6, 0);
                            return Math.ceil((100 - player.health) / items.list[player.items[0]].healing);
                        }
                    }
                }
            }
        }
    }
}

function showItemInfo(item, isWeapon, isStoreItem) {
    if (player && item) {
        UTILS.removeAllChildren(itemInfoHolder);
        itemInfoHolder.classList.add("visible");
        UTILS.generateElement({
            id: "itemInfoName",
            text: UTILS.capitalizeFirst(item.name),
            parent: itemInfoHolder
        });
        UTILS.generateElement({
            id: "itemInfoDesc",
            text: item.desc,
            parent: itemInfoHolder
        });
        if (isStoreItem) {

        } else if (isWeapon) {
            UTILS.generateElement({
                class: "itemInfoReq",
                text: !item.type ? "primary" : "secondary",
                parent: itemInfoHolder
            });
        } else {
            for (let i = 0; i < item.req.length; i += 2) {
                UTILS.generateElement({
                    class: "itemInfoReq",
                    html: item.req[i] + "<span class='itemInfoReqVal'> x" + item.req[i + 1] + "</span>",
                    parent: itemInfoHolder
                });
            }
            if (item.group.limit) {
                UTILS.generateElement({
                    class: "itemInfoLmt",
                    text: (player.itemCounts[item.group.id] || 0) + "/" + (config.isSandbox ? 99 : item.group.limit),
                    parent: itemInfoHolder
                });
            }
        }
    } else {
        itemInfoHolder.classList.remove("visible");
    }
}

window.addEventListener("resize", UTILS.checkTrusted(resize));

function resize() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    let scaleFillNative = Math.max(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight) * pixelDensity;
    gameCanvas.width = screenWidth * pixelDensity;
    gameCanvas.height = screenHeight * pixelDensity;
    gameCanvas.style.width = screenWidth + "px";
    gameCanvas.style.height = screenHeight + "px";
    mainContext.setTransform(
        scaleFillNative, 0,
        0, scaleFillNative,
        (screenWidth * pixelDensity - (maxScreenWidth * scaleFillNative)) / 2,
        (screenHeight * pixelDensity - (maxScreenHeight * scaleFillNative)) / 2
    );
}
resize();

var usingTouch;
const mals = document.getElementById('touch-controls-fullscreen');
mals.style.display = 'block';
mals.addEventListener("mousemove", gameInput, false);

function gameInput(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}
let clicks = {
    left: false,
    middle: false,
    right: false,
};
mals.addEventListener("mousedown", mouseDown, false);

function mouseDown(e) {
    if (attackState != 1) {
        attackState = 1;
        if (e.button == 0) {
            clicks.left = true;
        } else if (e.button == 1) {
            clicks.middle = true;
        } else if (e.button == 2) {
            clicks.right = true;
        }
    }
}
mals.addEventListener("mouseup", UTILS.checkTrusted(mouseUp));

function mouseUp(e) {
    if (attackState != 0) {
        attackState = 0;
        if (e.button == 0) {
            clicks.left = false;
        } else if (e.button == 1) {
            clicks.middle = false;
        } else if (e.button == 2) {
            clicks.right = false;
        }
    }
}

let wbe = 1;
let mWbe = 1;
let smothAnim = null;
function wheel(e, t = [null, 0]) {
    if (e.deltaY > 0) {
        if (maxScreenWidth < 5000) {
            mWbe = Math.min(mWbe + 0.35, 10);
        }
    } else if (maxScreenWidth > 500) {
        mWbe = Math.max(mWbe - 0.35, 0.1);
    }
    if (smothAnim) {
        clearInterval(smothAnim);
    }
    smothAnim =
        setInterval(() => {
        wbe += (mWbe - wbe) * 0.1;
        maxScreenWidth = config.maxScreenWidth * wbe;
        maxScreenHeight = config.maxScreenHeight * wbe;
        resize();
        if (Math.abs(mWbe - wbe) < 0.01) {
            clearInterval(smothAnim);
        }
    }, 15);
}

mals.addEventListener("wheel", wheel, false);




function getMoveDir() {
    let dx = 0;
    let dy = 0;
    for (let key in moveKeys) {
        let tmpDir = moveKeys[key];
        dx += !!keys[key] * tmpDir[0];
        dy += !!keys[key] * tmpDir[1];
    }
    return dx == 0 && dy == 0 ? undefined : Math.atan2(dy, dx);
}

function getSafeDir() {
    if (!player) {
        return 0;
    }
    if (!player.lockDir) {
        lastDir = Math.atan2(mouseY - (screenHeight / 2), mouseX - (screenWidth / 2));
    }
    return lastDir || 0;
}

let plusDir = 0;
let lastSpin = Date.now();

function getAttackDir() {
    const now = Date.now();

    if (player && now - lastSpin >= 235 && !(clicks.right || clicks.left || playerConditions.inTrap)) {
        plusDir += Math.random() * (Math.PI * 2);
        lastSpin = now;
    }

    if (!player) return "0";

    const [primaryWeapon, secondaryWeapon] = player.weapons;
    const primaryReload = player.reloads[primaryWeapon];
    const secondaryReload = player.reloads[secondaryWeapon];
    const primaryInRange = near.dist2 <= items.weapons[primaryWeapon].range + near.scale * 1.8;

    const getBestTargetDirection = () => (enemy.length ? near.aim2 : getSafeDir());

    if (HANS.autoAim || ((clicks.left || (useWasd && primaryInRange)) && primaryReload === 0)) {
        lastDir = getBestTargetDirection();
    } else if (clicks.right && (secondaryWeapon === 10 ? secondaryReload : primaryReload) === 0) {
        lastDir = getSafeDir();
    } else if (playerConditions.inTrap || soldierForSpike) {
        lastDir = playerConditions.aim;
    } else if (!player.lockDir && (!autos.stopspin || !useWasd)) {
        lastDir = getSafeDir();
    }

    return lastDir || 0;
}


function smoothTransition(targetDir) {
    const smoothingFactor = 0.1;
    return (1 - smoothingFactor) * lastDir + smoothingFactor * targetDir;
}

function getVisualDir() {
    if (!player) {
        return 0;
    }
    lastDir = getSafeDir();
    return lastDir || 0;
}

function keysActive() {
    return (allianceMenu.style.display != "block" &&
            chatHolder.style.display != "block");
}

function keyDown(event) {
    let keyNum = event.which || event.keyCode || 0;
    if (player && player.alive && keysActive()) {
        if (!keys[keyNum]) {
            keys[keyNum] = 1;
            macro[event.key] = 1;
            if (keyNum == 27) {
                openMenu = !openMenu;
                $("#menuDiv").toggle();
            } else if (keyNum == 109) {
                recording = !recording;
                console.log(recording);
            } else if (keyNum == 69) {
                sendAutoGather();
            } else if (keyNum == 67) {
                updateMapMarker();
            } else if (player.weapons[keyNum - 49] != undefined) {
                player.weaponCode = player.weapons[keyNum - 49];
            } else if (moveKeys[keyNum]) {
                sendMoveDir();
            } else if (event.key == "m") {
                mills.placeSpawnPads = !mills.placeSpawnPads;
            } else if (event.key == "z") {
                mills.place = !mills.place;
            } else if (event.key == "Z") {
                typeof window.debug == "function" && window.debug();
            } else if (keyNum == 32) {
                packet("F", 1, getSafeDir(), 1);
                packet("F", 0, getSafeDir(), 1);
            }
        }
    }
}

addEventListener("keydown", UTILS.checkTrusted(keyDown));

function keyUp(event) {
    if (player && player.alive) {
        let keyNum = event.which || event.keyCode || 0;
        if (keysActive()) {
            if (keys[keyNum]) {
                keys[keyNum] = 0;
                macro[event.key] = 0;
                if (moveKeys[keyNum]) {
                    sendMoveDir();
                } else if (event.key == ",") {
                    player.sync = false;
                }
            }
        }
    }
}
function predictMove(player, dir, ticks = 1) {
    const speed = player.maxSpeed || player.speed || 4.5;
    return {
        x: player.x + Math.cos(dir) * speed * ticks,
        y: player.y + Math.sin(dir) * speed * ticks
    };
}

window.addEventListener("keyup", UTILS.checkTrusted(keyUp));

let walking = false;

function normalizeAngle(angle) {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
}

function sendMoveDir() {
    if(found) {
        packet("9", undefined, 1);
    } else {
        let newMoveDir = getMoveDir();
        if (lastMoveDir == undefined || newMoveDir == undefined || Math.abs(newMoveDir - lastMoveDir) > 0.3) {
            if (!HANS.autoPush && !found) {
                packet("9", newMoveDir, 1);
            }
            lastMoveDir = newMoveDir;
        }
    }
}

let isItemSetted = [];

function updateItemCountDisplay(index = undefined) {
    for (let i = 3; i < items.list.length; ++i) {
        let id = items.list[i].group.id;
        let tmpI = items.weapons.length + i;
        if (!isItemSetted[tmpI]) {
            isItemSetted[tmpI] = document.createElement("div");
            isItemSetted[tmpI].id = "itemCount" + tmpI;
            verify("actionBarItem" + tmpI).appendChild(isItemSetted[tmpI]);
            isItemSetted[tmpI].style = `
                        display: block;
                        position: absolute;
                        padding-left: 5px;
                        font-size: 2em;
                        color: #fff;
                        `;
            isItemSetted[tmpI].innerHTML = player.itemCounts[id] || 0;
        } else {
            if (index == id) isItemSetted[tmpI].innerHTML = player.itemCounts[index] || 0;
        }
    }
}

var retrappable = false;
function autoPush() {
    retrappable = true;

    const findNearbyObject = (filterCondition, maxDist) => {
        return gameObjects.filter(tmp => filterCondition(tmp))
            .sort((a, b) => UTILS.getDist(a, near, 0, 2) - UTILS.getDist(b, near, 0, 2))[0];
    };

    const nearTrap = findNearbyObject(
        tmp => tmp.trap && tmp.active && tmp.isTeamObject(player) && UTILS.getDist(tmp, near, 0, 2) <= (near.scale + tmp.getScale() + 5),
        near
    );

    if (nearTrap) {
        const spike = findNearbyObject(
            tmp => tmp.dmg && tmp.active && tmp.isTeamObject(player) && UTILS.getDist(tmp, nearTrap, 0, 0) <= (near.scale + nearTrap.scale + tmp.scale),
            nearTrap
        );

        if (spike) {
            const direction = UTILS.getDirect(near, spike, 2, 0);
            const pos = {
                x: spike.x + (250 * Math.cos(direction)),
                y: spike.y + (250 * Math.sin(direction)),
                x2: spike.x + ((UTILS.getDist(near, spike, 2, 0) + player.scale) * Math.cos(direction)),
                y2: spike.y + ((UTILS.getDist(near, spike, 2, 0) + player.scale) * Math.sin(direction))
            };

            const finds = gameObjects.filter(tmp => tmp.active).find((tmp) => {
                const tmpScale = tmp.getScale();
                return !tmp.ignoreCollision && UTILS.lineInRect(tmp.x - tmpScale, tmp.y - tmpScale, tmp.x + tmpScale, tmp.y + tmpScale, player.x2, player.y2, pos.x2, pos.y2);
            });

            if (finds) {
                if (HANS.autoPush) {
                    HANS.autoPush = false;
                    packet("9", lastMoveDir || undefined, 1);
                }
            } else {
                HANS.autoPush = true;
                HANS.pushData = { x: spike.x, y: spike.y, x2: pos.x2, y2: pos.y2 };

                const scale = (player.scale / 10);
                if (UTILS.lineInRect(player.x2 - scale, player.y2 - scale, player.x2 + scale, player.y2 + scale, near.x2, near.y2, pos.x, pos.y)) {
                    packet("9", near.aim2, 1);
                } else {
                    packet("9", UTILS.getDirect(pos, player, 2, 2), 1);
                }
            }
        } else {
            resetAutoPush();
        }
    } else {
        resetAutoPush();
    }
}

function resetAutoPush() {
    if (HANS.autoPush) {
        HANS.autoPush = false;
        packet("9", lastMoveDir || undefined, 1);
    }
}

function addDeadPlayer(tmpObj) {
    deadPlayers.push(new DeadPlayer(tmpObj.x, tmpObj.y, tmpObj.dir, tmpObj.buildIndex, tmpObj.weaponIndex, tmpObj.weaponVariant, tmpObj.skinColor, tmpObj.scale, tmpObj.name));
}

function setInitData(data) {
    alliances = data.teams;
}

function setupGame(yourSID) {
    keys = {};
    macro = {};
    playerSID = yourSID;
    attackState = 0;
    inGame = true;
    packet("F", 0, getAttackDir(), 1);
    HANS.ageInsta = true;
    if (firstSetup) {
        firstSetup = false;
        gameObjects.length = 0;
        lstOfObjects.length = 0;
    }
}

let originalName = null;

function addPlayer(data, isYou) {
    let tmpPlayer = findPlayerByID(data[0]);
    if (!tmpPlayer) {
        tmpPlayer = new Player(data[0], data[1], config, UTILS, projectileManager,
                               objectManager, players, ais, items, hats, accessories);
        players.push(tmpPlayer);
    }
    tmpPlayer.spawn(isYou ? true : null);
    tmpPlayer.visible = false;
    tmpPlayer.oldPos = {
        x2: undefined,
        y2: undefined
    };
    tmpPlayer.x2 = undefined;
    tmpPlayer.y2 = undefined;
    tmpPlayer.x3 = undefined;
    tmpPlayer.y3 = undefined;
    tmpPlayer.setData(data);
    if (isYou) {
        if (!player) {
            window.prepareUI(tmpPlayer);
        }
        player = tmpPlayer;
        camX = player.x;
        camY = player.y;
        originalName = player.name;
        HANS.lastDir = 0;
        updateItems();
        updateAge();
        updateItemCountDisplay();
        if (player.skins[7]) {
            HANS.reSync = true;
        }
    }
}

function removePlayer(id) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == id) {
            players.splice(i, 1);
            break;
        }
    }
}

var lastBullBleed = 0;
var lastBullBleedTime = 0;
var startBullBleed = 0;
let bullTicked = false;
function updateHealth(sid, value) {
    let tmpObj = findPlayerBySID(sid);
    if (tmpObj) {
        let tmpDamage = value - tmpObj.health;
        tmpObj.oldHealth = tmpObj.health;
        tmpObj.health = value;
        tmpObj.judgeShame();
        if(tmpDamage < 0){
            if(tmpDamage == -5 * (tmpObj.skin?.dmgMult || 1) && tmpObj.dmgOverTime.time > -1){
                tmpObj.dmgOverTime.time--;
            }
            if(tmpObj == player && tmpObj.skinIndex == 7 && tmpDamage == -5 + (tmpObj.tailIndex == 13 ? 3 : 0)){
                lastBullBleed = game.TICK;
                startBullBleed = 0;
            }
            tmpObj.lastBleed.amount = tmpDamage;
            tmpObj.lastBleed.time = game.TICK;
            tmpObj.lastBleed.healed = false;
        }
        if (tmpObj.oldHealth > tmpObj.health) {
            tmpObj.timeDamaged = Date.now();
            tmpObj.damaged = tmpObj.oldHealth - tmpObj.health;
            let damaged = tmpObj.damaged;

            if (tmpObj.health <= 0 && !tmpObj.death) {
                tmpObj.death = true;
                addDeadPlayer(tmpObj);
            }

            if (tmpObj === player) {
                const handler = new PlayerDamageHandler(player, game, items, near, bullTicked, enemy, instaC, HANS);
                handler.handle(damaged);
            } else {
                handleNonPlayerDamage(tmpObj);
            }
        }
    }
}
function distance(e, t) {
    try {
        return Math.hypot((t.y2 || t.y) - (e.y2 || e.y), (t.x2 || t.x) - (e.x2 || e.x));
    } catch (e) {
        return Infinity;
    }
}
function direction(e, t) {
    try {
        return Math.atan2((t.y2 || t.y) - (e.y2 || e.y), (t.x2 || t.x) - (e.x2 || e.x));
    } catch (e) {
        return 0;
    }
}

let nextTickOut = false;
let lastHitTime = Date.now();
const safePrimary = (rival = near) => near.length ? [0, 6].includes(rival.primaryIndex) : undefined;

class PlayerDamageHandler {
    constructor(player, game, items, near, bullTicked, enemy, instaC, HANS) {
        this.player = player;
        this.game = game;
        this.items = items;
        this.near = near;
        this.bullTicked = bullTicked;
        this.enemy = enemy;
        this.instaC = instaC;
        this.HANS = HANS;
        this.autoheal = false;
        this.antiinsta = true;
    }

    handle(damaged) {
        if (!inGame) return;

        this.setAutoheal(damaged);
        this.setAntiinsta(damaged);

        const healThreshold = 66;
        const includeSpikeDmgs = this.isSpikeDamage(damaged);
        const enemySpear = this.near.primaryIndex == 5;
        const enemyWeapon = this.near.primaryIndex == 4;
        const enemyHammer = this.near.secondaryIndex == 10;
        const enemyMusket = this.near.secondaryIndex == 15;

        if (damaged <= healThreshold && this.player.skinIndex !== 6 && this.enemy.weaponIndex === 4) {
            this.triggerHeal();
        }

        if (
            damaged >= (includeSpikeDmgs ? 8 : (enemySpear && enemyHammer || enemyWeapon) ? 53.1 : enemySpear && enemyMusket ? 20 : 46) &&
            this.player.damageThreat >= 20 &&
            this.antiinsta &&
            (this.game.TICK - this.player.antiTimer) > 1
        ) {
            this.player.canEmpAnti = this.player.reloads[53] === 0 && this.player.reloads[this.player.weapons[1]] === 0;
            this.player.soldierAnti = !this.player.canEmpAnti;
            this.player.antiTimer = this.game.TICK;

            const shameThreshold = this.randomInt(5, 7);
            if (this.player.shameCount < shameThreshold) {
                this.enemy.weaponIndex === 4 ? this.triggerHeal() : healing();
            } else {
                this.triggerHeal();
            }

            if (this.autoheal) this.triggerHeal();
        } else if (playerConditions.inTrap && damaged >= 46 && enemySpear) {
            healing();
        } else {
            this.triggerHeal();
        }

        if (damaged >= 20 && this.player.skinIndex === 11 && this.player.shameCount <= 3) {
            this.instaC.canCounter = true;
        }
    }

    setAutoheal(damaged) {
        const healThreshold = 46;
        this.autoheal = (
            damaged >= healThreshold &&
            this.player.shameCount === this.randomInt(5, 7) &&
            this.player.primaryIndex !== "4"
        );
    }

    setAntiinsta(damaged) {
        const enemyMusket = this.near.secondaryIndex == 15;
        const healThreshold = enemyMusket ? 20 : 46;
        this.antiinsta = !(
            damaged >= healThreshold &&
            this.player.shameCount === this.randomInt(5, 7) &&
            this.player.primaryIndex !== "4"
        );
    }

    isSpikeDamage(damaged) {
        const weaponDmg = this.items.weapons[this.player.weapons[0]].dmg;
        const gearDmgs = [0.25, 0.45].map(val => val * weaponDmg);
        return (
            this.near.length &&
            !this.bullTicked &&
            gearDmgs.includes(damaged) &&
            this.near[0].skinIndex === 11 &&
            this.near[0].tailIndex === 21
        );
    }

    triggerHeal() {
        this.game.tickBase(() => healing(), 2);
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function handleNonPlayerDamage(tmpObj) {
    if (!tmpObj.setPoisonTick && (tmpObj.damaged == 5 || (tmpObj.latestTail == 13 && tmpObj.damaged == 2))) {
        tmpObj.setPoisonTick = true;
    }
}

function killPlayer(sid) {
    inGame = false;
    lastDeath = {
        x: player.x,
        y: player.y,
    };
}

function updateItemCounts(index, value) {
    if (player) {
        player.itemCounts[index] = value;
        updateItemCountDisplay(index);
    }
}

function updateAge(xp, mxp, age) {
    if (xp != undefined) {
        player.XP = xp;
    }
    if (mxp != undefined) {
        player.maxXP = mxp;
    }
    if (age != undefined) {
        player.age = age;
    }
}

function updateUpgrades(points, age) {
    player.upgradePoints = points;
    player.upgrAge = age;
    if (points > 0) {
        tmpList.length = 0;
        UTILS.removeAllChildren(upgradeHolder);
        for (let i = 0; i < items.weapons.length; ++i) {
            if (items.weapons[i].age == age && (items.weapons[i].pre == undefined || player.weapons.indexOf(items.weapons[i].pre) >= 0)) {
                let e = UTILS.generateElement({
                    id: "upgradeItem" + i,
                    class: "actionBarItem",
                    onmouseout: function() {
                        showItemInfo();
                    },
                    parent: upgradeHolder
                });
                e.style.backgroundImage = verify("actionBarItem" + i).style.backgroundImage;
                tmpList.push(i);
            }
        }
        for (let i = 0; i < items.list.length; ++i) {
            if (items.list[i].age == age && (items.list[i].pre == undefined || player.items.indexOf(items.list[i].pre) >= 0)) {
                let tmpI = (items.weapons.length + i);
                let e = UTILS.generateElement({
                    id: "upgradeItem" + tmpI,
                    class: "actionBarItem",
                    onmouseout: function() {
                        showItemInfo();
                    },
                    parent: upgradeHolder
                });
                e.style.backgroundImage = verify("actionBarItem" + tmpI).style.backgroundImage;
                tmpList.push(tmpI);
            }
        }
        for (let i = 0; i < tmpList.length; i++) {
            (function(i) {
                let tmpItem = verify('upgradeItem' + i);
                tmpItem.onmouseover = function() {
                    if (items.weapons[i]) {
                        showItemInfo(items.weapons[i], true);
                    } else {
                        showItemInfo(items.list[i - items.weapons.length]);
                    }
                };
                tmpItem.onclick = UTILS.checkTrusted(function() {
                    packet("H", i);
                });
                UTILS.hookTouchEvents(tmpItem);
            })(tmpList[i]);
        }
        if (tmpList.length) {
            upgradeHolder.style.display = "block";
            upgradeCounter.style.display = "block";
            upgradeCounter.innerHTML = "SELECT ITEMS (" + points + ")";
        } else {
            upgradeHolder.style.display = "none";
            upgradeCounter.style.display = "none";
            showItemInfo();
        }
    } else {
        upgradeHolder.style.display = "none";
        upgradeCounter.style.display = "none";
        showItemInfo();
    }
}

let soldierWhenBreak = false;

const killObject = (sid) => {
    const findObj = findObjectBySid(sid);
    if (!findObj) return;

    objectManager.disableBySid(sid);

    if (player) {
        const index = breakObjects.findIndex(obj => obj.sid === sid);
        if (index !== -1) breakObjects.splice(index, 1);
        playerConditions.replacer(findObj);
    }
};


function killObjects(sid) {
    if (player) objectManager.removeAllItems(sid);
}

function setTickout(doo, timeout) {
    if (!ticks.manage[ticks.tick + timeout]) {
        ticks.manage[ticks.tick + timeout] = [doo];
    } else {
        ticks.manage[ticks.tick + timeout].push(doo);
    }
}

function caf(e, t) {
    try {
        return Math.atan2((t.y2 || t.y) - (e.y2 || e.y), (t.x2 || t.x) - (e.x2 || e.x));
    } catch (e) {
        return 0;
    }
}

let found = false;
let autoQ = false;

let autos = {
    insta: {
        todo: false,
        wait: false,
        count: 4,
        shame: 5
    },
    bull: false,
    antibull: 0,
    reloaded: false,
    stopspin: true
}

function getAngleDifference(angle1, angle2) {
    angle1 = angle1 % (2 * Math.PI);
    angle2 = angle2 % (2 * Math.PI);
    let diff = Math.abs(angle1 - angle2);
    if (diff > Math.PI) {
        diff = (2 * Math.PI) - diff;
    }
    return diff;
}

function getMinorAngle(a, b) {
    let r = (b - a + Math.PI) % (2 * Math.PI) - Math.PI;
    return Math.abs(r);
}

let commandInput = "";
let commandsLog = [];
const activeKey = "Shift";

var informationMenu = Object.assign(document.createElement("div"), {
    id: "informationMenu",
    borderRadius: "4px",
    textAlign: "left",
});

Object.assign(informationMenu.style, {
    position: "absolute",
    color: "white",
    width: "160px",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    top: "20px",
    left: "20px",
    display: "block",
});

document.getElementById("gameUI").appendChild(informationMenu);
informationMenu.style.display = "block";

function handleKeyDown(event) {
    if (event.key === activeKey) {
        if (commandInput.trim()) {
            executeCommand(commandInput);
            commandInput = "";
        }
    } else if (event.key.length === 1) {
        commandInput += event.key;
    } else if (event.key === "Backspace") {
        commandInput = commandInput.slice(0, -1);
    }
}

function executeCommand(command) {
    commandsLog.push(`Comando ejecutado: ${command}`);
    if (command.startsWith("!")) {
        const message = command.slice(4);
        commandsLog.push(`Mensaje: ${message}`);
    } else {
        commandsLog.push(`Comando desconocido: ${command}`);
    }
}

function draw(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "16px Arial";
    context.fillStyle = "#333";
    context.fillText("Escribiendo: " + commandInput, 10, canvas.height - 30);

    drawCommands(context);
}

const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 300;
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

document.addEventListener("keydown", handleKeyDown);

function fgdo(a, b){
    return Math.sqrt(Math.pow((b.y - a.y), 2) + Math.pow((b.x - a.x), 2));
}

let tracker = {
    spin: {
        active: false,
        noHits: false,
    },
    draw3: {
        active: false,
        x: 0,
        y: 0,
        scale: 0,
    },
    moveDir: undefined,
    lastPos: {
        x: 0,
        y: 0,
    }
}

function avoidSpikesNatural() {
    if (!player || !player.alive) return;
    let dir = lastMoveDir;
    let newPos = {
        x: player.x2 + (player.x2 - tracker.lastPos.x) * 1.15 + 50 * Math.cos(dir),
        y: player.y2 + (player.y2 - tracker.lastPos.y) * 1.15 + 50 * Math.sin(dir)
    };
    let found = false;
    let buildings = gameObjects.sort((a, b) => Math.hypot(player.y2 - a.y, player.x2 - a.x) - Math.hypot(player.y2 - b.y, player.x2 - b.x));
    let spikes = buildings.filter(obj =>
        (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "spinning spikes" || obj.name == "poison spikes") &&
        fgdo(player, obj) < 180 &&
        !obj.isTeamObject(player) &&
        obj.active
    );
    for (let i = 0; i < spikes.length; i++) {
        if (fgdo(spikes[i], newPos) < spikes[i].scale + player.scale + 5) {
            found = Math.atan2(player.y2 - spikes[i].y, player.x2 - spikes[i].x);
            tracker.draw3.active = true;
            tracker.draw3.x = spikes[i].x;
            tracker.draw3.y = spikes[i].y;
            tracker.draw3.scale = spikes[i].scale;
        }
    }
    if (found !== false && !playerConditions.inTrap) {
        packet("9", found, 1);
    } else {
        packet("9", lastMoveDir, 1);
        tracker.draw3.active = false;
    }
    tracker.lastPos.x = player.x2;
    tracker.lastPos.y = player.y2;
}
let spikeToEvade = null;
let soldierForSpike = false;
let dangerousSpike = null;
function updatePlayers(data) {
    const shameCounts = [1, 2, 3, 4, 5, 6, 7];
    player.lastshamecount = player.shameCount;
    game.TICK++;
    enemy = [];
    nears = [];
    near = [];
    game.tickSpeed = performance.now() - game.lastTick;
    game.lastTick = performance.now();
    players.forEach((tmp) => {
        tmp.forcePos = !tmp.visible;
        tmp.visible = false;
        if((tmp.timeHealed - tmp.timeDamaged) > 0 && tmp.lastshamecount < tmp.shameCount) {
            tmp.pinge = (tmp.timeHealed - tmp.timeDamaged);
        }
    });
    for (let i = 0; i < data.length;) {
        tmpObj = findPlayerBySID(data[i]);
        if (tmpObj) {
            tmpObj.t1 = (tmpObj.t2 === undefined) ? game.lastTick : tmpObj.t2;
            tmpObj.t2 = game.lastTick;
            tmpObj.oldPos.x2 = tmpObj.x2;
            tmpObj.oldPos.y2 = tmpObj.y2;
            tmpObj.x1 = tmpObj.x;
            tmpObj.y1 = tmpObj.y;
            tmpObj.x2 = data[i + 1];
            tmpObj.y2 = data[i + 2];
            tmpObj.x3 = tmpObj.x2 + (tmpObj.x2 - tmpObj.oldPos.x2);
            tmpObj.y3 = tmpObj.y2 + (tmpObj.y2 - tmpObj.oldPos.y2);
            tmpObj.d1 = (typeof tmpObj.d2 === 'undefined') ? data[i + 3] : tmpObj.d2;
            tmpObj.d2 = data[i + 3];
            if (tmpObj.forcePos) {
                tmpObj.dir = tmpObj.d2;
            } else {
                let total = tmpObj.t2 - tmpObj.t1;
                let fraction = game.lastTick - tmpObj.t1;
                let ratio = total > 0 ? Math.min(1, fraction / total) : 1;
                let smoothRatio = easeInOutSine(ratio);
                tmpObj.dir = Math.lerpAngle(tmpObj.d1, tmpObj.d2, smoothRatio);
            }
            tmpObj.dt = 0;
            tmpObj.buildIndex = data[i + 4];
            tmpObj.weaponIndex = data[i + 5];
            tmpObj.weaponVariant = data[i + 6];
            tmpObj.team = data[i + 7];
            tmpObj.isLeader = data[i + 8];
            tmpObj.oldSkinIndex = tmpObj.skinIndex;
            tmpObj.oldTailIndex = tmpObj.tailIndex;
            tmpObj.skinIndex = data[i + 9];
            tmpObj.tailIndex = data[i + 10];
            tmpObj.iconIndex = data[i + 11];
            tmpObj.zIndex = data[i + 12];
            tmpObj.visible = true;
            tmpObj.update(game.tickSpeed);
            tmpObj.dist2 = UTILS.getDist(tmpObj, player, 2, 2);
            tmpObj.aim2 = UTILS.getDirect(tmpObj, player, 2, 2);
            tmpObj.dist3 = UTILS.getDist(tmpObj, player, 3, 3);
            tmpObj.aim3 = UTILS.getDirect(tmpObj, player, 3, 3);
            tmpObj.damageThreat = 0;
            if (tmpObj.skinIndex == 45 && tmpObj.shameTimer <= 0) {
                tmpObj.addShameTimer();
            }
            if (tmpObj.oldSkinIndex == 45 && tmpObj.skinIndex != 45) {
                tmpObj.shameTimer = 0;
                tmpObj.shameCount = 0;
                if (tmpObj == player) {
                    healing();
                }
            }

            if (player.shameCount <= 5 && near.dist3 <= 300 && near.reloads[near.primaryIndex] <= game.tickRate * (window.pingTime >= 130 ? 2 : 1)) {
                autoQ = true;
                healing();
            } else {
                if (autoQ) {
                    healing();
                }
                autoQ = false;
            }
            if (tmpObj == player) {
                if (lstOfObjects.length) {
                    lstOfObjects.forEach((tmp) => {
                        tmp.onNear = false;
                        if (tmp.active) {
                            if (!tmp.onNear && UTILS.getDist(tmp, tmpObj, 0, 2) <= tmp.scale + items.weapons[tmpObj.weapons[0]].range) {
                                tmp.onNear = true;
                            }
                            if (tmp.isItem && tmp.owner) {
                                if (!tmp.pps && tmpObj.sid == tmp.owner.sid && UTILS.getDist(tmp, tmpObj, 0, 2) > 0 && !tmp.breakObj && ![13, 14, 20].includes(tmp.id)) {
                                    tmp.breakObj = true;
                                    breakObjects.push({
                                        x: tmp.x,
                                        y: tmp.y,
                                        sid: tmp.sid
                                    });
                                }
                            }
                        }
                    });
                    let nearTrap = lstOfObjects.filter(e => e.trap && e.active && UTILS.getDist(e, tmpObj, 0, 2) <= (tmpObj.scale + e.getScale() + 25) && !e.isTeamObject(tmpObj)).sort(function(a, b) {
                        return UTILS.getDist(a, tmpObj, 0, 2) - UTILS.getDist(b, tmpObj, 0, 2);
                    })[0];
                    dangerousSpike = gameObjects.filter(obj => 
                        obj.dmg && 
                        obj.active && 
                        !obj.isTeamObject(tmpObj) && 
                        UTILS.getDist(obj, tmpObj, 0, 2) <= (obj.scale + tmpObj.scale + 80)
                    ).sort((a, b) => UTILS.getDist(a, tmpObj, 0, 2) - UTILS.getDist(b, tmpObj, 0, 2))[0];

                    if (nearTrap) {
                        let trapSpike = gameObjects.filter(obj => 
                            obj.dmg && 
                            distBetween(tmpObj, obj) <= tmpObj.scale + nearTrap.scale/2 && 
                            !obj.isTeamObject(tmpObj) && 
                            obj.active
                        )[0];
                        
                        let spike = dangerousSpike && (!trapSpike || UTILS.getDist(dangerousSpike, tmpObj, 0, 2) < UTILS.getDist(trapSpike, tmpObj, 0, 2)) ? dangerousSpike : trapSpike;
                        
                        if (spike) {
                            spikeToEvade = spike;
                        } else {
                            spikeToEvade = null;
                        }
                        playerConditions.dist = UTILS.getDist(nearTrap, tmpObj, 0, 2);
                        
                        if (spike && UTILS.getDist(spike, tmpObj, 0, 2) <= tmpObj.scale + 80) {
                            playerConditions.aim = UTILS.getDirect(spike, tmpObj, 0, 2);
                        } else {
                            playerConditions.aim = UTILS.getDirect(nearTrap, tmpObj, 0, 2);
                            playerConditions.protect(caf(nearTrap, tmpObj) - Math.PI);
                        }
                        playerConditions.inTrap = true;
                        playerConditions.info = nearTrap;
                    } else if (dangerousSpike) {
                        spikeToEvade = dangerousSpike;
                        //soldierForSpike = true;
                        playerConditions.aim = UTILS.getDirect(dangerousSpike, tmpObj, 0, 2);
                        playerConditions.inTrap = false;
                        playerConditions.info = dangerousSpike;
                    } else {
                        spikeToEvade = null;
                        soldierForSpike = false;
                        playerConditions.inTrap = false;
                        playerConditions.info = {};
                    }
                } else {
                    playerConditions.inTrap = false;
                }
            }
            if (tmpObj.weaponIndex < 9) {
                tmpObj.primaryIndex = tmpObj.weaponIndex;
                tmpObj.primaryVariant = tmpObj.weaponVariant;
            } else if (tmpObj.weaponIndex > 8) {
                tmpObj.secondaryIndex = tmpObj.weaponIndex;
                tmpObj.secondaryVariant = tmpObj.weaponVariant;
            }
        }
        i += 13;
    }
    
    avoidSpikesNatural();
    
    if (textManager.stack.length) {
        let stacks = [];
        let notstacks = [];
        let num = 0;
        let num2 = 0;
        let pos = {
            x: null,
            y: null
        };
        let pos2 = {
            x: null,
            y: null
        }
        textManager.stack.forEach((text) => {
            if (text.value >= 0) {
                if (num == 0) pos = {
                    x: text.x,
                    y: text.y
                };
                num += Math.abs(text.value);
            } else {
                if (num2 == 0) pos2 = {
                    x: text.x,
                    y: text.y
                };
                num2 += Math.abs(text.value);
            }
        });
        if (num2 > 0) {
            textManager.showText(pos2.x, pos2.y, Math.max(45, Math.min(50, num2)), 0.18, 500, num2, "#8ecc51");
        }
        if (num > 0) {
            textManager.showText(pos.x, pos.y, Math.max(45, Math.min(50, num)), 0.18, 500, num, "#fff");
        }
        textManager.stack = [];
    }
    if (runAtNextTick.length) {
        runAtNextTick.forEach((tmp) => {
            checkProjectileHolder(...tmp);
        });
        runAtNextTick = [];
    }
    for (let i = 0; i < data.length;) {
        tmpObj = findPlayerBySID(data[i]);
        if (tmpObj) {
            if (!tmpObj.isTeam(player)) {
                enemy.push(tmpObj);
                if (tmpObj.dist2 <= items.weapons[tmpObj.primaryIndex == undefined ? 5 : tmpObj.primaryIndex].range + (player.scale * 2)) {
                    nears.push(tmpObj);
                }
            }
            tmpObj.manageReload();
            if (tmpObj != player) {
                tmpObj.addDamageThreat(player);
            }
        }
        i += 13;
    }
    if (player && player.alive) {
        if (enemy.length) {
            near = enemy.sort(function(tmp1, tmp2) {
                return tmp1.dist2 - tmp2.dist2;
            })[0];
        }
        if (game.tickQueue[game.TICK]) {
            game.tickQueue[game.TICK].forEach((action) => {
                action();
            });
            game.tickQueue[game.TICK] = null;
        }
        players.forEach((tmp) => {
            if (!tmp.visible && player != tmp) {
                tmp.reloads = {
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: 0,
                    9: 0,
                    10: 0,
                    11: 0,
                    12: 0,
                    13: 0,
                    14: 0,
                    15: 0,
                    53: 0,
                };
            }
            if (tmp.setBullTick) {
                tmp.bullTimer = 0;
            }
            if (tmp.setPoisonTick) {
                tmp.poisonTimer = 0;
            }
            tmp.updateTimer();
        });
        if (inGame) {
            if (enemy.length) {
                if (player.canEmpAnti) {
                    player.canEmpAnti = false;
                    const isNearValid = near.dist2 <= 300 && !HANS.safePrimary(near) && !HANS.safeSecondary(near);

                    if (isNearValid) {
                        player.empAnti = near.reloads[53] === 0;
                        player.soldierAnti = !player.empAnti;
                    }
                }

                const prehit = lstOfObjects
                    .filter(tmp => tmp.dmg && tmp.active && tmp.isTeamObject(player) && UTILS.getDist(tmp, near, 0, 3) <= (tmp.scale + near.scale))
                    .sort((a, b) => UTILS.getDist(a, near, 0, 2) - UTILS.getDist(b, near, 0, 2))[0];

                if (prehit) {
                    const withinRange = near.dist3 <= items.weapons[player.weapons[0]].range + player.scale * 1.8;

                    if (withinRange && configs.predictTick) {
                        instaC.canSpikeTick = true;
                        instaC.syncHit = true;

                        if (configs.revTick && player.weapons[1] === 15 && player.reloads[53] === 0 && instaC.perfCheck(player, near)) {
                            instaC.revTick = true;
                        }
                    }
                }

                const antiSpikeTick = lstOfObjects
                    .filter(tmp => tmp.dmg && tmp.active && !tmp.isTeamObject(player) && UTILS.getDist(tmp, player, 0, 3) < (tmp.scale + player.scale))
                    .sort((a, b) => UTILS.getDist(a, player, 0, 2) - UTILS.getDist(b, player, 0, 2))[0];

                if (antiSpikeTick && !playerConditions.inTrap) {
                    const withinAntiRange = near.dist3 <= items.weapons[5].range + near.scale * 1.8;

                    if (withinAntiRange) {
                        HANS.anti0Tick = 1;
                        healing();
                    }
                }
            }

            if ((useWasd ? true : ((player.checkCanInsta(true) >= 100 ? player.checkCanInsta(true) : player.checkCanInsta(false)) >= (player.weapons[1] == 10 ? 95 : 100))) && near.dist2 <= items.weapons[player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]].range + near.scale * 1.8 && (instaC.wait || (useWasd && Math.floor(Math.random() * 5) == 0)) && !instaC.isTrue && !HANS.waitHit && player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] == 0 && (useWasd ? true : verify("instaType").value == "oneShot" ? (player.reloads[53] <= (player.weapons[1] == 10 ? 0 : game.tickRate)) : true) && instaC.perfCheck(player, near)) {
                if (player.checkCanInsta(true) >= 100) {
                    instaC.nobull = useWasd ? false : instaC.canSpikeTick ? false : true;
                } else {
                    instaC.nobull = false;
                }
                instaC.can = true;
            } else {
                instaC.can = false;
            }

            macro.q && place(0, getAttackDir());
            macro.f && place(4, getSafeDir());
            macro.v && place(2, getSafeDir());
            macro.y && place(5, getSafeDir());
            macro.h && place(player.getItemType(22), getSafeDir());
            macro.n && place(3, getSafeDir());
            var autoMill = {
                toggle: false,
                x: 0,
                y: 0,
            };
            if (game.TICK % 1.5 == 0) {
                if (mills.place) {
                    if (mills.place && distance(player, autoMill) > items.list[player.items[3]].scale * 2) {
                        const angleIncrement = 72 * Math.PI / 180;
                        const baseAngle = direction({ x: player.x1, y: player.y1 }, player) + Math.PI;

                        for (let i = -1; i <= 1; i++) {
                            checkPlace(3, baseAngle + i * angleIncrement);
                        }
                    }

                } else {
                    if (mills.placeSpawnPads) {
                        for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
                            checkPlace(player.getItemType(20), UTILS.getDirect(player.oldPos, player, 2, 2) + i);
                        }
                    }
                }
            }
            if (instaC.can) {
                instaC.changeType(player.weapons[1] == 10 ? "rev" : "rev");
            }
            if (instaC.canCounter) {
                instaC.canCounter = false;
                if (player.reloads[player.weapons[0]] == 0 && !instaC.isTrue) {
                    instaC.counterType();
                }
            }
            if (instaC.canSpikeTick) {
                instaC.canSpikeTick = false;
                    if ([1, 2, 3, 4, 5, 6].includes(player.weapons[0]) && player.reloads[player.weapons[0]] == 0 && !instaC.isTrue) {
                        instaC.spikeTickType();
                }
            }
            if (!clicks.middle && (clicks.left || clicks.right) && !instaC.isTrue) {
                if ((player.weaponIndex != (clicks.right && player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0])) || player.buildIndex > -1) {
                    selectWeapon(clicks.right && player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]);
                }
                if (player.reloads[clicks.right && player.weapons[1] == 10 ? player.weapons[1] : player.weapons[0]] == 0 && !HANS.waitHit) {
                    sendAutoGather();
                    HANS.waitHit = 1;
                    game.tickBase(() => {
                        sendAutoGather();
                        HANS.waitHit = 0;
                    }, 1);
                }
            }
            if (useWasd && !clicks.left && !clicks.right && !instaC.isTrue && near.dist2 <= items.weapons[player.weapons[0]].range + near.scale * 1.8 && !playerConditions.inTrap) {
                if ((player.weaponIndex != player.weapons[0]) || player.buildIndex > -1) {
                    selectWeapon(player.weapons[0]);
                }
                if (player.reloads[player.weapons[0]] == 0 && !HANS.waitHit) {
                    sendAutoGather();
                    HANS.waitHit = 1;
                    game.tickBase(() => {
                        sendAutoGather();
                        HANS.waitHit = 0;
                    }, 1);
                }
            }
            if (playerConditions.inTrap || soldierForSpike) {
                if (!clicks.left && !clicks.right && !instaC.isTrue) {
                    let aim = playerConditions.aim;
                    if (soldierForSpike && !playerConditions.inTrap) {
                        aim = playerConditions.aim;
                    }
                    if (player.weaponIndex != (playerConditions.notFast() ? player.weapons[1] : player.weapons[0]) || player.buildIndex > -1) {
                        selectWeapon(playerConditions.notFast() ? player.weapons[1] : player.weapons[0]);
                    }
                    if (player.reloads[playerConditions.notFast() ? player.weapons[1] : player.weapons[0]] == 0) {
                        packet("F", 1, aim);
                        packet("F", 0, aim);
                    }
                }
            }
            if (clicks.middle && !playerConditions.inTrap) {
                if (!instaC.isTrue && player.reloads[player.weapons[1]] == 0) {
                    if (HANS.ageInsta && player.weapons[0] != 4 && player.weapons[1] == 9 && player.age >= 9 && enemy.length) {
                        instaC.bowMovement();
                    } else {
                        instaC.rangeType();
                    }
                }
            }
            if (macro.t && !playerConditions.inTrap) {
                if (!instaC.isTrue && player.reloads[player.weapons[0]] == 0 && (player.weapons[1] == 15 ? (player.reloads[player.weapons[1]] == 0) : true) && (player.weapons[0] == 5 || (player.weapons[0] == 4 && player.weapons[1] == 15))) {
                    instaC[(player.weapons[0] == 4 && player.weapons[1] == 15) ? "kmTickMovement" : "tickMovement"]();
                }
            }
            if (macro["."] && !playerConditions.inTrap) {
                if (!instaC.isTrue && player.reloads[player.weapons[0]] == 0 && ([9, 12, 13, 15].includes(player.weapons[1]) ? (player.reloads[player.weapons[1]] == 0) : true)) {
                    instaC.boostTickMovement();
                }
            }
            if (player.weapons[1] && !clicks.left && !clicks.right && !playerConditions.inTrap && !instaC.isTrue && !(useWasd && near.dist2 <= items.weapons[player.weapons[0]].range + near.scale * 1.8)) {
                if (player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] == 0) {
                    if (!HANS.reloaded) {
                        HANS.reloaded = true;
                        let fastSpeed = items.weapons[player.weapons[0]].spdMult < items.weapons[player.weapons[1]].spdMult ? 1 : 0;
                        if (player.weaponIndex != player.weapons[fastSpeed] || player.buildIndex > -1) {
                            selectWeapon(player.weapons[fastSpeed]);
                        }
                    }
                } else {
                    HANS.reloaded = false;
                    if(useWasd) {
                        autos.stopspin = false;
                    }
                    if (player.reloads[player.weapons[0]] > 0) {
                        if (player.weaponIndex != player.weapons[0] || player.buildIndex > -1) {
                            selectWeapon(player.weapons[0]);
                        }
                    } else if (player.reloads[player.weapons[0]] == 0 && player.reloads[player.weapons[1]] > 0) {
                        if (player.weaponIndex != player.weapons[1] || player.buildIndex > -1) {
                            selectWeapon(player.weapons[1]);
                        }
                        if(useWasd) {
                            if (!autos.stopspin) {
                                setTimeout(()=>{
                                    autos.stopspin = true;
                                }, 750);
                            }
                        }
                    }
                }
            }
            if (!instaC.isTrue && !playerConditions.inTrap && !playerConditions.replaced) {
                playerConditions.autoPlace();
            }
            if (!macro.q && !macro.f && !macro.v && !macro.h && !macro.n) {
                packet("D", getAttackDir());
            }
            const hatChanger = function () {
                const primaryWeapon = player.weapons[0];
                const secondaryWeapon = player.weapons[1] === 10 ? player.weapons[1] : primaryWeapon;
                const primaryReloadReady = player.reloads[primaryWeapon] === 0;
                const secondaryReloadReady = player.reloads[secondaryWeapon] === 0;
                
                const antiWeapon = player.empAnti ? 22 : 6;
                const barbarianWeapon = near.weaponIndex != 5;
                
                const empWhenOT = enemy.length && 
                    near.primaryIndex == (5 || undefined) && 
                    near.dist3 <= items.weapons[5].range + near.scale * 1.95;
                
                const trapChoice = playerConditions.info.health <= items.weapons[player.weaponIndex].dmg || secondaryReloadReady 
                    ? 40 
                    : empWhenOT 
                        ? 22 
                        : barbarianWeapon 
                            ? 26 
                            : antiWeapon;
                
                const spikeChoice = playerConditions.info.health <= items.weapons[player.weaponIndex].dmg || secondaryReloadReady 
                    ? 40 
                    : 6;
                
                const bullTypeChoice = (verify('antiBullType').value === 'abreload' && near.antiBull > 0) ||
                    (verify('antiBullType').value === 'abalway' && near.reloads[near.primaryIndex] === 0)
                    ? 11 
                    : 6;
                
                const defaultChoice = (enemy && near.dist2 <= 300) ? 6 : biomeGear(1);

                if (soldierWhenBreak) {
                    buyEquip(6, 0);
                    return;
                }

                if (clicks.left || clicks.right) {
                    if (clicks.left) {
                        buyEquip(primaryReloadReady ? 7 : antiWeapon, 0);
                    }
                    if (clicks.right) {
                        buyEquip(secondaryReloadReady ? 40 : antiWeapon, 0);
                    }
                    return;
                }

                const isBleedingCondition = player.shameCount > 0 &&
                    (game.TICK - lastBullBleed) < config.serverUpdateRate &&
                    player.skinIndex !== 45;

                if ((isBleedingCondition || startBullBleed) && near.reloads[near.secondaryIndex] > 0) {
                    startBullBleed++;
                    buyEquip(7, 0);
                }

                else if (playerConditions.inTrap) {
                    buyEquip(player.empAnti ? 22 : trapChoice, 0);
                } 

                else {
                    const finalChoice = player.empAnti 
                        ? 22 
                        : (near.dist2 <= 300 ? bullTypeChoice : defaultChoice);
                    buyEquip(finalChoice, 0);
                }
            };

            let accChanger = function() {
                const bullTypeChoice = (verify('antiBullType').value === 'abreload' && near.antiBull > 0) || (verify('antiBullType').value === 'abalway' && near.reloads[near.primaryIndex] === 0)
                ? 21 : 13;
                if (instaC.can && player.checkCanInsta(true) >= 100 || clicks.left || clicks.right || near.dist2 <= 240 || playerConditions.inTrap) {
                    buyEquip(bullTypeChoice, 1);
                } else {
                    buyEquip(11, 1);
                }
            };

            if (storeMenu.style.display != "block" && !instaC.isTrue && !instaC.ticking) {
                if (useWasd) {
                    hatChanger();
                    accChanger();
                } else {
                    hatChanger();
                    accChanger();
                }
            }
            if (configs.autoPush && enemy.length && !playerConditions.inTrap && !instaC.ticking) {
                autoPush();
            } else {
                if (HANS.autoPush) {
                    HANS.autoPush = false;
                    packet("9", lastMoveDir || undefined, 1);
                }
            }
            if(soldierWhenBreak) {
                soldierWhenBreak = false;
            }
            if (instaC.ticking) {
                instaC.ticking = false;
            }
            if (instaC.syncHit) {
                instaC.syncHit = false;
            }
            if (player.empAnti) {
                player.empAnti = false;
            }
            if (player.soldierAnti) {
                player.soldierAnti = false;
            }
            if (HANS.anti0Tick > 0) {
                HANS.anti0Tick--;
            }
            if (playerConditions.replaced) {
                playerConditions.replaced = false;
            }
            if (playerConditions.antiTrapped) {
                playerConditions.antiTrapped = false;
            }
        }
    }

    informationMenu.innerHTML = `
    <div style="font-size: 16px; font-weight: bold;">rustyCode | ${window.pingTime}</div>
    <hr>
    <div style="font-size: 14px;">
        Packets: ${packetEngine}<br>
        WR: ${instaC.can}<br>
        Mills: ${mills.place}<br>
    </div>
`;
}

(function() {
    const origRenderGameObjects = window.renderGameObjects || renderGameObjects;
    window.renderGameObjects = function(layer, xOffset, yOffset) {
        origRenderGameObjects.apply(this, arguments);
        if (spikeToEvade && spikeToEvade.active) {
            let ctx = mainContext;
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(spikeToEvade.x - xOffset, spikeToEvade.y - yOffset, (spikeToEvade.scale || 49) + 16, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        }
    };
})();

function updateLeaderboard(data) {
    lastLeaderboardData = data;
              return;
    UTILS.removeAllChildren(leaderboardData);
    let tmpC = 1;
    for (let i = 0; i < data.length; i += 3) {
        (function(i) {
            UTILS.generateElement({
                class: "leaderHolder",
                parent: leaderboardData,
                children: [
                    UTILS.generateElement({
                        class: "leaderboardItem",
                        style: "color:" + ((data[i] == playerSID) ? "#fff" : "rgba(255,255,255,0.6)"),
                        text: tmpC + ". " + (data[i + 1] != "" ? data[i + 1] : "unknown")
                    }),
                    UTILS.generateElement({
                        class: "leaderScore",
                        text: UTILS.sFormat(data[i + 2]) || "0"
                    })
                ]
            });
        })(i);
        tmpC++;
    }
}

function loadGameObject(data) {
    for (let i = 0; i < data.length;) {
        objectManager.add(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4],
                          data[i + 5], items.list[data[i + 6]], true, (data[i + 7] >= 0 ? {
            sid: data[i + 7]
        } : null));
        i += 8;
    }
}

function loadAI(data) {
    for (let i = 0; i < ais.length; ++i) {
        ais[i].forcePos = !ais[i].visible;
        ais[i].visible = false;
    }
    if (data) {
        let tmpTime = performance.now();
        for (let i = 0; i < data.length;) {
            tmpObj = findAIBySID(data[i]);
            if (tmpObj) {
                tmpObj.index = data[i + 1];
                tmpObj.t1 = (tmpObj.t2 === undefined) ? tmpTime : tmpObj.t2;
                tmpObj.t2 = tmpTime;
                tmpObj.x1 = tmpObj.x;
                tmpObj.y1 = tmpObj.y;
                tmpObj.x2 = data[i + 2];
                tmpObj.y2 = data[i + 3];
                tmpObj.d1 = (tmpObj.d2 === undefined) ? data[i + 4] : tmpObj.d2;
                tmpObj.d2 = data[i + 4];
                tmpObj.health = data[i + 5];
                tmpObj.dt = 0;
                tmpObj.visible = true;
            } else {
                tmpObj = aiManager.spawn(data[i + 2], data[i + 3], data[i + 4], data[i + 1]);
                tmpObj.x2 = tmpObj.x;
                tmpObj.y2 = tmpObj.y;
                tmpObj.d2 = tmpObj.dir;
                tmpObj.health = data[i + 5];
                if (!aiManager.aiTypes[data[i + 1]].name)
                    tmpObj.name = config.cowNames[data[i + 6]];
                tmpObj.forcePos = true;
                tmpObj.sid = data[i];
                tmpObj.visible = true;
            }
            i += 7;
        }
    }
}

function animateAI(sid) {
    tmpObj = findAIBySID(sid);
    if (tmpObj) tmpObj.startAnim();
}

function gatherAnimation(sid, didHit, index) {
    tmpObj = findPlayerBySID(sid);
    if (tmpObj) {
        tmpObj.startAnim(didHit, index);
        tmpObj.gatherIndex = index;
        tmpObj.gathering = 1;
        if (didHit) {
            let tmpObjects = objectManager.hitObj;
            objectManager.hitObj = [];
            game.tickBase(() => {
                tmpObj = findPlayerBySID(sid);
                let val = items.weapons[index].dmg * (config.weaponVariants[tmpObj[(index < 9 ? "prima" : "seconda") + "ryVariant"]].val) * (items.weapons[index].sDmg || 1) * (tmpObj.skinIndex == 40 ? 3.3 : 1);
                tmpObjects.forEach((healthy) => {
                    healthy.health -= val;
                });
            }, 1);
        }
    }
}
if(nears.filter(near => near.gathering).length>1) {
    player.chat.message = "a";
    healing();
}

function wiggleGameObject(dir, sid) {
    tmpObj = findObjectBySid(sid);
    if (tmpObj) {
        tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir);
        tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir);
        if (tmpObj.health) {
            objectManager.hitObj.push(tmpObj);
        }
    }
}

function shootTurret(sid, dir) {
    tmpObj = findObjectBySid(sid);
    if (tmpObj) {
        if (config.anotherVisual) {
            tmpObj.lastDir = dir;
        } else {
            tmpObj.dir = dir;
        }
        tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir + Math.PI);
        tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir + Math.PI);
    }
}

function updatePlayerValue(index, value, updateView) {
    if (player) {
        player[index] = value;
        if (index == "points") {
            if (configs.autoBuy) {
                autoBuy.hat();
                autoBuy.acc();
            }
        } else if (index == "kills") {
            if (configs.killChat) {
            }
        }
    }
}

function updateItems(data, wpn) {
    if (data) {
        if (wpn) {
            player.weapons = data;
            player.primaryIndex = player.weapons[0];
            player.secondaryIndex = player.weapons[1];
            if (!instaC.isTrue) {
                selectWeapon(player.weapons[0]);
            }
        } else {
            player.items = data;
        }
    }

    for (let i = 0; i < items.list.length; i++) {
        let tmpI = items.weapons.length + i;
        let actionBarItem = verify("actionBarItem" + tmpI);
        actionBarItem.style.display = player.items.indexOf(items.list[i].id) >= 0 ? "inline-block" : "none";
    }

    for (let i = 0; i < items.weapons.length; i++) {
        let actionBarItem = verify("actionBarItem" + i);
        actionBarItem.style.display = player.weapons[items.weapons[i].type] == items.weapons[i].id ? "inline-block" : "none";
    }

    let kms = player.weapons[0] == 3 && player.weapons[1] == 15;
    if (kms) {
        verify("actionBarItem3").style.display = "none";
        verify("actionBarItem4").style.display = "inline-block";
    }
}

function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
    projectileManager.addProjectile(x, y, dir, range, speed, indx, null, null, layer, inWindow).sid = sid;
    runAtNextTick.push(Array.prototype.slice.call(arguments));
}

function remProjectile(sid, range) {
    for (let i = 0; i < projectiles.length; ++i) {
        if (projectiles[i].sid == sid) {
            projectiles[i].range = range;
            let tmpObjects = objectManager.hitObj;
            objectManager.hitObj = [];
            game.tickBase(() => {
                let val = projectiles[i].dmg;
                tmpObjects.forEach((healthy) => {
                    if (healthy.projDmg) {
                        healthy.health -= val;
                    }
                });
            }, 1);
        }
    }
}

function setPlayerTeam(team, isOwner) {
    if (player) {
        player.team = team;
        player.isOwner = isOwner;
        if (team == null)
            alliancePlayers = [];
    }
}

function setAlliancePlayers(data) {
    alliancePlayers = data;
}

function updateStoreItems(type, id, index) {
    if (index) {
        if (!type)
            player.tails[id] = 1;
        else {
            player.latestTail = id;
        }
    } else {
        if (!type)
            player.skins[id] = 1,
                id == 7 && (HANS.reSync = true);
        else {
            player.latestSkin = id;
        }
    }
}


const videoContainer = document.createElement('div');
videoContainer.id = 'video-bg';
videoContainer.style.position = 'absolute';
videoContainer.style.width = '100%';
videoContainer.style.height = '100%';
videoContainer.style.zIndex = '10';
videoContainer.style.overflow = 'hidden';
const videoElement = document.createElement('video');
videoElement.src = '';
videoElement.autoplay = true;
videoElement.loop = true;
videoElement.muted = true;
videoElement.style.width = '100%';
videoElement.style.height = '100%';
videoContainer.style.zIndex = '-1';
videoContainer.style.opacity = '0.5';
videoContainer.appendChild(videoElement);
document.querySelector('#mainMenu').appendChild(videoContainer);


const chatLogBox = document.createElement('div');
chatLogBox.id = 'chatLog';
document.body.appendChild(chatLogBox);

function receiveChat(sid, message) {
    let tmpPlayer = findPlayerBySID(sid);
    tmpPlayer.chatMessage = message;
    tmpPlayer.chatCountdown = config.chatCountdown;
    const playerName = tmpPlayer.name;
    const chatMessage = document.createElement('div');
    chatMessage.textContent = `${playerName}: ${message}`;
    chatMessage.classList.add('chatMessage');
    chatLogBox.appendChild(chatMessage);
    chatLogBox.scrollTop = chatLogBox.scrollHeight;
}

function updateMinimap(data) {
    minimapData = data;
}

function showText(x, y, value, type) {
    textManager.showText(x, y, 55, 0.18, 600, Math.abs(value), value >= 0 ? "#ffffff" : "#8ecc51")
}

function renderLeaf(x, y, l, r, ctxt) {
    let endX = x + (l * Math.cos(r));
    let endY = y + (l * Math.sin(r));
    let width = l * 0.4;
    ctxt.moveTo(x, y);
    ctxt.beginPath();
    ctxt.quadraticCurveTo(((x + endX) / 2) + (width * Math.cos(r + Math.PI / 2)),
                          ((y + endY) / 2) + (width * Math.sin(r + Math.PI / 2)), endX, endY);
    ctxt.quadraticCurveTo(((x + endX) / 2) - (width * Math.cos(r + Math.PI / 2)),
                          ((y + endY) / 2) - (width * Math.sin(r + Math.PI / 2)), x, y);
    ctxt.closePath();
    ctxt.fill();
    ctxt.stroke();
}

function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
    tmpContext = tmpContext || mainContext;
    tmpContext.beginPath();
    tmpContext.arc(x, y, scale, 0, 2 * Math.PI);
    if (!dontFill) tmpContext.fill();
    if (!dontStroke) tmpContext.stroke();
}

function renderHealthCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
    tmpContext = tmpContext || mainContext;
    tmpContext.beginPath();
    tmpContext.arc(x, y, scale, 0, 2 * Math.PI);
    if (!dontFill) tmpContext.fill();
    if (!dontStroke) tmpContext.stroke();
}

function renderStar(ctxt, spikes, outer, inner) {
    let rot = Math.PI / 2 * 3;
    let x, y;
    let step = Math.PI / spikes;
    ctxt.beginPath();
    ctxt.moveTo(0, -outer);
    for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outer;
        y = Math.sin(rot) * outer;
        ctxt.lineTo(x, y);
        rot += step;
        x = Math.cos(rot) * inner;
        y = Math.sin(rot) * inner;
        ctxt.lineTo(x, y);
        rot += step;
    }
    ctxt.lineTo(0, -outer);
    ctxt.closePath();
}

function renderHealthStar(ctxt, spikes, outer, inner) {
    let rot = Math.PI / 2 * 3;
    let x, y;
    let step = Math.PI / spikes;
    ctxt.beginPath();
    ctxt.moveTo(0, -outer);
    for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outer;
        y = Math.sin(rot) * outer;
        ctxt.lineTo(x, y);
        rot += step;
        x = Math.cos(rot) * inner;
        y = Math.sin(rot) * inner;
        ctxt.lineTo(x, y);
        rot += step;
    }
    ctxt.lineTo(0, -outer);
    ctxt.closePath();
}

function renderRect(x, y, w, h, ctxt, dontStroke, dontFill) {
    if (!dontFill) ctxt.fillRect(x - (w / 2), y - (h / 2), w, h);
    if (!dontStroke) ctxt.strokeRect(x - (w / 2), y - (h / 2), w, h);
}

function renderHealthRect(x, y, w, h, ctxt, dontStroke, dontFill) {
    if (!dontFill) ctxt.fillRect(x - (w / 2), y - (h / 2), w, h);
    if (!dontStroke) ctxt.strokeRect(x - (w / 2), y - (h / 2), w, h);
}

function renderRectCircle(x, y, s, sw, seg, ctxt, dontStroke, dontFill) {
    ctxt.save();
    ctxt.translate(x, y);
    seg = Math.ceil(seg / 2);
    for (let i = 0; i < seg; i++) {
        renderRect(0, 0, s * 2, sw, ctxt, dontStroke, dontFill);
        ctxt.rotate(Math.PI / seg);
    }
    ctxt.restore();
}

function renderBlob(ctxt, spikes, outer, inner) {
    let rot = Math.PI / 2 * 3;
    let x, y;
    let step = Math.PI / spikes;
    let tmpOuter;
    ctxt.beginPath();
    ctxt.moveTo(0, -inner);
    for (let i = 0; i < spikes; i++) {
        tmpOuter = UTILS.randInt(outer + 0.9, outer * 1.2);
        ctxt.quadraticCurveTo(Math.cos(rot + step) * tmpOuter, Math.sin(rot + step) * tmpOuter,
                              Math.cos(rot + (step * 2)) * inner, Math.sin(rot + (step * 2)) * inner);
        rot += step * 2;
    }
    ctxt.lineTo(0, -inner);
    ctxt.closePath();
}

function renderTriangle(s, ctx) {
    ctx = ctx || mainContext;
    let h = s * (Math.sqrt(3) / 2);
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-s / 2, h / 2);
    ctx.lineTo(s / 2, h / 2);
    ctx.lineTo(0, -h / 2);
    ctx.fill();
    ctx.closePath();
}

function prepareMenuBackground() {

}

function renderPlayers(xOffset, yOffset, zIndex) {
    mainContext.globalAlpha = 1;
    mainContext.fillStyle = "#91b2db";
    for (var i = 0; i < players.length; ++i) {
        tmpObj = players[i];
        if (tmpObj.zIndex == zIndex) {
            tmpObj.animate(delta);
            if (tmpObj.visible) {
                tmpObj.skinRot += (0.002 * delta);
                tmpDir = (tmpObj==player?getVisualDir():(tmpObj.dir || 0));
                tmpObj.skinRot += (0.001 * delta);
                tmpDir = (!configs.showDir && !useWasd && tmpObj == player) ? configs.attackDir ? getVisualDir() : getSafeDir() : (tmpObj.dir || 0);
                mainContext.save();
                mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
                mainContext.rotate(tmpDir + tmpObj.dirPlus);
                renderPlayer(tmpObj, mainContext);
                mainContext.restore();
            }
        }
    }
}


function renderPlayer(obj, ctxt) {
    ctxt = ctxt || mainContext;
    ctxt.lineWidth = outlineWidth;
    ctxt.lineJoin = "miter";
    let handAngle = (Math.PI / 4) * (items.weapons[obj.weaponIndex].armS || 1);
    let oHandAngle = (obj.buildIndex < 0) ? (items.weapons[obj.weaponIndex].hndS || 1) : 1;
    let oHandDist = (obj.buildIndex < 0) ? (items.weapons[obj.weaponIndex].hndD || 1) : 1;

    let katanaMusket = (obj == player && obj.weapons[0] == 3 && obj.weapons[1] == 15);

    if (obj.tailIndex > 0) {
        renderTailTextureImage(obj.tailIndex, ctxt, obj);
    }

    if (obj.buildIndex < 0 && !items.weapons[obj.weaponIndex].aboveHand) {
        renderTool(items.weapons[katanaMusket ? 4 : obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt);
        if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
            renderProjectile(obj.scale, 0,
                             items.projectiles[items.weapons[obj.weaponIndex].projectile], mainContext);
        }
    }

    ctxt.fillStyle = config.skinColors[obj.skinColor];
    renderCircle(obj.scale * Math.cos(handAngle), (obj.scale * Math.sin(handAngle)), 14);
    renderCircle((obj.scale * oHandDist) * Math.cos(-handAngle * oHandAngle),
                 (obj.scale * oHandDist) * Math.sin(-handAngle * oHandAngle), 14);

    if (obj.buildIndex < 0 && items.weapons[obj.weaponIndex].aboveHand) {
        renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt);
        if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
            renderProjectile(obj.scale, 0,
                             items.projectiles[items.weapons[obj.weaponIndex].projectile], mainContext);
        }
    }

    if (obj.buildIndex >= 0) {
        var tmpSprite = getItemSprite(items.list[obj.buildIndex]);
        ctxt.drawImage(tmpSprite, obj.scale - items.list[obj.buildIndex].holdOffset, -tmpSprite.width / 2);
    }

    renderCircle(0, 0, obj.scale, ctxt);

    if (obj.skinIndex > 0) {
        ctxt.rotate(Math.PI / 2);
        renderTextureSkin(obj.skinIndex, ctxt, null, obj);
    }
}

var skinSprites2 = {};
var skinPointers2 = {};
function renderSkin2(index, ctxt, parentSkin, owner) {
    tmpSkin = skinSprites2[index];
    if (!tmpSkin) {
        var tmpImage = new Image();
        tmpImage.onload = function() {
            this.isLoaded = true;
            this.onload = null;
        };
        tmpImage.src = "https://moomoo.io/img/hats/hat_" + index + ".png";
        skinSprites2[index] = tmpImage;
        tmpSkin = tmpImage;
    }
    var tmpObj = parentSkin||skinPointers2[index];
    if (!tmpObj) {
        for (var i = 0; i < hats.length; ++i) {
            if (hats[i].id == index) {
                tmpObj = hats[i];
                break;
            }
        }
        skinPointers2[index] = tmpObj;
    }
    if (tmpSkin.isLoaded) {
        ctxt.drawImage(tmpSkin, -tmpObj.scale/2, -tmpObj.scale/2, tmpObj.scale, tmpObj.scale);
    }
    if (!parentSkin && tmpObj.topSprite) {
        ctxt.save();
        ctxt.rotate(owner.skinRot);
        renderSkin2(index + "_top", ctxt, tmpObj, owner);
        ctxt.restore();
    }
}

function renderTextureSkin(index, ctxt, parentSkin, owner) {
    if (!(tmpSkin = skinSprites[index])) {
        var tmpImage = new Image();
        tmpImage.onload = function() {
            this.isLoaded = true;
            this.onload = null;
        }
            ,
            tmpImage.src = setSkinTextureImage(index, "hat", index);
        skinSprites[index] = tmpImage;
        tmpSkin = tmpImage;
    }
    var tmpObj = parentSkin||skinPointers[index];
    if (!tmpObj) {
        for (var i = 0; i < hats.length; ++i) {
            if (hats[i].id == index) {
                tmpObj = hats[i];
                break;
            }
        }
        skinPointers[index] = tmpObj;
    }
    if (tmpSkin.isLoaded) {
        ctxt.drawImage(tmpSkin, -tmpObj.scale/2, -tmpObj.scale/2, tmpObj.scale, tmpObj.scale);
    }
    if (!parentSkin && tmpObj.topSprite) {
        ctxt.save();
        ctxt.rotate(owner.skinRot);
        renderSkin(index + "_top", ctxt, tmpObj, owner);
        ctxt.restore();
    }
}

function setSkinTextureImage(id, type, id2) {
    if (true) {
        if(type == "acc") {
            return ".././img/accessories/access_" + id + ".png";
        } else if(type == "hat") {
            return ".././img/hats/hat_" + id + ".png";
        } else {
            return ".././img/weapons/" + id + ".png";
        }
    }
}

let skinSprites = {};
let skinPointers = {};
let tmpSkin;

function renderSkin(index, ctxt, parentSkin, owner) {
    tmpSkin = skinSprites[index];
    if (!tmpSkin) {
        let tmpImage = new Image();
        tmpImage.onload = function() {
            this.isLoaded = true;
            this.onload = null;
        };
        tmpImage.src = "https://moomoo.io/img/hats/hat_" + index + ".png";
        skinSprites[index] = tmpImage;
        tmpSkin = tmpImage;
    }
    let tmpObj = parentSkin || skinPointers[index];
    if (!tmpObj) {
        for (let i = 0; i < hats.length; ++i) {
            if (hats[i].id == index) {
                tmpObj = hats[i];
                break;
            }
        }
        skinPointers[index] = tmpObj;
    }
    if (tmpSkin.isLoaded)
        ctxt.drawImage(tmpSkin, -tmpObj.scale / 2, -tmpObj.scale / 2, tmpObj.scale, tmpObj.scale);
    if (!parentSkin && tmpObj.topSprite) {
        ctxt.save();
        ctxt.rotate(owner.skinRot);
        renderSkin(index + "_top", ctxt, tmpObj, owner);
        ctxt.restore();
    }
}


function setTailTextureImage(id, type, id2) {
    if (true) {
        if(type == "acc") {
            return ".././img/accessories/access_" + id + ".png";
        } else if(type == "hat") {
            return ".././img/hats/hat_" + id + ".png";
        } else {
            return ".././img/weapons/" + id + ".png";
        }
    } else {
        if(type == "acc") {
            return ".././img/accessories/access_" + id + ".png";
        } else if(type == "hat") {
            return ".././img/hats/hat_" + id + ".png";
        } else {
            return ".././img/weapons/" + id + ".png";
        }
    }
}
function renderTailTextureImage(index, ctxt, owner) {
    if (!(tmpSkin = accessSprites[index + (txt ? "lol" : 0)])) {
        var tmpImage = new Image();
        tmpImage.onload = function() {
            this.isLoaded = true,
                this.onload = null
        }
            ,
            tmpImage.src = setTailTextureImage(index, "acc"),
            accessSprites[index + (txt ? "lol" : 0)] = tmpImage,
            tmpSkin = tmpImage;
    }
    var tmpObj = accessPointers[index];
    if (!tmpObj) {
        for (var i = 0; i < accessories.length; ++i) {
            if (accessories[i].id == index) {
                tmpObj = accessories[i];
                break;
            }
        }
        accessPointers[index] = tmpObj;
    }
    if (tmpSkin.isLoaded) {
        ctxt.save();
        ctxt.translate(-20 - (tmpObj.xOff||0), 0);
        if (tmpObj.spin)
            ctxt.rotate(owner.skinRot);
        ctxt.drawImage(tmpSkin, -(tmpObj.scale/2), -(tmpObj.scale/2), tmpObj.scale, tmpObj.scale);
        ctxt.restore();
    }
}

let accessSprites = {};
let accessPointers = {};
var txt = true;

function renderTail(index, ctxt, owner) {
    tmpSkin = accessSprites[index];
    if (!tmpSkin) {
        let tmpImage = new Image();
        tmpImage.onload = function() {
            this.isLoaded = true;
            this.onload = null;
        };
        tmpImage.src = "https://moomoo.io/img/accessories/access_" + index + ".png";
        accessSprites[index] = tmpImage;
        tmpSkin = tmpImage;
    }
    let tmpObj = accessPointers[index];
    if (!tmpObj) {
        for (let i = 0; i < accessories.length; ++i) {
            if (accessories[i].id == index) {
                tmpObj = accessories[i];
                break;
            }
        }
        accessPointers[index] = tmpObj;
    }
    if (tmpSkin.isLoaded) {
        ctxt.save();
        ctxt.translate(-20 - (tmpObj.xOff || 0), 0);
        if (tmpObj.spin)
            ctxt.rotate(owner.skinRot);
        ctxt.drawImage(tmpSkin, -(tmpObj.scale / 2), -(tmpObj.scale / 2), tmpObj.scale, tmpObj.scale);
        ctxt.restore();
    }
}

var accessSprites2 = {};
var accessPointers2 = {};
function renderTail2(index, ctxt, owner) {
    tmpSkin = accessSprites2[index];
    if (!tmpSkin) {
        var tmpImage = new Image();
        tmpImage.onload = function() {
            this.isLoaded = true;
            this.onload = null;
        };
        tmpImage.src = "https://moomoo.io/img/accessories/access_" + index + ".png";
        accessSprites2[index] = tmpImage;
        tmpSkin = tmpImage;
    }
    var tmpObj = accessPointers2[index];
    if (!tmpObj) {
        for (var i = 0; i < accessories.length; ++i) {
            if (accessories[i].id == index) {
                tmpObj = accessories[i];
                break;
            }
        }
        accessPointers2[index] = tmpObj;
    }
    if (tmpSkin.isLoaded) {
        ctxt.save();
        ctxt.translate(-20 - (tmpObj.xOff||0), 0);
        if (tmpObj.spin)
            ctxt.rotate(owner.skinRot);
        ctxt.drawImage(tmpSkin, -(tmpObj.scale/2), -(tmpObj.scale/2), tmpObj.scale, tmpObj.scale);
        ctxt.restore();
    }
}

let toolSprites = {};
function renderTool(obj, variant, x, y, ctxt) {
    let tmpSrc = obj.src + (variant || "");
    let tmpSprite = toolSprites[tmpSrc];
    if (!tmpSprite) {
        tmpSprite = new Image();
        tmpSprite.onload = function() {
            this.isLoaded = true;
        }
        tmpSprite.src = "https://moomoo.io/img/weapons/" + tmpSrc + ".png";
        toolSprites[tmpSrc] = tmpSprite;
    }
    if (tmpSprite.isLoaded)
        ctxt.drawImage(tmpSprite, x + obj.xOff - (obj.length / 2), y + obj.yOff - (obj.width / 2), obj.length, obj.width);
}

function renderProjectiles(layer, xOffset, yOffset) {
    for (let i = 0; i < projectiles.length; i++) {
        tmpObj = projectiles[i];
        if (tmpObj.active && tmpObj.layer == layer && tmpObj.inWindow) {
            tmpObj.update(delta);
            if (tmpObj.active && isOnScreen(tmpObj.x - xOffset, tmpObj.y - yOffset, tmpObj.scale)) {
                mainContext.save();
                mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
                mainContext.rotate(tmpObj.dir);
                renderProjectile(0, 0, tmpObj, mainContext, 1);
                mainContext.restore();
            }
        }
    };
}

let projectileSprites = {};

function renderProjectile(x, y, obj, ctxt, debug) {
    if (obj.src) {
        let tmpSrc = items.projectiles[obj.indx].src;
        let tmpSprite = projectileSprites[tmpSrc];
        if (!tmpSprite) {
            tmpSprite = new Image();
            tmpSprite.onload = function() {
                this.isLoaded = true;
            }
            tmpSprite.src = "https://moomoo.io/img/weapons/" + tmpSrc + ".png";
            projectileSprites[tmpSrc] = tmpSprite;
        }
        if (tmpSprite.isLoaded)
            ctxt.drawImage(tmpSprite, x - (obj.scale / 2), y - (obj.scale / 2), obj.scale, obj.scale);
    } else if (obj.indx == 1) {
        ctxt.fillStyle = "#939393";
        renderCircle(x, y, obj.scale, ctxt);
    }
}

let aiSprites = {};

function renderAI(obj, ctxt) {
    let tmpIndx = obj.index;
    let tmpSprite = aiSprites[tmpIndx];
    if (!tmpSprite) {
        let tmpImg = new Image();
        tmpImg.onload = function() {
            this.isLoaded = true;
            this.onload = null;
        };
        tmpImg.src = "https://moomoo.io/img/animals/" + obj.src + ".png";
        tmpSprite = tmpImg;
        aiSprites[tmpIndx] = tmpSprite;
    }
    if (tmpSprite.isLoaded) {
        let tmpScale = obj.scale * 1.2 * (obj.spriteMlt || 1);
        ctxt.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale * 2, tmpScale * 2);
    }
}

function renderWaterBodies(xOffset, yOffset, ctxt, padding) {

    let tmpW = config.riverWidth + padding;
    let tmpY = (config.mapScale / 2) - yOffset - (tmpW / 2);
    if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
        ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW);
    }
}

let gameObjectSprites = {};

function getResSprite(obj) {
    let biomeID = (obj.y>=config.mapScale-config.snowBiomeTop)?2:((obj.y<=config.snowBiomeTop)?1:0);
    let tmpIndex = (obj.type + "_" + obj.scale + "_" + biomeID);
    let tmpSprite = gameObjectSprites[tmpIndex];
    if (!tmpSprite) {
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = tmpCanvas.height = (obj.scale * 2.1) + outlineWidth;
        let tmpContext = tmpCanvas.getContext('2d');
        tmpContext.translate((tmpCanvas.width / 2), (tmpCanvas.height / 2));
        tmpContext.rotate(UTILS.randFloat(0, Math.PI));
        tmpContext.strokeStyle = outlineColor;
        tmpContext.lineWidth = outlineWidth;
        if (obj.type == 0) {
            let tmpScale;
            let tmpCount = 5;
            tmpContext.globalAlpha = 1;
            for (let i = 0; i < 2; ++i) {
                tmpScale = obj.scale * (!i?1:0.5);
                renderStar(tmpContext, tmpCount, tmpScale, tmpScale * 0.7);
                tmpContext.fillStyle = !biomeID?(!i?"#9ebf57":"#b4db62"):(!i?"#e3f1f4":"#fff");
                tmpContext.fill();
                if (!i) {
                    tmpContext.stroke();
                    tmpContext.globalAlpha = 1;
                }
            }
        } else if (obj.type == 1) {
            if (biomeID == 2) {
                tmpContext.fillStyle = "#606060";
                renderStar(tmpContext, 5, obj.scale * 0.3, obj.scale * 0.71);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#89a54c";
                renderCircle(0, 0, obj.scale * 0.55, tmpContext);
                tmpContext.fillStyle = "#a5c65b";
                renderCircle(0, 0, obj.scale * 0.3, tmpContext, true);
            } else {
                renderBlob(tmpContext, 6, tmpObj.scale, tmpObj.scale * 0.7);
                tmpContext.fillStyle = biomeID?"#e3f1f4":"#89a54c";
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = biomeID?"#c889f5":"#FF6F61";
                let tmpRange;
                let berries = 4;
                let rotVal = (Math.PI * 2) / berries;
                for (let i = 0; i < berries; ++i) {
                    tmpRange = UTILS.randInt(tmpObj.scale/3.5, tmpObj.scale/2.3);
                    renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i),
                                 UTILS.randInt(10, 12), tmpContext);
                }
            }
        } else if (obj.type == 2 || obj.type == 3) {
            tmpContext.fillStyle = (obj.type==2)?(biomeID==2?"#938d77":"#939393"):"#e0c655";
            renderStar(tmpContext, 3, obj.scale, obj.scale);
            tmpContext.fill();
            tmpContext.stroke();
            tmpContext.fillStyle = (obj.type==2)?(biomeID==2?"#b2ab90":"#bcbcbc"):"#ebdca3";
            renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
            tmpContext.fill();
        }
        tmpSprite = tmpCanvas;
        gameObjectSprites[tmpIndex] = tmpSprite;
    }
    return tmpSprite;
}

let itemSprites = [];
function getItemSprite(obj, asIcon) {
    let tmpSprite = itemSprites[obj.id];
    if (!tmpSprite || asIcon) {
        let tmpCanvas = document.createElement("canvas");
        let reScale = ((!asIcon && obj.name == "windmill") ? items.list[4].scale : obj.scale);
        tmpCanvas.width = tmpCanvas.height = (reScale * 2.5) + outlineWidth + (items.list[obj.id].spritePadding || 0);
        if (config.useWebGl) {
            let gl = tmpCanvas.getContext("webgl");
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

            function render(vs, fs, vertice, type) {

                let vShader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vShader, vs);
                gl.compileShader(vShader);
                gl.getShaderParameter(vShader, gl.COMPILE_STATUS);

                let fShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fShader, fs);
                gl.compileShader(fShader);
                gl.getShaderParameter(fShader, gl.COMPILE_STATUS);

                let program = gl.createProgram();
                gl.attachShader(program, vShader);
                gl.attachShader(program, fShader);
                gl.linkProgram(program);
                gl.getProgramParameter(program, gl.LINK_STATUS);
                gl.useProgram(program);

                let vertex = gl.getAttribLocation(program, "vertex");
                gl.enableVertexAttribArray(vertex);
                gl.vertexAttribPointer(vertex, 2, gl.FLOAT, false, 0, 0);

                let vertices = vertice.length / 2;
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertice), gl.DYNAMIC_DRAW);
                gl.drawArrays(type, 0, vertices);
            }

            function hexToRgb(hex) {
                return hex.slice(1).match(/.{1,2}/g).map(g => parseInt(g, 16));
            }

            function getRgb(r, g, b) {
                return [r / 255, g / 255, b / 255].join(", ");
            }

            let max = 100;
            for (let i = 0; i < max; i++) {
                let radian = (Math.PI * (i / (max / 2)));
                render(`
                            precision mediump float;
                            attribute vec2 vertex;
                            void main(void) {
                                gl_Position = vec4(vertex, 0, 1);
                            }
                            `, `
                            precision mediump float;
                            void main(void) {
                                gl_FragColor = vec4(${getRgb(...hexToRgb("#fff"))}, 1);
                            }
                            `, [
                    0 + (Math.cos(radian) * 0.5), 0 + (Math.sin(radian) * 0.5),
                    0, 0,
                ], gl.LINE_LOOP);
            }
        } else {
            let tmpContext = tmpCanvas.getContext("2d");
            tmpContext.translate((tmpCanvas.width / 2), (tmpCanvas.height / 2));
            tmpContext.rotate(asIcon ? 0 : (Math.PI / 2));
            tmpContext.strokeStyle = outlineColor;
            tmpContext.lineWidth = outlineWidth * (asIcon ? (tmpCanvas.width / 81) : 1);
            if (!asIcon) {
                tmpContext.shadowColor = `rgba(0, 0, 0, ${Math.min(obj.name == "pit trap" ? 0.8 : 0.5, obj.alpha)})`;
            }

            if (obj.name == "apple") {
                tmpContext.fillStyle = "#c15555";
                renderCircle(0, 0, obj.scale, tmpContext);
                tmpContext.fillStyle = "#5db1d7";
                let leafDir = -(Math.PI / 2);
                renderLeaf(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir),
                           25, leafDir + Math.PI / 2, tmpContext);
            } else if (obj.name == "cookie") {
                tmpContext.fillStyle = "#cca861";
                renderCircle(0, 0, obj.scale, tmpContext);
                tmpContext.fillStyle = "#937c4b";
                let chips = 4;
                let rotVal = (Math.PI * 2) / chips;
                let tmpRange;
                for (let i = 0; i < chips; ++i) {
                    tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
                    renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i),
                                 UTILS.randInt(4, 5), tmpContext, true);
                }
            } else if (obj.name == "cheese") {
                tmpContext.fillStyle = "#f4f3ac";
                renderCircle(0, 0, obj.scale, tmpContext);
                tmpContext.fillStyle = "#f0fcfb";
                let chips = 4;
                let rotVal = (Math.PI * 2) / chips;
                let tmpRange;
                for (let i = 0; i < chips; ++i) {
                    tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
                    renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i),
                                 UTILS.randInt(4, 5), tmpContext, true);
                }
            } else if (obj.name == "wood wall" || obj.name == "stone wall" || obj.name == "castle wall") {
                tmpContext.fillStyle = (obj.name == "castle wall") ? "#83898e" : (obj.name == "wood wall") ?
                    "#a5974c" : "#939393";
                let sides = (obj.name == "castle wall") ? 4 : 3;
                renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = (obj.name == "castle wall") ? "#9da4aa" : (obj.name == "wood wall") ?
                    "#c9b758" : "#bcbcbc";
                renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65);
                tmpContext.fill();
            } else if (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "poison spikes" ||
                       obj.name == "spinning spikes") {
                tmpContext.fillStyle = (obj.name == "poison spikes") ? "#7b935d" : "#939393";
                let tmpScale = (obj.scale * 0.6);
                renderStar(tmpContext, (obj.name == "spikes") ? 5 : 6, obj.scale, tmpScale);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#a5974c";
                renderCircle(0, 0, tmpScale, tmpContext);
                tmpContext.fillStyle = "#c9b758";
                renderCircle(0, 0, tmpScale / 2, tmpContext, true);
            } else if (obj.name == "windmill" || obj.name == "faster windmill" || obj.name == "power mill") {
                tmpContext.fillStyle = "#a5974c";
                renderCircle(0, 0, reScale, tmpContext);
                tmpContext.fillStyle = "#c9b758";
                renderRectCircle(0, 0, reScale * 1.5, 29, 4, tmpContext);
                tmpContext.fillStyle = "#a5974c";
                renderCircle(0, 0, reScale * 0.5, tmpContext);
            } else if (obj.name == "mine") {
                tmpContext.fillStyle = "#939393";
                renderStar(tmpContext, 3, obj.scale, obj.scale);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#bcbcbc";
                renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
                tmpContext.fill();
            } else if (obj.name == "sapling") {
                for (let i = 0; i < 2; ++i) {
                    let tmpScale = obj.scale * (!i ? 1 : 0.5);
                    renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
                    tmpContext.fillStyle = (!i ? "#9ebf57" : "#b4db62");
                    tmpContext.fill();
                    if (!i) tmpContext.stroke();
                }
            } else if (obj.name == "pit trap") {
                tmpContext.fillStyle = "#a5974c";
                renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = outlineColor;
                renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
                tmpContext.fill();
            } else if (obj.name == "boost pad") {
                tmpContext.fillStyle = "#7e7f82";
                renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#dbd97d";
                renderTriangle(obj.scale * 1, tmpContext);
            } else if (obj.name == "turret") {
                tmpContext.fillStyle = "#a5974c";
                renderCircle(0, 0, obj.scale, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#939393";
                let tmpLen = 50;
                renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
                renderCircle(0, 0, obj.scale * 0.6, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
            } else if (obj.name == "platform") {
                tmpContext.fillStyle = "#cebd5f";
                let tmpCount = 4;
                let tmpS = obj.scale * 2;
                let tmpW = tmpS / tmpCount;
                let tmpX = -(obj.scale / 2);
                for (let i = 0; i < tmpCount; ++i) {
                    renderRect(tmpX - (tmpW / 2), 0, tmpW, obj.scale * 2, tmpContext);
                    tmpContext.fill();
                    tmpContext.stroke();
                    tmpX += tmpS / tmpCount;
                }
            } else if (obj.name == "healing pad") {
                tmpContext.fillStyle = "#7e7f82";
                renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#db6e6e";
                renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
            } else if (obj.name == "spawn pad") {
                tmpContext.fillStyle = "#7e7f82";
                renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.fillStyle = "#71aad6";
                renderCircle(0, 0, obj.scale * 0.6, tmpContext);
            } else if (obj.name == "blocker") {
                tmpContext.fillStyle = "#7e7f82";
                renderCircle(0, 0, obj.scale, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.rotate(Math.PI / 4);
                tmpContext.fillStyle = "#db6e6e";
                renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
            } else if (obj.name == "teleporter") {
                tmpContext.fillStyle = "#7e7f82";
                renderCircle(0, 0, obj.scale, tmpContext);
                tmpContext.fill();
                tmpContext.stroke();
                tmpContext.rotate(Math.PI / 4);
                tmpContext.fillStyle = "#d76edb";
                renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
            }
        }
        tmpSprite = tmpCanvas;
        if (!asIcon) {
            itemSprites[obj.id] = tmpSprite;
        }
    }
    return tmpSprite;
}


function getItemSprite2(obj, tmpX, tmpY) {
    let tmpContext = mainContext;
    let reScale = (obj.name == "windmill" ? items.list[4].scale : obj.scale);
    tmpContext.save();
    tmpContext.translate(tmpX, tmpY);
    tmpContext.rotate(obj.dir);
    tmpContext.strokeStyle = outlineColor;
    tmpContext.lineWidth = outlineWidth;
    if (obj.name == "apple") {
        tmpContext.fillStyle = "#c15555";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#89a54c";
        let leafDir = -(Math.PI / 2);
        renderLeaf(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir),
                   25, leafDir + Math.PI / 2, tmpContext);
    } else if (obj.name == "cookie") {
        tmpContext.fillStyle = "#cca861";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#937c4b";
        let chips = 4;
        let rotVal = (Math.PI * 2) / chips;
        let tmpRange;
        for (let i = 0; i < chips; ++i) {
            tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
            renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i),
                         UTILS.randInt(4, 5), tmpContext, true);
        }
    } else if (obj.name == "cheese") {
        tmpContext.fillStyle = "#f4f3ac";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#c3c28b";
        let chips = 4;
        let rotVal = (Math.PI * 2) / chips;
        let tmpRange;
        for (let i = 0; i < chips; ++i) {
            tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
            renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i),
                         UTILS.randInt(4, 5), tmpContext, true);
        }
    } else if (obj.name == "wood wall" || obj.name == "stone wall" || obj.name == "castle wall") {
        tmpContext.fillStyle = (obj.name == "castle wall") ? "#83898e" : (obj.name == "wood wall") ?
            "#a5974c" : "#939393";
        let sides = (obj.name == "castle wall") ? 4 : 3;
        renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = (obj.name == "castle wall") ? "#9da4aa" : (obj.name == "wood wall") ?
            "#c9b758" : "#bcbcbc";
        renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65);
        tmpContext.fill();
    } else if (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "poison spikes" ||
               obj.name == "spinning spikes") {
        tmpContext.fillStyle = (obj.name == "poison spikes") ? "#7b935d" : "#939393";
        let tmpScale = (obj.scale * 0.6);
        renderStar(tmpContext, (obj.name == "spikes") ? 5 : 6, obj.scale, tmpScale);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, tmpScale, tmpContext);
        tmpContext.fillStyle = "#c9b758";
        renderCircle(0, 0, tmpScale / 2, tmpContext, true);
    } else if (obj.name == "windmill" || obj.name == "faster windmill" || obj.name == "power mill") {
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, reScale, tmpContext);
        tmpContext.fillStyle = "#c9b758";
        renderRectCircle(0, 0, reScale * 1.5, 29, 4, tmpContext);
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, reScale * 0.5, tmpContext);
    } else if (obj.name == "mine") {
        tmpContext.fillStyle = "#939393";
        renderStar(tmpContext, 3, obj.scale, obj.scale);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#bcbcbc";
        renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
        tmpContext.fill();
    } else if (obj.name == "sapling") {
        for (let i = 0; i < 2; ++i) {
            let tmpScale = obj.scale * (!i ? 1 : 0.5);
            renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
            tmpContext.fillStyle = (!i ? "#9ebf57" : "#b4db62");
            tmpContext.fill();
            if (!i) tmpContext.stroke();
        }
    } else if (obj.name == "pit trap") {
        tmpContext.fillStyle = "#a5974c";
        renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = outlineColor;
        renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
        tmpContext.fill();
    } else if (obj.name == "boost pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#dbd97d";
        renderTriangle(obj.scale * 1, tmpContext);
    } else if (obj.name == "turret") {
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#939393";
        let tmpLen = 50;
        renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
        renderCircle(0, 0, obj.scale * 0.6, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
    } else if (obj.name == "platform") {
        tmpContext.fillStyle = "#cebd5f";
        let tmpCount = 4;
        let tmpS = obj.scale * 2;
        let tmpW = tmpS / tmpCount;
        let tmpX = -(obj.scale / 2);
        for (let i = 0; i < tmpCount; ++i) {
            renderRect(tmpX - (tmpW / 2), 0, tmpW, obj.scale * 2, tmpContext);
            tmpContext.fill();
            tmpContext.stroke();
            tmpX += tmpS / tmpCount;
        }
    } else if (obj.name == "healing pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#db6e6e";
        renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
    } else if (obj.name == "spawn pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#71aad6";
        renderCircle(0, 0, obj.scale * 0.6, tmpContext);
    } else if (obj.name == "blocker") {
        tmpContext.fillStyle = "#7e7f82";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.rotate(Math.PI / 4);
        tmpContext.fillStyle = "#db6e6e";
        renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
    } else if (obj.name == "teleporter") {
        tmpContext.fillStyle = "#7e7f82";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.rotate(Math.PI / 4);
        tmpContext.fillStyle = "#d76edb";
        renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
    }
    tmpContext.restore();
}

let objSprites = [];

function getObjSprite(obj) {
    let tmpSprite = objSprites[obj.id];
    if (!tmpSprite) {
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = tmpCanvas.height = obj.scale * 2.5 + outlineWidth + (items.list[obj.id].spritePadding || 0);
        let tmpContext = tmpCanvas.getContext("2d");
        tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
        tmpContext.rotate(Math.PI / 2);
        tmpContext.strokeStyle = outlineColor;
        tmpContext.lineWidth = outlineWidth;
        tmpContext.globalAlpha = .7;
        if (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "poison spikes" || obj.name == "spinning spikes") {
            tmpContext.fillStyle = obj.name == "poison spikes" ? "#7b935d" : "#939393";
            let tmpScale = obj.scale * 0.6;
            renderStar(tmpContext, obj.name == "spikes" ? 5 : 6, obj.scale, tmpScale);
            tmpContext.fill();
            tmpContext.stroke();
            tmpContext.fillStyle = "#a5974c";
            renderCircle(0, 0, tmpScale, tmpContext);
            tmpContext.fillStyle = "#c9b758";
            renderCircle(0, 0, tmpScale / 2, tmpContext, true);
        } else if (obj.name == "pit trap") {
            tmpContext.fillStyle = "#a5974c";
            renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
            tmpContext.fill();
            tmpContext.stroke();
            tmpContext.fillStyle = outlineColor;
            renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
            tmpContext.fill();
        }
        tmpSprite = tmpCanvas;
        objSprites[obj.id] = tmpSprite;
    }
    return tmpSprite;
}

function getMarkSprite(obj, tmpContext, tmpX, tmpY, opacity = 0.8) {
    let center = {
        x: screenWidth / 2,
        y: screenHeight / 2,
    };

    tmpContext.lineWidth = outlineWidth;
    tmpContext.save();

    tmpContext.globalAlpha = opacity;

    tmpContext.strokeStyle = outlineColor;
    tmpContext.translate(tmpX, tmpY);
    tmpContext.rotate(obj.dir || getAttackDir());

    if (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "poison spikes" || obj.name == "spinning spikes") {
        tmpContext.fillStyle = (obj.name == "poison spikes") ? "#7b935d" : "#939393";
        let tmpScale = obj.scale * 0.6;
        renderStar(tmpContext, (obj.name == "spikes") ? 5 : 6, obj.scale, tmpScale);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, tmpScale, tmpContext);
        tmpContext.fillStyle = (player && obj.owner && player.sid !== obj.owner.sid && !tmpObj.findAllianceBySid(obj.owner.sid))
            ? "#a34040"
            : "#c9b758";
        renderCircle(0, 0, tmpScale / 2, tmpContext, true);
    } else if (obj.name == "turret") {
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#939393";
        let tmpLen = 50;
        renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
        renderCircle(0, 0, obj.scale * 0.6, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
    } else if (obj.name == "teleporter") {
        tmpContext.fillStyle = "#7e7f82";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.rotate(Math.PI / 4);
        tmpContext.fillStyle = "#d76edb";
        renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
    } else if (obj.name == "platform") {
        tmpContext.fillStyle = "#cebd5f";
        let tmpCount = 4;
        let tmpS = obj.scale * 2;
        let tmpW = tmpS / tmpCount;
        let tmpX = -(obj.scale / 2);
        for (let i = 0; i < tmpCount; ++i) {
            renderRect(tmpX - (tmpW / 2), 0, tmpW, obj.scale * 2, tmpContext);
            tmpContext.fill();
            tmpContext.stroke();
            tmpX += tmpS / tmpCount;
        }
    } else if (obj.name == "healing pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#db6e6e";
        renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
    } else if (obj.name == "spawn pad") {
        tmpContext.fillStyle = "#7e7f82";
        renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#71aad6";
        renderCircle(0, 0, obj.scale * 0.6, tmpContext);
    } else if (obj.name == "blocker") {
        tmpContext.fillStyle = "#7e7f82";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.rotate(Math.PI / 4);
        tmpContext.fillStyle = "#db6e6e";
        renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
    } else if (obj.name == "windmill" || obj.name == "faster windmill" || obj.name == "power mill") {
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, obj.scale, tmpContext);
        tmpContext.fillStyle = "#c9b758";
        renderRectCircle(0, 0, obj.scale * 1.5, 29, 4, tmpContext);
        tmpContext.fillStyle = "#a5974c";
        renderCircle(0, 0, obj.scale * 0.5, tmpContext);
    } else if (obj.name == "pit trap") {
        tmpContext.fillStyle = "#a5974c";
        renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = (player && obj.owner && player.sid !== obj.owner.sid && !tmpObj.findAllianceBySid(obj.owner.sid))
            ? "#a34040"
            : outlineColor;
        renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
        tmpContext.fill();
    }

    tmpContext.restore();
}

const renderDistance = 300000;

function isOnScreen(x, y, s) {
    const distanceSquared = (x - maxScreenWidth / 2) ** 2 + (y - maxScreenHeight / 2) ** 2;
    return distanceSquared <= renderDistance ** 2;
}
/*function isOnScreen(x, y, s) {
    return x + s >= 0 && x - s <= maxScreenWidth && y + s >= 0 && (y, s, maxScreenHeight);
}*/

function renderGameObjects(layer, xOffset, yOffset) {
    let tmpSprite;
    let tmpX;
    let tmpY;
    lstOfObjects.forEach((tmp) => {
        tmpObj = tmp;
        if (tmpObj.active && lstOfObjects.includes(tmp) && tmpObj.render) {
            tmpX = tmpObj.x + tmpObj.xWiggle - xOffset;
            tmpY = tmpObj.y + tmpObj.yWiggle - yOffset;
            if (layer == 0) {
                tmpObj.update(delta);
            }
            mainContext.globalAlpha = tmpObj.alpha;
            if (tmpObj.layer == layer && isOnScreen(tmpX, tmpY)) {
                if (tmpObj.isItem) {
                    if ((tmpObj.dmg || tmpObj.trap) && !tmpObj.isTeamObject(player)) {
                        tmpSprite = getObjSprite(tmpObj);
                    } else {
                        tmpSprite = getItemSprite(tmpObj);
                    }

                    mainContext.save();
                    mainContext.translate(tmpX, tmpY);
                    mainContext.rotate(tmpObj.dir);
                    if (!tmpObj.active) {
                        mainContext.scale(tmpObj.visScale / tmpObj.scale, tmpObj.visScale / tmpObj.scale);
                    }
                    mainContext.drawImage(tmpSprite, -(tmpSprite.width / 2), -(tmpSprite.height / 2));

                    if (tmpObj.blocker) {
                        mainContext.strokeStyle = outlineColor;
                        mainContext.globalAlpha = 0.3;
                        mainContext.lineWidth = 6;
                        renderCircle(0, 0, tmpObj.blocker, mainContext, false, true);
                    }
                    mainContext.restore();
                } else {
                    tmpSprite = getResSprite(tmpObj);
                    mainContext.drawImage(tmpSprite, tmpX - (tmpSprite.width / 2), tmpY - (tmpSprite.height / 2));
                }
            }

            /*if (layer == 3) {
                if (tmpObj.health < tmpObj.maxHealth) {
                    const radius = 25;
                    mainContext.strokeStyle = '#333';
                    mainContext.lineWidth = 5;
                    mainContext.fillStyle = '#FFF';
                    mainContext.beginPath();
                    mainContext.arc(tmpX, tmpY, radius + 5, 0, 2 * Math.PI);
                    mainContext.fill();
                    mainContext.stroke();

                    const healthAngle = (tmpObj.health / tmpObj.maxHealth) * 2 * Math.PI;
                    mainContext.fillStyle = tmpObj.isTeamObject(player) ? "#FFB6C1" : "#FF6F61";
                    mainContext.beginPath();
                    mainContext.moveTo(tmpX, tmpY);
                    mainContext.arc(tmpX, tmpY, radius, -Math.PI / 2, -Math.PI / 2 + healthAngle);
                    mainContext.lineTo(tmpX, tmpY);
                    mainContext.fill();
                }
            }*/
        }
    });

    if (layer == 0) {
        if (placeVisible.length) {
            placeVisible.forEach((places) => {
                places.opacity = Math.min(places.opacity + 0.05, 1);

                tmpX = places.x - xOffset;
                tmpY = places.y - yOffset;
                markObject(places, tmpX, tmpY, places.opacity);
            });
        }
    }
}


function markObject(tmpObj, tmpX, tmpY, opacity) {
    getMarkSprite(tmpObj, mainContext, tmpX, tmpY, opacity);
}

class MapPing {
    constructor(color, scale) {
        this.init = function(x, y) {
            this.scale = 0;
            this.x = x;
            this.y = y;
            this.active = true;
        };
        this.update = function(ctxt, delta) {
            if (this.active) {
                this.scale += 0.05 * delta;
                if (this.scale >= scale) {
                    this.active = false;
                } else {
                    ctxt.globalAlpha = (1 - Math.max(0, this.scale / scale));
                    ctxt.beginPath();
                    ctxt.arc((this.x / config.mapScale) * mapDisplay.width, (this.y / config.mapScale) *
                             mapDisplay.width, this.scale, 0, 2 * Math.PI);
                    ctxt.stroke();
                }
            }
        };
        this.color = color;
    }
}

function pingMap(x, y) {
    tmpPing = mapPings.find(pings => !pings.active);
    if (!tmpPing) {
        tmpPing = new MapPing("#FFB6C1", config.mapPingScale);
        mapPings.push(tmpPing);
    }
    tmpPing.init(x, y);
}

function updateMapMarker() {
    mapMarker.x = player.x;
    mapMarker.y = player.y;
}

function renderMinimap(delta) {
    if (player && player.alive) {
        mapContext.clearRect(0, 0, mapDisplay.width, mapDisplay.height);

        mapContext.lineWidth = 4;
        for (let i = 0; i < mapPings.length; ++i) {
            tmpPing = mapPings[i];
            mapContext.strokeStyle = tmpPing.color;
            tmpPing.update(mapContext, delta);
        }

        mapContext.globalAlpha = 1;
        mapContext.fillStyle = "#FFB6C1";
        renderCircle((player.x / config.mapScale) * mapDisplay.width,
                     (player.y / config.mapScale) * mapDisplay.height, 7, mapContext, true);
        mapContext.fillStyle = "rgba(255, 182, 193, 0.35)";
        if (player.team && minimapData) {
            for (let i = 0; i < minimapData.length;) {
                renderCircle((minimapData[i] / config.mapScale) * mapDisplay.width,
                             (minimapData[i + 1] / config.mapScale) * mapDisplay.height, 7, mapContext, true);
                i += 2;
            }
        }

        if (lastDeath) {
            mapContext.fillStyle = "#fc5553";
            mapContext.font = "34px 'Comic Sans MS', cursive";
            mapContext.textBaseline = "middle";
            mapContext.textAlign = "center";
            mapContext.fillText("x", (lastDeath.x / config.mapScale) * mapDisplay.width,
                                (lastDeath.y / config.mapScale) * mapDisplay.height);
        }

        if (mapMarker) {
            mapContext.fillStyle = "#fff";
            mapContext.font = "34px 'Comic Sans MS', cursive";
            mapContext.textBaseline = "middle";
            mapContext.textAlign = "center";
            mapContext.fillText("x", (mapMarker.x / config.mapScale) * mapDisplay.width,
                                (mapMarker.y / config.mapScale) * mapDisplay.height);
        }
    }
}

let iconSprites = {};
let icons = ["crown", "skull"];

function loadIcons() {
    for (let i = 0; i < icons.length; ++i) {
        let tmpSprite = new Image();
        tmpSprite.onload = function() {
            this.isLoaded = true;
        };
        tmpSprite.src = "./../img/icons/" + icons[i] + ".png";
        iconSprites[icons[i]] = tmpSprite;
    }
}
loadIcons();

function distBetween (e, t){
    try {
        return Math.hypot((t.y2||t.y)-(e.y2||e.y), (t.x2||t.x)-(e.x2||e.x));
    } catch(e){
        return Infinity;
    }
}

function updateGame() {
    if(gameObjects.length && inGame) {
        gameObjects.forEach((tmp) => {
            if(UTILS.getDistance(tmp.x, tmp.y, player.x, player.y) <= 1200) {
                if(!lstOfObjects.includes(tmp)) {
                    lstOfObjects.push(tmp);
                    tmp.render = true;
                }
            } else {
                if(lstOfObjects.includes(tmp)) {
                    if(UTILS.getDistance(tmp.x, tmp.y, player.x, player.y) >= 1200) {
                        tmp.render = false;
                        const index = lstOfObjects.indexOf(tmp);
                        if (index > -1) {
                            lstOfObjects.splice(index, 1);
                        }
                    }
                } else if(UTILS.getDistance(tmp.x, tmp.y, player.x, player.y) >= 1200) {
                    tmp.render = false;
                    const index = lstOfObjects.indexOf(tmp);
                    if (index > -1) {
                        lstOfObjects.splice(index, 1);
                    }
                } else {
                    tmp.render = false;
                    const index = lstOfObjects.indexOf(tmp);
                    if (index > -1) {
                        lstOfObjects.splice(index, 1);
                    }
                }
            }
        })
    }

    mainContext.beginPath();
    mainContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    mainContext.globalAlpha = 1;

    let enemyNear = null;
    let minDist = Infinity;
    for (let i = 0; i < players.length; i++) {
        let p = players[i];
        if (p !== player && p.visible) {
            let dist = UTILS.getDistance(player.x, player.y, p.x, p.y);
            if (dist < 400 && dist < minDist) {
                minDist = dist;
                enemyNear = p;
            }
        }
    }
        let easingFactor = 0.05;
    if (player) {
        if (enemyNear) {
            let midX = (player.x + enemyNear.x) / 2;
            let midY = (player.y + enemyNear.y) / 2;
            camX += (midX - camX) * (easingFactor * 2);
            camY += (midY - camY) * (easingFactor * 2);
        } else {
        camX += (player.x - camX) * easingFactor;
        camY += (player.y - camY) * easingFactor;
        }
    } else {
        camX = config.mapScale / 2;
        camY = config.mapScale / 2;
    }

    let lastTime = now - (1000 / config.serverUpdateRate);
    let tmpDiff;
    for (let i = 0; i < players.length + ais.length; ++i) {
        tmpObj = players[i] || ais[i - players.length];
        if (tmpObj && tmpObj.visible) {
            if (tmpObj.forcePos) {
                tmpObj.x = tmpObj.x2;
                tmpObj.y = tmpObj.y2;
                tmpObj.dir = tmpObj.d2;
            } else {
                let total = tmpObj.t2 - tmpObj.t1;
                let fraction = lastTime - tmpObj.t1;
                let ratio = (fraction / total);
                let rate = 170;
                tmpObj.dt += delta;
                let tmpRate = Math.min(1.7, tmpObj.dt / rate);
                tmpDiff = (tmpObj.x2 - tmpObj.x1);
                tmpObj.x = tmpObj.x1 + (tmpDiff * tmpRate);
                tmpDiff = (tmpObj.y2 - tmpObj.y1);
                tmpObj.y = tmpObj.y1 + (tmpDiff * tmpRate);
            }
        }
    }

    let xOffset = camX - (maxScreenWidth / 2);
    let yOffset = camY - (maxScreenHeight / 2);

    if (config.snowBiomeTop - yOffset <= 0 && config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight) {
        mainContext.fillStyle = "#b6db66";
        mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    } else if (config.mapScale - config.snowBiomeTop - yOffset <= 0) {
        mainContext.fillStyle = "#dbc666";
        mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    } else if (config.snowBiomeTop - yOffset >= maxScreenHeight) {
        mainContext.fillStyle = "#fff";
        mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    } else if (config.snowBiomeTop - yOffset >= 0) {
        mainContext.fillStyle = "#fff";
        mainContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset);
        mainContext.fillStyle = "#b6db66";
        mainContext.fillRect(0, config.snowBiomeTop - yOffset, maxScreenWidth,
                             maxScreenHeight - (config.snowBiomeTop - yOffset));
    } else {
        mainContext.fillStyle = "#b6db66";
        mainContext.fillRect(0, 0, maxScreenWidth,
                             (config.mapScale - config.snowBiomeTop - yOffset));
        mainContext.fillStyle = "#dbc666";
        mainContext.fillRect(0, (config.mapScale - config.snowBiomeTop - yOffset), maxScreenWidth,
                             maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset));
    }

    if (!firstSetup) {
        waterMult += waterPlus * config.waveSpeed * delta;
        if (waterMult >= config.waveMax) {
            waterMult = config.waveMax;
            waterPlus = -1;
        } else if (waterMult <= 1) {
            waterMult = waterPlus = 1;
        }
        mainContext.globalAlpha = 1;
        mainContext.fillStyle = "#dbc666";
        renderWaterBodies(xOffset, yOffset, mainContext, config.riverPadding);
        mainContext.fillStyle = "#91b2db";
        renderWaterBodies(xOffset, yOffset, mainContext, (waterMult - 1) * 250);
    }

    mainContext.lineWidth = 6;
    mainContext.strokeStyle = "#000";
    mainContext.globalAlpha = 0.06;
    mainContext.beginPath();
    for (let x = -camX; x < maxScreenWidth; x += useWasd ? 60 : 60) {
        if (x > 0) {
            mainContext.moveTo(x, 0);
            mainContext.lineTo(x, maxScreenHeight);
        }
    }
    for (let y = -camY; y < maxScreenHeight; y += useWasd ? 60 : 60) {
        if (y > 0) {
            mainContext.moveTo(0, y);
            mainContext.lineTo(maxScreenWidth, y);
        }
    }
    mainContext.stroke();

    mainContext.globalAlpha = 1;
    mainContext.strokeStyle = outlineColor;
    renderGameObjects(-1, xOffset, yOffset);

    mainContext.globalAlpha = 1;
    mainContext.lineWidth = outlineWidth;
    renderProjectiles(0, xOffset, yOffset);

    renderPlayers(xOffset, yOffset, 0);

    mainContext.globalAlpha = 1;
    for (let i = 0; i < ais.length; ++i) {
        tmpObj = ais[i];
        if (tmpObj.active && tmpObj.visible) {
            tmpObj.animate(delta);
            mainContext.save();
            mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
            mainContext.rotate(tmpObj.dir + tmpObj.dirPlus - (Math.PI / 2));
            renderAI(tmpObj, mainContext);
            mainContext.restore();
        }
    }

    renderGameObjects(0, xOffset, yOffset);
    renderProjectiles(1, xOffset, yOffset);
    renderGameObjects(1, xOffset, yOffset);
    renderPlayers(xOffset, yOffset, 1);
    renderGameObjects(2, xOffset, yOffset);
    renderGameObjects(3, xOffset, yOffset);

    mainContext.fillStyle = "#000";
    mainContext.globalAlpha = 0.09;
    if (xOffset <= 0) {
        mainContext.fillRect(0, 0, -xOffset, maxScreenHeight);
    }
    if (config.mapScale - xOffset <= maxScreenWidth) {
        let tmpY = Math.max(0, -yOffset);
        mainContext.fillRect(config.mapScale - xOffset, tmpY, maxScreenWidth - (config.mapScale - xOffset), maxScreenHeight - tmpY);
    }
    if (yOffset <= 0) {
        mainContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset);
    }
    if (config.mapScale - yOffset <= maxScreenHeight) {
        let tmpX = Math.max(0, -xOffset);
        let tmpMin = 0;
        if (config.mapScale - xOffset <= maxScreenWidth)
            tmpMin = maxScreenWidth - (config.mapScale - xOffset);
        mainContext.fillRect(tmpX, config.mapScale - yOffset,
                             (maxScreenWidth - tmpX) - tmpMin, maxScreenHeight - (config.mapScale - yOffset));
    }

    mainContext.globalAlpha = 1;
    mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);

    const colors = {
        darkOutline: "#3d3f42",
        healthBarFriend: "#8ecc51",
        healthBarFoe: "#cc5151",
        background: "#fff8e7",
        tracer: "#E4080A",
        nameFill: "#fff"
    };
    mainContext.strokeStyle = colors.darkOutline;
    mainContext.globalAlpha = 1;
    for (let i = 0; i < players.length + ais.length; ++i) {
        tmpObj = players[i] || ais[i - players.length];
        if (tmpObj.visible) {
            if (tmpObj.isPlayer || tmpObj.isEnemy) {
                if (typeof tmpObj._displayHealth !== 'number') tmpObj._displayHealth = tmpObj.health;
                if (typeof tmpObj._displayShame !== 'number') tmpObj._displayShame = tmpObj.shameCount || 0;
                tmpObj._displayHealth += (tmpObj.health - tmpObj._displayHealth) * 0.18;
                tmpObj._displayShame += ((tmpObj.shameCount || 0) - tmpObj._displayShame) * 0.18;
            }
            mainContext.strokeStyle = colors.darkOutline;
            if (tmpObj.skinIndex != 10 || (tmpObj === player) || (tmpObj.team && tmpObj.team == player.team)) {
                let tmpText = (tmpObj.team ? "[" + tmpObj.team + "] " : "") + (tmpObj.name || "");
                if (!recording) {
                    player.name = originalName;
                } else {
                    player.name = "unknown";
                }
                if (tmpText != "") {
                    mainContext.font = (tmpObj.nameScale || 30) + "px Hammersmith One";
                    mainContext.fillStyle = colors.nameFill;
                    mainContext.textBaseline = "middle";
                    mainContext.textAlign = "center";
                    mainContext.lineWidth = (tmpObj.nameScale ? 11 : 8);
                    mainContext.lineJoin = "round";
                    mainContext.strokeText(tmpText, tmpObj.x - xOffset, (tmpObj.y - yOffset - tmpObj.scale) - config.nameY);
                    mainContext.fillText(tmpText, tmpObj.x - xOffset, (tmpObj.y - yOffset - tmpObj.scale) - config.nameY);
                    config.healthBarPad = 4;
                    if (tmpObj.isLeader && iconSprites.crown.isLoaded) {
                        let tmpS = config.crownIconScale;
                        let tmpX = tmpObj.x - xOffset - (tmpS / 2) - (mainContext.measureText(tmpText).width / 2) - config.crownPad;
                        mainContext.drawImage(iconSprites.crown, tmpX, (tmpObj.y - yOffset - tmpObj.scale)
                                              - config.nameY - (tmpS / 2) - 5, tmpS, tmpS);
                    }
                    if (tmpObj.iconIndex == 1 && iconSprites.skull.isLoaded) {
                        let tmpS = config.crownIconScale;
                        let tmpX = tmpObj.x - xOffset - (tmpS / 2) + (mainContext.measureText(tmpText).width / 2) + config.crownPad;
                        mainContext.drawImage(iconSprites.skull, tmpX, (tmpObj.y - yOffset - tmpObj.scale)
                                              - config.nameY - (tmpS / 2) - 5, tmpS, tmpS);
                    }

                    const crosshairImg = new Image();
                    crosshairImg.src = "https://i.imgur.com/AaLivQG.png";
                    
                    if (tmpObj.isPlayer && instaC.wait && near == tmpObj && enemy.length) {
                        const cx = tmpObj.x - xOffset;
                        const cy = tmpObj.y - yOffset;
                        const size = 115;
                    
                        const angleToPlayer = Math.atan2(player.y2 - tmpObj.y, player.x2 - tmpObj.x);
                    
                        mainContext.save();
                        mainContext.translate(cx, cy);
                        mainContext.rotate(angleToPlayer - Math.PI / 2);
                    
                        if (crosshairImg.complete && crosshairImg.naturalWidth > 0) {
                            mainContext.drawImage(crosshairImg, -size / 2, -size / 2, size, size);
                        }
                        mainContext.restore();
                    }
                }

                if (tmpObj.health > 0) {
                    mainContext.fillStyle = colors.darkOutline;
                    mainContext.roundRect(
                        tmpObj.x - xOffset - (config.healthBarWidth + config.healthBarPad),
                        tmpObj.y - yOffset + tmpObj.scale + config.nameY,
                        (config.healthBarWidth * 2) + (config.healthBarPad * 2),
                        17,
                        8
                    );
                    mainContext.fill();

                    const healthBarColor = (tmpObj === player || (tmpObj.team && tmpObj.team === player.team)) ? colors.healthBarFriend : colors.healthBarFoe;
                    mainContext.fillStyle = healthBarColor;
                    mainContext.roundRect(
                        tmpObj.x - xOffset - config.healthBarWidth,
                        tmpObj.y - yOffset + tmpObj.scale + config.nameY + config.healthBarPad,
                        (config.healthBarWidth * 2) * (
                            (tmpObj.isPlayer || tmpObj.isEnemy)
                                ? tmpObj._displayHealth
                                : tmpObj.health
                        ) / tmpObj.maxHealth,
                        17 - (config.healthBarPad * 2),
                        7
                    );
                    mainContext.fill();
                    const maxShame = 7;
                    const shameCount = Math.min(tmpObj.shameCount || 0, maxShame);
                    const shameBarWidth = (config.healthBarWidth * 2);
                    const shameBarHeight = 17 - (config.healthBarPad * 2);
                    const shameBarX = tmpObj.x - xOffset - config.healthBarWidth;
                    const shameBarY = tmpObj.y - yOffset + tmpObj.scale + config.nameY + 17 + 4;
                    if (tmpObj.isPlayer || tmpObj.isEnemy) {
                        mainContext.fillStyle = colors.darkOutline;
                        mainContext.roundRect(
                            shameBarX - config.healthBarPad,
                            shameBarY - config.healthBarPad,
                            shameBarWidth + config.healthBarPad * 2,
                            shameBarHeight + config.healthBarPad * 2,
                            8
                        );
                        mainContext.fill();

                        mainContext.fillStyle = 'rgb(105, 87, 61)';  
                        mainContext.roundRect(
                            shameBarX,
                            shameBarY,
                            shameBarWidth,
                            shameBarHeight,
                            7
                        );
                        mainContext.fill();

                        let shameBarColor = healthBarColor;
                        if (shameCount >= 5) {
                            shameBarColor = colors.healthBarFoe;
                        } else {
                            shameBarColor = colors.healthBarFriend;
                        }
                        mainContext.fillStyle = shameBarColor;
                        mainContext.roundRect(
                            shameBarX,
                            shameBarY,
                            shameBarWidth * (tmpObj._displayShame / maxShame),
                            shameBarHeight,
                            7
                        );
                        mainContext.fill();
                    }

                    mainContext.save();
                    if (tmpObj.isPlayer) {
                        let reloads = {
                            primary: (tmpObj.primaryIndex == undefined ? 1 : ((items.weapons[tmpObj.primaryIndex].speed - tmpObj.reloads[tmpObj.primaryIndex]) / items.weapons[tmpObj.primaryIndex].speed)),
                            secondary: (tmpObj.secondaryIndex == undefined ? 1 : ((items.weapons[tmpObj.secondaryIndex].speed - tmpObj.reloads[tmpObj.secondaryIndex]) / items.weapons[tmpObj.secondaryIndex].speed)),
                            turret: (2500 - tmpObj.reloads[53]) / 2500
                        };
                    }
                    mainContext.restore();
                }
            }
        }
    }

    textManager.update(delta, mainContext, xOffset, yOffset);

    players.forEach((tmp) => {
        tmpObj = tmp;
        if (tmpObj.visible && tmpObj.chatCountdown > 0) {
            tmpObj.chatCountdown = Math.max(0, (tmpObj.chatCountdown -= delta));
            mainContext.font = "32px Hammersmith One";
            var tmpSize = mainContext.measureText(tmpObj.chatMessage);
            mainContext.textBaseline = "middle";
            mainContext.textAlign = "center";
            var tmpX = tmpObj.x - xOffset;
            var tmpY = tmpObj.y - tmpObj.scale - yOffset - 90;
            var tmpH = 47;
            var tmpW = tmpSize.width + 30;
            var padding = 10;
            var tailSize = 12;
            var earSize = 30;
            var bubbleColor = "rgba(0,0,0,0.2)";
            var textColor = "#fff";

            mainContext.roundRect(tmpX - tmpW / 2, tmpY - tmpH / 2, tmpW, tmpH, 15, tailSize, earSize);
            mainContext.fillStyle = bubbleColor;
            mainContext.fill();

            mainContext.fillStyle = textColor;
            mainContext.fillText(tmpObj.chatMessage, tmpX, tmpY);
        }
    });

    mainContext.globalAlpha = 1;
    renderMinimap(delta);

    function drawAutoPlaceVisual() {
        if (!autoPlaceVisualEnabled || !player || !player.alive) return;
        let x = player.x - camX + maxScreenWidth / 2;
        let y = player.y - camY + maxScreenHeight / 2;
        let spikeRadius = player.scale + (items.list[player.items[2]]?.scale || 50) + 10;
        let trapRadius = player.scale + (items.list[player.items[4]]?.scale || 50) + 20;
        const arcWidth = Math.PI / anglePrecisionDivisor;
        const spikeObj = items.list[player.items[2]];
        const trapObj = items.list[player.items[4]];
        if (!spikeObj || !trapObj) return;
        for (let i = 0; i < anglePrecisionDivisor; i++) {
            let angle = i * 2 * Math.PI / anglePrecisionDivisor;
            let spikeS = player.scale + spikeObj.scale + (spikeObj.placeOffset || 0);
            let spikeX = player.x2 + spikeS * Math.cos(angle);
            let spikeY = player.y2 + spikeS * Math.sin(angle);
            let canSpike = objectManager.checkItemLocation(
                spikeX, spikeY, spikeObj.scale, 0.6, spikeObj.id, false, player
            );
            let trapS = player.scale + trapObj.scale + (trapObj.placeOffset || 0);
            let trapX = player.x2 + trapS * Math.cos(angle);
            let trapY = player.y2 + trapS * Math.sin(angle);
            let canTrap = objectManager.checkItemLocation(
                trapX, trapY, trapObj.scale, 0.6, trapObj.id, false, player
            );
            mainContext.save();
            mainContext.beginPath();
            mainContext.strokeStyle = canSpike ? 'rgba(0,255,0,0.7)' : 'rgba(255,0,0,0.2)';
            mainContext.lineWidth = 6;
            mainContext.arc(x, y, spikeRadius, angle, angle + arcWidth);
            mainContext.stroke();
            mainContext.restore();
            mainContext.save();
            mainContext.beginPath();
            mainContext.strokeStyle = canTrap ? 'rgba(255,255,0,0.7)' : 'rgba(255,0,0,0.2)';
            mainContext.lineWidth = 6;
            mainContext.arc(x, y, trapRadius, angle, angle + arcWidth);
            mainContext.stroke();
            mainContext.restore();
        }
    }
    if(verify("predictType").value == "simple") {
        autoPlaceVisualEnabled = true;
    } else {
        autoPlaceVisualEnabled = false;
    }
    if(autoPlaceVisualEnabled) {
        drawAutoPlaceVisual();
    }
}

window.requestAnimFrame = function() {
    return null;
}

window.rAF = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
        window.setTimeout(callback, 1000/9);
    };
})();

function doUpdate() {
    now = performance.now();
    delta = now - lastUpdate;
    lastUpdate = now;
    updateGame();
    rAF(doUpdate);
    ms.avg = Math.round((ms.min+ms.max)/2);
}

prepareMenuBackground();
doUpdate();

function toggleUseless(boolean) {
    verify("instaType").disabled = boolean;
    verify("antiBullType").disabled = boolean;
    verify("predictType").disabled = boolean;
}
toggleUseless(useWasd);

window.debug = function() {
    HANS.waitHit = 0;
    HANS.autoAim = false;
    instaC.isTrue = false;
    playerConditions.inTrap = false;
    itemSprites = [];
    objSprites = [];
    gameObjectSprites = [];
    skinSprites = [];
    skinPointers = [];
    skinSprites2 = [];
    skinPointers2 = [];
    accessSprites = [];
    toolSprites = [];
    projectileSprites = [];
    aiSprites = [];
    console.clear();
};

window.wasdMode = function() {
    useWasd = !useWasd;
    toggleUseless(useWasd);
};

window.startGrind = function() {
    if (verify("weaponGrind").checked) {
        for (let i = 0; i < Math.PI * 2; i += Math.PI / 2) {
            checkPlace(player.getItemType(22), i);
        }
    }
};

window.resBuild = function() {
    if (gameObjects.length) {
        gameObjects.forEach((tmp) => {
            tmp.breakObj = false;
        });
        breakObjects = [];
    }
};

window.toggleVisual = function() {
    config.anotherVisual = !config.anotherVisual;
    gameObjects.forEach((tmp) => {
        if (tmp.active) {
            tmp.dir = tmp.lastDir;
        }
    });
};

window.prepareUI = function(tmpObj) {
    resize();
    var chatBox = document.getElementById("chatBox");
    var chatHolder = document.getElementById("chatHolder");
    var suggestBox = document.createElement("div");
    suggestBox.id = "suggestBox";

    var prevChats = [];
    var prevChatsIndex = 0;

    function toggleChat() {
        if (!usingTouch) {
            if (chatHolder.style.display == "block") {
                if (chatBox.value) {
                    sendChat(chatBox.value);
                }
                closeChat();
            } else {
                storeMenu.style.display = "none";
                allianceMenu.style.display = "none";
                chatHolder.style.display = "block";
                chatBox.focus();
                resetMoveDir();
            }
        } else {
            setTimeout(function () {
                var chatMessage = prompt("chat message");
                if (chatMessage) {
                    sendChat(chatMessage);
                }
            }, 1);
        }
        chatBox.value = "";
        (() => {
            prevChatsIndex = 0;
        })();
    }

    function closeChat() {
        chatBox.value = "";
        chatHolder.style.display = "none";
    }

    for (let i = 0; i < (items.list.length + items.weapons.length); ++i) {
        (function (i) {
            let tmpCanvas = document.createElement("canvas");
            tmpCanvas.width = tmpCanvas.height = 66;
            let tmpContext = tmpCanvas.getContext("2d");
            tmpContext.translate((tmpCanvas.width / 2), (tmpCanvas.height / 2));
            tmpContext.imageSmoothingEnabled = false;
            tmpContext.webkitImageSmoothingEnabled = false;
            tmpContext.mozImageSmoothingEnabled = false;

            if (items.weapons[i]) {
                tmpContext.rotate((Math.PI / 4) + Math.PI);
                let tmpSprite = new Image();
                toolSprites[items.weapons[i].src] = tmpSprite;
                tmpSprite.onload = function () {
                    this.isLoaded = true;
                    let tmpPad = 1 / (this.height / this.width);
                    let tmpMlt = (items.weapons[i].iPad || 1);
                    tmpContext.drawImage(this, -(tmpCanvas.width * tmpMlt * config.iconPad * tmpPad) / 2, -(tmpCanvas.height * tmpMlt * config.iconPad) / 2,
                                         tmpCanvas.width * tmpMlt * tmpPad * config.iconPad, tmpCanvas.height * tmpMlt * tmpPad * config.iconPad);
                    tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
                    tmpContext.globalCompositeOperation = "source-atop";
                    tmpContext.fillRect(-tmpCanvas.width / 2, -tmpCanvas.height / 2, tmpCanvas.width, tmpCanvas.height);
                    verify('actionBarItem' + i).style.backgroundImage = "url(" + tmpCanvas.toDataURL() + ")";
                };
                tmpSprite.src = "./../img/weapons/" + items.weapons[i].src + ".png";
                let tmpUnit = verify('actionBarItem' + i);
                tmpUnit.onmouseover = UTILS.checkTrusted(function () {
                    showItemInfo(items.weapons[i], true);
                });
                tmpUnit.onclick = UTILS.checkTrusted(function () {
                    selectWeapon(tmpObj.weapons[items.weapons[i].type]);
                });
                UTILS.hookTouchEvents(tmpUnit);
            } else {
                let tmpSprite = getItemSprite(items.list[i - items.weapons.length], true);
                let tmpScale = Math.min(tmpCanvas.width - config.iconPadding, tmpSprite.width);
                tmpContext.globalAlpha = 1;
                tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
                tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
                tmpContext.globalCompositeOperation = "source-atop";
                tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
                verify('actionBarItem' + i).style.backgroundImage = "url(" + tmpCanvas.toDataURL() + ")";
                let tmpUnit = verify('actionBarItem' + i);
                tmpUnit.onmouseover = UTILS.checkTrusted(function () {
                    showItemInfo(items.list[i - items.weapons.length]);
                });
                tmpUnit.onclick = UTILS.checkTrusted(function () {
                    selectToBuild(tmpObj.items[tmpObj.getItemType(i - items.weapons.length)]);
                });
                UTILS.hookTouchEvents(tmpUnit);
            }
        })(i);
    }
};
(function() {
    const chatPanel = document.createElement('div');
    chatPanel.id = 'rustyChatPanel';
    chatPanel.style.cssText = `
        position: fixed;
        bottom: 40px;
        right: 40px;
        width: 340px;
        max-height: 400px;
        background: #181a1b;
        color: #e0e0e0;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.32);
        z-index: 100010;
        display: flex;
        flex-direction: column;
        font-family: 'Segoe UI', Arial, sans-serif;
        overflow: hidden;
        border: 1.5px solid #222;
        transition: opacity 0.2s, visibility 0.2s;
        opacity: 1;
        visibility: visible;
    `;

    const chatLog = document.createElement('div');
    chatLog.id = 'rustyChatLog';
    chatLog.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 16px 12px 8px 12px;
        font-size: 15px;
        line-height: 1.5;
        background: transparent;
        word-break: break-word;
    `;
    chatPanel.appendChild(chatLog);

    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.placeholder = 'Escribe un comando...';
    chatInput.style.cssText = `
        border: none;
        outline: none;
        background: #23272f;
        color: #fff;
        padding: 10px 12px;
        font-size: 15px;
        border-top: 1px solid #222;
        border-radius: 0 0 12px 12px;
        width: 100%;
        box-sizing: border-box;
    `;
    chatPanel.appendChild(chatInput);

    document.body.appendChild(chatPanel);

    const chatStyle = document.createElement('style');
    chatStyle.textContent = `
        #rustyChatPanel::-webkit-scrollbar, #rustyChatLog::-webkit-scrollbar {
            width: 8px;
            background: #23272f;
        }
        #rustyChatPanel::-webkit-scrollbar-thumb, #rustyChatLog::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(chatStyle);

    let chatVisible = true;
    function toggleChatPanel() {
        chatVisible = !chatVisible;
        chatPanel.style.opacity = chatVisible ? '1' : '0';
        chatPanel.style.visibility = chatVisible ? 'visible' : 'hidden';
        if (chatVisible) chatInput.focus();
    }
    document.addEventListener('keydown', function(e) {
        if (
            e.key === '<' &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA'
        ) {
            toggleChatPanel();
        }
    });

    let rustyCommandsLog = [];
    function addLog(msg, color) {
        const entry = document.createElement('div');
        entry.textContent = msg;
        if (color) entry.style.color = color;
        chatLog.appendChild(entry);
        chatLog.scrollTop = chatLog.scrollHeight;
        rustyCommandsLog.push(msg);
    }
    window.addLog = addLog;

    let showTrapsActive = false;
    function drawTrapsOnMap() {
        if (!showTrapsActive) return;
        if (!window.player) return;
        if (!window.gameObjects) return;
        for (const obj of window.gameObjects) {
            if (obj.trap && obj.active && obj.owner && obj.owner.sid === window.player.sid) {
                if (window.mainContext && typeof window.camX !== 'undefined' && typeof window.camY !== 'undefined') {
                    window.mainContext.save();
                    window.mainContext.globalAlpha = 0.7;
                    window.mainContext.strokeStyle = '#ffb347';
                    window.mainContext.lineWidth = 3;
                    window.mainContext.beginPath();
                    window.mainContext.arc(
                        obj.x - window.camX + window.maxScreenWidth/2,
                        obj.y - window.camY + window.maxScreenHeight/2,
                        obj.scale + 12, 0, 2 * Math.PI
                    );
                    window.mainContext.stroke();
                    window.mainContext.restore();
                }
            }
        }
    }
    const oldUpdateGame = window.updateGame;
    window.updateGame = function() {
        if (typeof oldUpdateGame === 'function') oldUpdateGame();
        drawTrapsOnMap();
    };

chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = chatInput.value.trim();
        if (!cmd) return;

        if (cmd === '/showTraps') {
            showTrapsActive = !showTrapsActive;
            addLog(showTrapsActive ? 'Trampas visibles en el mapa.' : 'Trampas ocultas.', '#ffb347');
        }
        else if (cmd.startsWith('/predictType ')) {
            const value = cmd.split(' ')[1];
            const validValues = ['simple', 'avanzado'];
            if (validValues.includes(value)) {
                const select = document.getElementById('predictType');
                if (select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change'));
                    addLog(`predictType actualizado a "${value}"`, '#7fd1ff');
                } else {
                    addLog('No se encontró el selector predictType en la página.', '#ff6b6b');
                }
            } else {
                addLog('Valor inválido. Usa: /predictType simple o /predictType avanzado', '#ff6b6b');
            }
        }
        else {
            addLog('Comando no reconocido: ' + cmd, '#ff6b6b');
        }
        chatInput.value = '';
    }
});

    window.rustyChat = {
        addLog,
        toggle: toggleChatPanel,
        isVisible: () => chatVisible
    };

    addLog('Commands', '#7fd1ff');
})();

window.profineTest = function(data) {
    if (data) {
        let name = data + "";
        name = name.slice(0, config.maxNameLength);

        return name;
    }
};

console.log('MooMoo Helper Script - Cargado desde Netlify'); 