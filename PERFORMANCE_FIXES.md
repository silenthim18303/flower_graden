# 性能修复总结

## ✅ 已修复的问题

### 1. **重复添加 script 标签到 DOM**
- **文件**: `src/main.js`
- **修复**: 添加 `loadedScripts` Set，避免重复加载相同的 script
- **变更**:
  - 新增 `const loadedScripts = new Set();`
  - 在 `loadScript()` 和 `loadScriptQuick()` 中检查 Set
  - 如果已加载，直接 resolve 不创建新 script

### 2. **重复添加 visibilitychange 事件监听器**
- **文件**: `src/js/plants/grass.js`
- **修复**: 添加 `visibilityListenerAdded` 标志，只添加一次监听器
- **变更**:
  - 新增 `var visibilityListenerAdded = false;`
  - 在 `createGrass()` 中检查标志
  - 只在第一次添加监听器

### 3. **重新构建项目**
- **状态**: ✅ 完成
- **输出目录**: `dist_build/`

## 📊 性能优化效果

| 问题 | 修复前 | 修复后 |
|------|--------|--------|
| script 标签数量 | 每次刷新增加 | 保持稳定 |
| visibilitychange 监听器 | 每次 `createGrass()` 增加 | 只有 1 个 |
| DOM 节点数量 | 持续增长 | 稳定 |

## 🎯 使用方法

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview

# 或直接使用
http-server dist_build -p 8080
```

## 📝 注意事项

1. **Phaser.Game 单例**: 实际上每次页面刷新都是全新的 JS 环境，不需要单例检查
2. **对象创建/销毁**: 对于当前游戏规模，Phaser 的对象管理已经足够好
3. **localStorage**: GameData 的频繁写入对性能影响很小，可以保持原样

## 🔧 其他潜在优化（可选）

如果游戏规模扩大，可以考虑：
- 对象池（Object Pool）
- 防抖的 localStorage 写入
- 更完善的资源清理机制
