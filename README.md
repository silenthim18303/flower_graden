# 花园游戏 (Garden Game)

一个使用 Phaser.js 开发的交互式花园种植游戏，已迁移至 Vite 工程化环境。

## 功能特性

- 🎮 **互动式花园** - 种植各种花卉和植物
- 💰 **经济系统** - 买卖种子、道具和装饰
- 🏠 **多场景** - 花园、商店、工作室等多个场景
- 🛠️ **丰富道具** - 肥料、镰刀、割草机等工具
- 📦 **家具装饰** - 桌椅、鸟笼、水池等装饰物品
- ⚡ **智能加载** - 首次完整加载，后续快速启动
- 🎨 **美观界面** - 包含启动加载动画和进度条

## 项目结构

```
garden_vite/
├── dist_build/              # 构建输出目录
│   ├── index.html          # 主页面
│   ├── shop.html           # 商店页面
│   ├── garden.html         # 花园页面
│   ├── work.html           # 工作室页面
│   ├── ...                 # 其他页面
│   ├── main.js             # 资源预加载脚本
│   ├── js/                 # 游戏逻辑文件
│   │   ├── core/           # 核心模块
│   │   ├── tools/          # 工具模块
│   │   ├── plants/         # 植物模块
│   │   ├── furniture/      # 家具模块
│   │   ├── bills/          # 交互模块
│   │   └── scenes/         # 场景模块
│   ├── img/                # 图片资源
│   │   ├── background/     # 背景图
│   │   ├── tools/          # 道具图
│   │   ├── plants/         # 植物图
│   │   └── furniture/      # 家具图
│   └── phaserjs/           # Phaser 游戏引擎
├── public/                 # 开发用公共资源
│   ├── img/
│   ├── js/
│   └── phaserjs/
├── src/                    # 源代码
│   ├── main.js            # 资源预加载逻辑
│   └── js/                # 游戏逻辑
├── index.html             # 主入口页面
├── shop.html              # 商店页面
├── ...                    # 其他HTML页面
├── vite.config.js         # Vite 配置文件
├── build.py               # 自定义构建脚本
└── package.json           # 项目配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 构建项目

```bash
npm run build
```

构建完成后，文件将输出到 `dist_build/` 目录。

### 预览构建结果

```bash
npm run preview
```

或者直接使用 http-server：

```bash
http-server dist_build -p 8080
```

## 页面说明

| 页面 | 文件 | 说明 |
|------|------|------|
| 主界面 | index.html | 主要游戏场景，包含告示牌等交互元素 |
| 商店 | shop.html | 购买种子和道具 |
| 花园 | garden.html | 花园种植场景 |
| 工作室 | work.html | 工作场景 |
| 堆肥 | compost.html | 堆肥功能 |
| 电商 | ecommerce.html | 电商功能 |
| 花箱 | flowerbox.html | 花箱场景 |
| 割草机 | mower.html | 割草机工具 |
| 种子 | seed.html | 种子相关 |
| 镰刀 | sickle.html | 镰刀工具 |
| 树 | tree.html | 种树功能 |

## 技术栈

- **Phaser.js** - 2D 游戏引擎
- **Vite** - 前端构建工具
- **HTML5/CSS3** - 页面结构和样式
- **JavaScript** - 游戏逻辑
- **LocalStorage** - 存储加载状态

## 构建说明

项目使用自定义的 Python 构建脚本 `build.py`，因为这是一个特殊的多页面项目，直接引用 JavaScript 文件而不使用模块打包。

### 构建脚本功能

- 复制所有 HTML 文件
- 复制公共资源（img、js、phaserjs）
- 复制 main.js 预加载脚本
- 输出到 dist_build/ 目录

### 修改构建配置

如果需要调整构建过程，可以编辑 `build.py` 文件。

## 资源预加载

项目包含智能资源预加载机制：

- **首次加载**：预加载所有图片和资源，显示完整进度条动画
- **后续访问**：使用缓存，快速启动（跳过图片预加载）
- **存储机制**：使用 LocalStorage 记录加载状态

如果需要重新看到完整加载动画：
- 清除浏览器缓存
- 或使用无痕模式
- 或在浏览器控制台执行：`localStorage.removeItem('garden_game_loaded')`

## 迁移说明

本项目是从传统 HTML/JS 项目迁移到 Vite 环境的，主要改动：

1. 使用 Vite 作为开发服务器
2. 资源路径调整为相对路径
3. 公共资源放置在 public/ 目录
4. 添加启动加载界面
5. 创建自定义构建脚本

## 许可证

本项目仅供学习和参考使用。

## 贡献

欢迎提交 Issue 和 Pull Request！

---

🎮 享受种植的乐趣！
