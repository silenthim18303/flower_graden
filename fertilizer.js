// ========== 肥料系统 ==========
var fertilizerCounter = 0;
var fertilizerText = null;
var COMPOST_COST = 30;

function loadFertilizerCounter() {
    fertilizerCounter = GameData.getFertilizerCount();
    return fertilizerCounter;
}

function saveFertilizerCounter() {
    GameData.setFertilizerCount(fertilizerCounter);
}

function updateFertilizerDisplay() {
    if (!fertilizerText) {
        fertilizerText = document.getElementById('fertilizer-text');
    }
    if (fertilizerText) {
        fertilizerCounter = GameData.getFertilizerCount();
        fertilizerText.textContent = '肥料: ' + fertilizerCounter;
    }
}

function initFertilizerDisplay() {
    fertilizerText = document.getElementById('fertilizer-text');
    loadFertilizerCounter();
    updateFertilizerDisplay();
}

function showToast(message) {
    var toast = document.getElementById('compost-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 1500);
}

function openCompostModal() {
    var modal = document.getElementById('compost-modal');
    var grassCountEl = document.getElementById('compost-grass-count');
    var startBtn = document.getElementById('compost-start');

    if (!modal) return;

    loadGrassCounter();
    if (grassCountEl) {
        grassCountEl.textContent = grassCounter;
    }

    if (grassCounter < COMPOST_COST) {
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.textContent = '杂草不足';
        }
    } else {
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = '开始堆肥';
        }
    }

    modal.classList.add('show');
    var canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }
}

function closeCompostModal() {
    var modal = document.getElementById('compost-modal');
    if (modal) {
        modal.classList.remove('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'auto';
        }
    }
}

function doCompost() {
    loadGrassCounter();

    if (grassCounter < COMPOST_COST) {
        showToast('杂草不足，需要30个杂草！');
        return;
    }

    grassCounter -= COMPOST_COST;
    saveGrassCounter();
    updateCounterDisplay();

    fertilizerCounter++;
    saveFertilizerCounter();
    updateFertilizerDisplay();

    closeCompostModal();
    showToast('堆肥成功！获得1袋肥料');

    var grassCountEl = document.getElementById('compost-grass-count');
    if (grassCountEl) {
        grassCountEl.textContent = grassCounter;
    }
}

function initCompostSystem() {
    var modal = document.getElementById('compost-modal');
    var closeBtn = document.getElementById('compost-close');
    var startBtn = document.getElementById('compost-start');

    if (closeBtn) {
        closeBtn.addEventListener('pointerdown', function(e) {
            e.stopPropagation();
            e.preventDefault();
            closeCompostModal();
        });
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    if (modal) {
        modal.addEventListener('pointerdown', function(e) {
            if (e.target === modal) {
                closeCompostModal();
            }
            e.stopPropagation();
            e.preventDefault();
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCompostModal();
            }
            e.stopPropagation();
            e.preventDefault();
        });

        var content = modal.querySelector('.compost-content');
        if (content) {
            content.addEventListener('pointerdown', function(e) {
                e.stopPropagation();
                e.preventDefault();
            });
            content.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
            });
        }
    }

    if (startBtn) {
        startBtn.addEventListener('pointerdown', function(e) {
            e.stopPropagation();
            e.preventDefault();
            doCompost();
        });
        startBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            doCompost();
        });
    }
}

window.addEventListener('load', function() {
    initFertilizerDisplay();
    initCompostSystem();
});
