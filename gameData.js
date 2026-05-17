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
        TABLE_UNLOCKED: 'tableUnlocked'
    },

    // ========== 默认值 ==========
    DEFAULTS: {
        grassCounter: 0,
        fertilizerCounter: 0,
        sickleUnlocked: true,
        mowerUnlocked: false,
        lastShakeTime: 0,
        flowerCollection: {},
        orchidCount: 0,
        chrysanthemumCount: 0,
        seedCount: 0,
        moneyCount: 0,
        tableUnlocked: false
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
        tableUnlocked: false
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
        this.loadAll();
    }
};

// 页面加载时自动初始化
GameData.init();
