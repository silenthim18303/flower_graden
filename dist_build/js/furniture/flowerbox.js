// ========== 花箱配置区域 ==========
// 位置X：调整数值可以左右移动花箱 (0=最左边, 540=居中, 1080=最右边)
var flowerboxX = 850;
// 位置Y：调整数值可以上下移动花箱 (0=最顶部, 960=居中, 1920=最底部)
var flowerboxY = 1550;
// 缩放比例：调整数值可以改变花箱大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var flowerboxScale = 0.2;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var flowerboxClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var flowerboxAnimDuration = 100;
// ==================================

function createFlowerbox(scene) {
    var flowerbox = scene.add.image(flowerboxX, flowerboxY, 'flowerbox');
    flowerbox.setScale(flowerboxScale);
    flowerbox.setInteractive();

    var isAnimating = false;
    flowerbox.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: flowerbox,
            scaleX: flowerboxScale * flowerboxClickScale,
            scaleY: flowerboxScale * flowerboxClickScale,
            duration: flowerboxAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                showFlowerboxPopup();
            }
        });
    });
}

function showFlowerboxPopup() {
    // 创建弹窗背景
    var popupOverlay = document.createElement('div');
    popupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // 创建弹窗容器
    var popupContainer = document.createElement('div');
    popupContainer.style.cssText = `
        width: 90%;
        max-width: 400px;
        max-height: 80vh;
        overflow-y: auto;
        background: #FFFFFF;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        border: 3px solid #FFB6C1;
        position: relative;
    `;
    
    // 创建关闭按钮
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        color: #999;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // 创建标题
    var title = document.createElement('div');
    title.className = 'flowerbox-title';
    title.textContent = '我的花箱';
    title.style.cssText = `
        color: #FF1493;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
        margin-top: 10px;
    `;
    
    // 创建花箱列表
    var list = document.createElement('div');
    list.className = 'flowerbox-list';
    list.id = 'popup-flowerbox-list';
    list.style.cssText = `
        background: #F5F5F5;
        border-radius: 12px;
        padding: 10px;
        max-height: 300px;
        overflow-y: auto;
    `;
    
    // 创建教程卡片
    var tutorialCard = document.createElement('div');
    tutorialCard.style.cssText = `
        background: rgba(255,255,255,0.9);
        border-radius: 16px;
        padding: 20px;
        margin-top: 20px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    `;
    
    var tutorialTitle = document.createElement('div');
    tutorialTitle.style.cssText = `
        color: #FF1493;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 12px;
        text-align: center;
    `;
    tutorialTitle.textContent = '花箱介绍';
    
    var tutorialContent = document.createElement('div');
    tutorialContent.style.cssText = `
        color: #333;
        font-size: 14px;
        line-height: 1.8;
    `;
    tutorialContent.innerHTML = `
        <p>花箱是用来展示你收集的所有花卉的地方！</p>
        <p>收集花卉的方法：</p>
        <p>1. <span style="color: #FF1493; font-weight: bold;">蝴蝶兰</span> - 在主页自然生长，点击收集</p>
        <p>2. <span style="color: #FF1493; font-weight: bold;">菊花</span> - 使用肥料施肥后生长</p>
        <p>3. <span style="color: #FF1493; font-weight: bold;">星月相随</span> - 使用随机种子种植获得</p>
        <p>4. <span style="color: #FF1493; font-weight: bold;">过路黄</span> - 使用随机种子种植获得</p>
        <p>收集到的花卉可以在电商页面出售换取金币，也可以收藏在花箱中展示。</p>
    `;
    
    // 组装弹窗
    tutorialCard.appendChild(tutorialTitle);
    tutorialCard.appendChild(tutorialContent);
    
    popupContainer.appendChild(closeBtn);
    popupContainer.appendChild(title);
    popupContainer.appendChild(list);
    popupContainer.appendChild(tutorialCard);
    
    popupOverlay.appendChild(popupContainer);
    document.body.appendChild(popupOverlay);
    
    // 关闭弹窗功能
    function closePopup() {
        popupOverlay.remove();
    }
    
    closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // 渲染花箱内容
    renderPopupFlowerbox();
}

function renderPopupFlowerbox() {
    var list = document.getElementById('popup-flowerbox-list');
    if (!list) return;

    var flowerImageMap = {
        'orchid': 'img/plants/蝴蝶兰.png',
        'chrysanthemum': 'img/plants/菊花.png',
        'starflower': 'img/plants/星月相随.png',
        'passerbyflower': 'img/plants/过路黄.png'
    };
    
    var collection = GameData.getFlowerCollection();
    var keys = Object.keys(collection);

    list.innerHTML = '';

    if (keys.length === 0) {
        var emptyDiv = document.createElement('div');
        emptyDiv.style.cssText = `
            color: #999;
            font-size: 14px;
            padding: 20px;
            text-align: center;
            opacity: 0.8;
        `;
        emptyDiv.textContent = '还没有收集到花哦~';
        list.appendChild(emptyDiv);
        return;
    }

    keys.forEach(function(key) {
        var flower = collection[key];
        var item = document.createElement('div');
        item.style.cssText = `
            display: flex;
            align-items: center;
            padding: 10px 15px;
            margin: 8px 0;
            background: #FFFFFF;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        var img = document.createElement('img');
        img.src = flowerImageMap[key];
        img.alt = flower.name;
        img.style.cssText = `
            width: 32px;
            height: 32px;
            margin-right: 10px;
            object-fit: contain;
        `;
        
        var infoDiv = document.createElement('div');
        infoDiv.style.flex = '1';
        
        var nameDiv = document.createElement('div');
        nameDiv.style.cssText = `
            color: #333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
        `;
        nameDiv.textContent = flower.name;
        
        var countDiv = document.createElement('div');
        countDiv.style.cssText = `
            color: #FF1493;
            font-size: 14px;
            font-weight: bold;
        `;
        countDiv.textContent = 'x' + flower.count;
        
        infoDiv.appendChild(nameDiv);
        item.appendChild(img);
        item.appendChild(infoDiv);
        item.appendChild(countDiv);
        
        list.appendChild(item);
    });
}
