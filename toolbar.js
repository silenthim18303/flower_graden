// ========== 工具栏系统 ==========

var mowerActive = false;
var mowerTimer = null;
var mowerSleepTimer = null;

function isSickleUnlocked() {
    return GameData.isSickleUnlocked();
}

function unlockSickle() {
    GameData.unlockSickle();
}

function showToolbarToast(message) {
    var existing = document.querySelector('.toolbar-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toolbar-toast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:15px 30px;border-radius:10px;font-size:16px;z-index:3000;pointer-events:none;';
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 1500);
}

function startMower() {
    if (!mowerActive) return;
    
    var onScreenGrass = typeof getCurrentGrassCount === 'function' ? getCurrentGrassCount() : 0;
    if (onScreenGrass >= 30) {
        mowerTimer = setTimeout(function() {
            if (!mowerActive) return;
            harvestAllGrass();
            showToolbarToast('割草机自动除草完成');
            
            mowerTimer = setTimeout(function() {
                startMower();
            }, 1000);
        }, 1000);
    } else {
        mowerTimer = setTimeout(function() {
            startMower();
        }, 1000);
    }
}

function updateMowerButton() {
    var mowerBtn = document.getElementById('mower-toolbar-btn');
    if (!mowerBtn) return;
    
    var span = mowerBtn.querySelector('span');
    if (mowerActive) {
        span.textContent = '割草机(开)';
        mowerBtn.style.borderColor = '#4CAF50';
        mowerBtn.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    } else {
        span.textContent = '割草机(关)';
        mowerBtn.style.borderColor = '#999';
        mowerBtn.style.backgroundColor = 'transparent';
    }
}

function initToolbar() {
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    var sickleBtn = document.createElement('button');
    sickleBtn.className = 'toolbar-item';
    sickleBtn.innerHTML = '<img src="img/tools/sickle.png" alt="镰刀"><span>镰刀</span>';

    if (!isSickleUnlocked()) {
        sickleBtn.classList.add('locked');
        sickleBtn.disabled = true;
    } else {
        sickleBtn.addEventListener('click', function() {
            harvestAllGrass();
        });
    }

    toolbar.appendChild(sickleBtn);

    var fertilizerBtn = document.createElement('button');
    fertilizerBtn.className = 'toolbar-item';
    fertilizerBtn.innerHTML = '<img src="img/tools/fertilizer.png" alt="肥料"><span>施肥</span>';

    fertilizerBtn.addEventListener('click', function() {
        var fertilizerCount = GameData.getFertilizerCount();
        if (fertilizerCount <= 0) {
            showToolbarToast('肥料不足');
            return;
        }

        GameData.setFertilizerCount(fertilizerCount - 1);
        updateFertilizerDisplay();

        var result = fertilizeGrass();

        if (result === 'success') {
            showToolbarToast('施肥成功，长出了一朵菊花！');
        } else if (result === 'max_count') {
            showToolbarToast('菊花已经满了，不需要施肥');
        } else {
            showToolbarToast('施肥了，但什么都没长出来');
        }
    });

    toolbar.appendChild(fertilizerBtn);

    var seedBtn = document.createElement('button');
    seedBtn.className = 'toolbar-item';
    seedBtn.id = 'seed-toolbar-btn';
    seedBtn.innerHTML = '<img src="img/tools/随机种子.png" alt="种子"><span>种子</span>';

    seedBtn.addEventListener('click', function() {
        var count = GameData.getSeedCount();
        if (count <= 0) {
            showToolbarToast('种子不足，去商店兑换吧');
            return;
        }

        GameData.addSeedCount(-1);
        updateSeedDisplay();

        var result = plantStarFlower();

        if (result === 'success') {
            showToolbarToast('种子发芽了，长出了一朵星月相随！');
        } else if (result === 'max_count') {
            var result2 = plantPasserbyFlower();
            if (result2 === 'success') {
                showToolbarToast('种子发芽了，长出了一朵过路黄！');
            } else if (result2 === 'max_count') {
                showToolbarToast('花园已经满了');
                GameData.addSeedCount(1);
                updateSeedDisplay();
            } else {
                showToolbarToast('种子没有发芽，再试试吧');
            }
        } else {
            var result3 = plantPasserbyFlower();
            if (result3 === 'success') {
                showToolbarToast('种子发芽了，长出了一朵过路黄！');
            } else if (result3 === 'max_count') {
                showToolbarToast('过路黄已经满了');
                GameData.addSeedCount(1);
                updateSeedDisplay();
            } else {
                showToolbarToast('种子没有发芽，再试试吧');
            }
        }
    });

    toolbar.appendChild(seedBtn);

    var mowerBtn = document.createElement('button');
    mowerBtn.className = 'toolbar-item';
    mowerBtn.id = 'mower-toolbar-btn';
    mowerBtn.innerHTML = '<img src="img/tools/割草机.png" alt="割草机"><span>割草机(关)</span>';

    if (!GameData.isMowerUnlocked()) {
        mowerBtn.classList.add('locked');
        mowerBtn.disabled = true;
    } else {
        mowerBtn.addEventListener('click', function() {
            mowerActive = !mowerActive;
            updateMowerButton();
            
            if (mowerActive) {
                showToolbarToast('割草机已开启');
                startMower();
            } else {
                showToolbarToast('割草机已关闭');
                if (mowerTimer) {
                    clearTimeout(mowerTimer);
                    mowerTimer = null;
                }
                if (mowerSleepTimer) {
                    clearTimeout(mowerSleepTimer);
                    mowerSleepTimer = null;
                }
            }
        });
    }

    toolbar.appendChild(mowerBtn);
}

function updateSeedDisplay() {
    var count = GameData.getSeedCount();

    var seedText = document.getElementById('seed-text');
    if (seedText) {
        seedText.textContent = '种子: ' + count;
    }
}

function updateMoneyDisplay() {
    var count = GameData.getMoneyCount();

    var moneyText = document.getElementById('money-text');
    if (moneyText) {
        moneyText.textContent = '货币: ' + count;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initToolbar();
    updateSeedDisplay();
    updateMoneyDisplay();
});
