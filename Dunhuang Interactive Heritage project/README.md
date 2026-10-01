# Stone Reveal — Dunhuang Interactive Heritage

由 `敦煌网页源代码.html` 拆分的静态项目展示页，无需安装依赖或打包。

## 文件结构

- `index.html`：完整中英文内容、页面结构、演示与影片入口。
- `styles/main.css`：页面样式、响应式布局、滚动动画。
- `scripts/app.js`：语言切换、导航、视差、全屏演示和视频播放。
- `stone-reveal-*.png`：六张既有配图，使用相对路径引用。

## 本地预览

在仓库根目录运行 `python3 -m http.server 8000`，然后打开：

<http://localhost:8000/Dunhuang%20Interactive%20Heritage%20project/>

## 部署

GitHub Pages 从 `main` 分支根目录发布，根目录的 `.nojekyll` 表示直接发布静态资源。页面地址：

<https://cooleli.github.io/Portfolio-page/Dunhuang%20Interactive%20Heritage%20project/>

## 外部依赖

- 实时演示：<https://cooleli.github.io/dunhuang-gesture-buddha/>，通过 iframe 嵌入，支持放大与新标签页打开。
- 影片：原附件中的 `CoolEli/dunhuang-gesture-buddha` 仓库录屏，由 `scripts/app.js` 的 `filmSrc` 引用。
- 字体与图标：Google Fonts、OnlineWebFonts、Font Awesome CDN。
- 返回首页：<https://cooleli.github.io/CV-project/#projects>。

附件仅包含项目展示页；Three.js / MediaPipe 交互引擎仍由原演示站点提供。手势体验需要 HTTPS、支持的浏览器，以及访客主动开启摄像头权限。
