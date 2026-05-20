// ========== 游戏数据管理 ==========
// 所有需要持久化存储的数据都在这里统一管理
// 方便后续修改或连接后端

var GameData = {
    // ========== 数据键名 ==========
    KEYS: {
        GRASS_COUNT: 'grassCounter',
        FERTILIZER_COUNT: 'fertilizerCounter',
        SICKLE_UNLOCKED: 'sickleUnlocked',
        MOWER_UNLOCKED: 'mowerUnlocked',
        LAST_SHAKE_TIME: 'lastShakeTime',
        FLOWER_COLLECTION: 'flowerCollection',
        ORCHID_COUNT: 'orchidCount',
        CHRYSANTHEMUM_COUNT: 'chrysanthemumCount',
        SEED_COUNT: 'seedCount',
        MONEY_COUNT: 'moneyCount',
        TABLE_UNLOCKED: 'tableUnlocked',
        BIRD_CAGE_UNLOCKED: 'birdCageUnlocked',
        POOL_UNLOCKED: 'poolUnlocked',
        SWING_UNLOCKED: 'swingUnlocked',
        DOG_UNLOCKED: 'dogUnlocked',
        DOG_FRIENDSHIP: 'dogFriendship',
        DOG_FOOD_COUNT: 'dogFoodCount',
        DOG_GIFT_LAST_CLAIM: 'dogGiftLastClaim'
    },

    // ========== 默认值 ==========
    DEFAULTS: {
        grassCounter: 999,
        fertilizerCounter: 999,
        sickleUnlocked: true,
        mowerUnlocked: true,
        lastShakeTime: 0,
        flowerCollection: {},
        orchidCount: 0,
        chrysanthemumCount: 0,
        seedCount: 999,
        moneyCount: 999,
        tableUnlocked: true,
        birdCageUnlocked: true,
        poolUnlocked: true,
        swingUnlocked: false,
        dogUnlocked: true,
        dogFriendship: 0,
        dogFoodCount: 0,
        dogGiftLastClaim: 0
    },

    // ========== 内存缓存 ==========
    _cache: {
        grassCounter: 0,
        fertilizerCounter: 0,
        sickleUnlocked: false,
        mowerUnlocked: false,
        lastShakeTime: 0,
        flowerCollection: {},
        orchidCount: 0,
        chrysanthemumCount: 0,
        seedCount: 0,
        moneyCount: 0,
        tableUnlocked: false,
        birdCageUnlocked: false,
        poolUnlocked: false,
        swingUnlocked: false,
        dogUnlocked: false,
        dogFriendship: 0,
        dogFoodCount: 0
    },

    // ========== 初始化 ==========
    init: function() {
        this.loadAll();
    },

    // ========== 加载所有数据 ==========
    loadAll: function() {
        this._cache.grassCounter = this.load(this.KEYS.GRASS_COUNT, this.DEFAULTS.grassCounter);
        this._cache.fertilizerCounter = this.load(this.KEYS.FERTILIZER_COUNT, this.DEFAULTS.fertilizerCounter);
        this._cache.sickleUnlocked = this.load(this.KEYS.SICKLE_UNLOCKED, this.DEFAULTS.sickleUnlocked);
        this._cache.mowerUnlocked = this.load(this.KEYS.MOWER_UNLOCKED, this.DEFAULTS.mowerUnlocked);
        this._cache.lastShakeTime = this.load(this.KEYS.LAST_SHAKE_TIME, this.DEFAULTS.lastShakeTime);
        this._cache.flowerCollection = this.loadObject(this.KEYS.FLOWER_COLLECTION, this.DEFAULTS.flowerCollection);
        this._cache.orchidCount = this.load(this.KEYS.ORCHID_COUNT, this.DEFAULTS.orchidCount);
        this._cache.chrysanthemumCount = this.load(this.KEYS.CHRYSANTHEMUM_COUNT, this.DEFAULTS.chrysanthemumCount);
        this._cache.seedCount = this.load(this.KEYS.SEED_COUNT, this.DEFAULTS.seedCount);
        this._cache.moneyCount = this.load(this.KEYS.MONEY_COUNT, this.DEFAULTS.moneyCount);
        this._cache.tableUnlocked = this.load(this.KEYS.TABLE_UNLOCKED, this.DEFAULTS.tableUnlocked);
        this._cache.birdCageUnlocked = this.load(this.KEYS.BIRD_CAGE_UNLOCKED, this.DEFAULTS.birdCageUnlocked);
        this._cache.poolUnlocked = this.load(this.KEYS.POOL_UNLOCKED, this.DEFAULTS.poolUnlocked);
        this._cache.swingUnlocked = this.load(this.KEYS.SWING_UNLOCKED, this.DEFAULTS.swingUnlocked);
        this._cache.dogUnlocked = this.load(this.KEYS.DOG_UNLOCKED, this.DEFAULTS.dogUnlocked);
        this._cache.dogFriendship = this.load(this.KEYS.DOG_FRIENDSHIP, this.DEFAULTS.dogFriendship);
        this._cache.dogFoodCount = this.load(this.KEYS.DOG_FOOD_COUNT, this.DEFAULTS.dogFoodCount);
        this._cache.dogGiftLastClaim = this.load(this.KEYS.DOG_GIFT_LAST_CLAIM, this.DEFAULTS.dogGiftLastClaim);
    },

    // ========== 通用加载方法 ==========
    load: function(key, defaultValue) {
        var saved = localStorage.getItem(key);
        if (saved === null) {
            return defaultValue;
        }
        if (typeof defaultValue === 'boolean') {
            return saved === 'true';
        }
        if (typeof defaultValue === 'number') {
            return parseInt(saved, 10) || 0;
        }
        return saved;
    },

    loadObject: function(key, defaultValue) {
        var saved = localStorage.getItem(key);
        if (saved === null) {
            return defaultValue;
        }
        try {
            return JSON.parse(saved);
        } catch(e) {
            return defaultValue;
        }
    },

    // ========== 通用保存方法 ==========
    save: function(key, value) {
        localStorage.setItem(key, value.toString());
    },

    saveObject: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    // ========== 杂草数量 ==========
    getGrassCount: function() {
        return this._cache.grassCounter;
    },

    setGrassCount: function(value) {
        this._cache.grassCounter = value;
        this.save(this.KEYS.GRASS_COUNT, value);
    },

    addGrassCount: function(amount) {
        this._cache.grassCounter += amount;
        this.save(this.KEYS.GRASS_COUNT, this._cache.grassCounter);
        return this._cache.grassCounter;
    },

    // ========== 肥料数量 ==========
    getFertilizerCount: function() {
        return this._cache.fertilizerCounter;
    },

    setFertilizerCount: function(value) {
        this._cache.fertilizerCounter = value;
        this.save(this.KEYS.FERTILIZER_COUNT, value);
    },

    addFertilizerCount: function(amount) {
        this._cache.fertilizerCounter += amount;
        this.save(this.KEYS.FERTILIZER_COUNT, this._cache.fertilizerCounter);
        return this._cache.fertilizerCounter;
    },

    // ========== 镰刀解锁状态 ==========
    isSickleUnlocked: function() {
        return this._cache.sickleUnlocked;
    },

    unlockSickle: function() {
        this._cache.sickleUnlocked = true;
        this.save(this.KEYS.SICKLE_UNLOCKED, true);
    },

    // ========== 割草机解锁状态 ==========
    isMowerUnlocked: function() {
        return this._cache.mowerUnlocked;
    },

    unlockMower: function() {
        this._cache.mowerUnlocked = true;
        this.save(this.KEYS.MOWER_UNLOCKED, true);
    },

    // ========== 摇一摇时间 ==========
    getLastShakeTime: function() {
        return this._cache.lastShakeTime;
    },

    setLastShakeTime: function(time) {
        this._cache.lastShakeTime = time;
        this.save(this.KEYS.LAST_SHAKE_TIME, time);
    },

    // ========== 花卉收集 ==========
    getFlowerCollection: function() {
        return this._cache.flowerCollection;
    },

    collectFlower: function(flowerId, flowerName) {
        if (!this._cache.flowerCollection[flowerId]) {
            this._cache.flowerCollection[flowerId] = {
                name: flowerName,
                count: 0
            };
        }
        this._cache.flowerCollection[flowerId].count++;
        this.saveObject(this.KEYS.FLOWER_COLLECTION, this._cache.flowerCollection);
        return this._cache.flowerCollection[flowerId];
    },

    getFlowerCount: function(flowerId) {
        if (!this._cache.flowerCollection[flowerId]) return 0;
        return this._cache.flowerCollection[flowerId].count;
    },

    // ========== 蝴蝶兰数量 ==========
    getOrchidCount: function() {
        return this._cache.orchidCount;
    },

    setOrchidCount: function(value) {
        this._cache.orchidCount = value;
        this.save(this.KEYS.ORCHID_COUNT, value);
    },

    addOrchidCount: function(amount) {
        this._cache.orchidCount += amount;
        this.save(this.KEYS.ORCHID_COUNT, this._cache.orchidCount);
        return this._cache.orchidCount;
    },

    // ========== 菊花数量 ==========
    getChrysanthemumCount: function() {
        return this._cache.chrysanthemumCount;
    },

    setChrysanthemumCount: function(value) {
        this._cache.chrysanthemumCount = value;
        this.save(this.KEYS.CHRYSANTHEMUM_COUNT, value);
    },

    addChrysanthemumCount: function(amount) {
        this._cache.chrysanthemumCount += amount;
        this.save(this.KEYS.CHRYSANTHEMUM_COUNT, this._cache.chrysanthemumCount);
        return this._cache.chrysanthemumCount;
    },

    // ========== 随机种子数量 ==========
    getSeedCount: function() {
        return this._cache.seedCount;
    },

    setSeedCount: function(value) {
        this._cache.seedCount = value;
        this.save(this.KEYS.SEED_COUNT, value);
    },

    addSeedCount: function(amount) {
        this._cache.seedCount += amount;
        this.save(this.KEYS.SEED_COUNT, this._cache.seedCount);
        return this._cache.seedCount;
    },

    // ========== 货币数量 ==========
    getMoneyCount: function() {
        return this._cache.moneyCount;
    },

    setMoneyCount: function(value) {
        this._cache.moneyCount = value;
        this.save(this.KEYS.MONEY_COUNT, value);
    },

    addMoneyCount: function(amount) {
        this._cache.moneyCount += amount;
        this.save(this.KEYS.MONEY_COUNT, this._cache.moneyCount);
        return this._cache.moneyCount;
    },

    // ========== 桌椅解锁状态 ==========
    isTableUnlocked: function() {
        return this._cache.tableUnlocked;
    },

    unlockTable: function() {
        this._cache.tableUnlocked = true;
        this.save(this.KEYS.TABLE_UNLOCKED, true);
    },

    // ========== 鸟笼解锁状态 ==========
    isBirdCageUnlocked: function() {
        return this._cache.birdCageUnlocked;
    },

    unlockBirdCage: function() {
        this._cache.birdCageUnlocked = true;
        this.save(this.KEYS.BIRD_CAGE_UNLOCKED, true);
    },

    // ========== 水池解锁状态 ==========
    isPoolUnlocked: function() {
        return this._cache.poolUnlocked;
    },

    unlockPool: function() {
        this._cache.poolUnlocked = true;
        this.save(this.KEYS.POOL_UNLOCKED, true);
    },



    // ========== 秋千解锁状态 ==========
    isSwingUnlocked: function() {
        return this._cache.swingUnlocked;
    },

    unlockSwing: function() {
        this._cache.swingUnlocked = true;
        this.save(this.KEYS.SWING_UNLOCKED, true);
    },

    // ========== 小狗解锁状态 ==========
    isDogUnlocked: function() {
        return this._cache.dogUnlocked;
    },

    unlockDog: function() {
        this._cache.dogUnlocked = true;
        this.save(this.KEYS.DOG_UNLOCKED, true);
    },

    // ========== 小狗好感度系统 ==========
    getDogFriendship: function() {
        return this._cache.dogFriendship;
    },

    addDogFriendship: function(amount) {
        // 确保当前好感度是数字
        if (typeof this._cache.dogFriendship !== 'number' || isNaN(this._cache.dogFriendship)) {
            this._cache.dogFriendship = 0;
        }
        // 确保增量是数字
        if (typeof amount !== 'number' || isNaN(amount)) {
            amount = 0;
        }
        this._cache.dogFriendship += amount;
        // 限制最大好感度为200
        if (this._cache.dogFriendship > 200) {
            this._cache.dogFriendship = 200;
        }
        // 确保不小于0
        if (this._cache.dogFriendship < 0) {
            this._cache.dogFriendship = 0;
        }
        this.save(this.KEYS.DOG_FRIENDSHIP, this._cache.dogFriendship);
    },

    setDogFriendship: function(value) {
        this._cache.dogFriendship = value;
        if (this._cache.dogFriendship < 0) {
            this._cache.dogFriendship = 0;
        } else if (this._cache.dogFriendship > 200) {
            this._cache.dogFriendship = 200;
        }
        this.save(this.KEYS.DOG_FRIENDSHIP, this._cache.dogFriendship);
    },

    // ========== 狗粮系统 ==========
    getDogFoodCount: function() {
        return this._cache.dogFoodCount;
    },

    addDogFoodCount: function(amount) {
        this._cache.dogFoodCount += amount;
        if (this._cache.dogFoodCount < 0) {
            this._cache.dogFoodCount = 0;
        }
        this.save(this.KEYS.DOG_FOOD_COUNT, this._cache.dogFoodCount);
    },

    setDogFoodCount: function(value) {
        this._cache.dogFoodCount = value;
        if (this._cache.dogFoodCount < 0) {
            this._cache.dogFoodCount = 0;
        }
        this.save(this.KEYS.DOG_FOOD_COUNT, this._cache.dogFoodCount);
    },

    // ========== 小狗满级礼包系统 ==========
    canClaimDogGift: function() {
        // 检查是否满级（200好感度）
        if (this._cache.dogFriendship < 200) {
            return false;
        }
        // 检查是否过了24小时
        const now = Date.now();
        const lastClaim = this._cache.dogGiftLastClaim;
        const oneDay = 24 * 60 * 60 * 1000; // 24小时毫秒数
        return now - lastClaim >= oneDay;
    },

    claimDogGift: function() {
        if (!this.canClaimDogGift()) {
            return false;
        }
        // 添加5袋种子
        this.addSeedCount(5);
        // 更新领取时间
        this._cache.dogGiftLastClaim = Date.now();
        this.save(this.KEYS.DOG_GIFT_LAST_CLAIM, this._cache.dogGiftLastClaim);
        return true;
    },

    getDogGiftRemainingTime: function() {
        if (this._cache.dogFriendship < 200) {
            return -1; // 未满级
        }
        const now = Date.now();
        const lastClaim = this._cache.dogGiftLastClaim;
        const oneDay = 24 * 60 * 60 * 1000;
        const nextClaimTime = lastClaim + oneDay;
        const remaining = nextClaimTime - now;
        return remaining > 0 ? remaining : 0;
    },

    // ========== 重置所有数据（调试用） ==========
    resetAll: function() {
        localStorage.removeItem(this.KEYS.GRASS_COUNT);
        localStorage.removeItem(this.KEYS.FERTILIZER_COUNT);
        localStorage.removeItem(this.KEYS.SICKLE_UNLOCKED);
        localStorage.removeItem(this.KEYS.MOWER_UNLOCKED);
        localStorage.removeItem(this.KEYS.LAST_SHAKE_TIME);
        localStorage.removeItem(this.KEYS.FLOWER_COLLECTION);
        localStorage.removeItem(this.KEYS.ORCHID_COUNT);
        localStorage.removeItem(this.KEYS.CHRYSANTHEMUM_COUNT);
        localStorage.removeItem(this.KEYS.SEED_COUNT);
        localStorage.removeItem(this.KEYS.MONEY_COUNT);
        localStorage.removeItem(this.KEYS.TABLE_UNLOCKED);
        localStorage.removeItem(this.KEYS.BIRD_CAGE_UNLOCKED);
        localStorage.removeItem(this.KEYS.POOL_UNLOCKED);
        this.loadAll();
    }
};

// 页面加载时自动初始化
GameData.init();
