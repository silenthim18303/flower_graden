const resources = [
  './img/background/start.png',
  './img/background/back1.png',
  './img/background/garden.png',
  './img/background/shop.png',
  './img/background/work_house.png',
  './img/background/garden_game.png',
  './img/tools/fertilizer.png',
  './img/tools/money.png',
  './img/tools/sickle.png',
  './img/tools/随机种子.png',
  './img/tools/garden_bill.png',
  './img/tools/grass_bill.png',
  './img/tools/mark_bill.png',
  './img/tools/game.png',
  './img/tools/work.png',
  './img/tools/compostbin.png',
  './img/tools/PC.png',
  './img/tools/割草机.png',
  './img/tools/告示牌.png',
  './img/tools/狗粮.png',
  './img/plants/grass.png',
  './img/plants/tree.png',
  './img/plants/蝴蝶兰.png',
  './img/plants/菊花.png',
  './img/plants/星月相随.png',
  './img/plants/过路黄.png',
  './img/plants/花箱.png',
  './img/plants/glass.png',
  './img/furniture/桌椅.png',
  './img/furniture/鸟笼.png',
  './img/furniture/水池.png',
  './img/furniture/狗.png',
  './img/furniture/秋千.png'
];

const scripts = [
  './js/core/gameData.js',
  './js/tools/fertilizer.js',
  './js/core/toolbar.js',
  './js/tools/tree.js',
  './js/bills/work.js',
  './js/bills/mark_bill.js',
  './js/bills/garden_bill.js',
  './js/plants/grass.js',
  './js/plants/orchid.js',
  './js/plants/chrysanthemum.js',
  './js/plants/starflower.js',
  './js/plants/passerbyflower.js',
  './js/scenes/game.js'
];

let loadedCount = 0;
const totalItems = resources.length + scripts.length;

const loadedScripts = new Set();

function updateProgress(text) {
  loadedCount++;
  const progress = Math.floor((loadedCount / totalItems) * 100);
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
  if (progressText) {
    progressText.textContent = `${text}... ${progress}%`;
  }
}

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      updateProgress('加载资源');
      resolve();
    };
    img.onerror = () => {
      updateProgress('加载资源');
      resolve();
    };
    img.src = src;
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (loadedScripts.has(src)) {
      updateProgress('加载脚本');
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      loadedScripts.add(src);
      updateProgress('加载脚本');
      resolve();
    };
    script.onerror = () => {
      loadedScripts.add(src);
      updateProgress('加载脚本');
      resolve();
    };
    document.body.appendChild(script);
  });
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

function quickHideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.1s ease';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 100);
  }
}

function loadScriptQuick(src) {
  return new Promise((resolve, reject) => {
    if (loadedScripts.has(src)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      loadedScripts.add(src);
      resolve();
    };
    script.onerror = () => {
      loadedScripts.add(src);
      resolve();
    };
    document.body.appendChild(script);
  });
}

async function fullInit() {
  for (const resource of resources) {
    await preloadImage(resource);
  }
  
  for (const script of scripts) {
    await loadScript(script);
  }
  
  localStorage.setItem('garden_game_loaded', 'true');
  hideLoadingScreen();
}

async function quickInit() {
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  if (progressFill) {
    progressFill.style.width = '100%';
  }
  if (progressText) {
    progressText.textContent = '加载中... 100%';
  }
  
  for (const script of scripts) {
    await loadScriptQuick(script);
  }
  
  quickHideLoadingScreen();
}

async function init() {
  const isLoaded = localStorage.getItem('garden_game_loaded');
  
  if (isLoaded === 'true') {
    await quickInit();
  } else {
    await fullInit();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
