// ========== 肥料系统 ==========
var fertilizerCounter = 0;
var fertilizerText = null;

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

window.addEventListener('load', function() {
    initFertilizerDisplay();
});
