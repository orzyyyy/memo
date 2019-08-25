#### 发布周期

- 主版本号：当整体框架发生颠覆性变化时。如 `1.0.0` 发布时几乎重写了所有代码
- 次版本号：当新特性自觉极具标志性时。如 `1.0.0` 中的`根据 url 保存 exhentai 图片到本地` 的接口，极大简化了获得快乐的步骤
- 修订号：天气或心情晴朗时

---

## 1.1.0

`2019-08-24`

- 修复创建 `document` 后报的 404 [#127](https://github.com/orzyyyy/memo/pull/127)
- 增加东方风 `Loading` 页 [#131](https://github.com/orzyyyy/memo/pull/131)
- 优化打包方式。现在的首页几乎已经按需加载了 [#132](https://github.com/orzyyyy/memo/pull/132)
- 页面自适应 [#133](https://github.com/orzyyyy/memo/pull/133)
- 首页列表增加类型前缀 [#135](https://github.com/orzyyyy/memo/pull/135)
- 修复不同系统对路径处理方式的差异引起的报错
- 增加基于 `socket.io` 的 live reload [#143](https://github.com/orzyyyy/memo/pull/143)
- `nino-cli` 升级到 1.1.1，将 `tslint` 替换为 `eslint`
- 移除 `exhentai` list 中的名称
- 增加接口 `test`，用于区分线上线下环境 [#152](https://github.com/orzyyyy/memo/pull/152) [#155](https://github.com/orzyyyy/memo/pull/155) [#157](https://github.com/orzyyyy/memo/pull/157) [#159](https://github.com/orzyyyy/memo/pull/159) [#160](https://github.com/orzyyyy/memo/pull/160)
- 修复 Icon 无法 `tree-shaking` 的问题 [#167](https://github.com/orzyyyy/memo/pull/167)
  - 更新 `antd` 版本到 `4.0.0-alpha.2`，使用新的 api 重构了 `EditForm`
  - 增加依赖 `@ant-design/icons` 以实现 `tree-shaking`
- 增加 `exhentai` 回溯历史 list 信息的页面，仅在本地可用 [#169](https://github.com/orzyyyy/memo/pull/169)
- 增加 `exhentai` 不同系统下的代理端口 [#171](https://github.com/orzyyyy/memo/pull/171)
- 新增 `document` 后更新 `sider.json` [#172](https://github.com/orzyyyy/memo/pull/172)
- 改善 `EditForm` 增加标签时的操作行为。现在不再以 hack 的方式扭曲使用 `Select` 了，而是通过额外的按钮来切换到编辑模式 [#175](https://github.com/orzyyyy/memo/pull/175)
- 修复 `exhentai` 在爬完 list 后，直接访问页面会提示新抓取 list 404 的问题 [#178](https://github.com/orzyyyy/memo/pull/178)
- 新增 `exhentai` 对异常的处理 [#149](https://github.com/orzyyyy/memo/issues/149)
  - 获取 list 失败或超时时，休眠一段时间后重新发起请求，直到请求完整 [#184](https://github.com/orzyyyy/memo/pull/184)
  - 获取 download 地址失败或超时时，休眠一段时间后重新发起请求，直到请求完整 [#185](https://github.com/orzyyyy/memo/pull/185)
  - download 某张图片失败或超时时，先删除当前图片，然后重新发起请求，直到请求完整 [#186](https://github.com/orzyyyy/memo/pull/186)

---

## 1.0.1

`2019-07-20`

- 抽象 `log` 和资源读取方法 [#87](https://github.com/orzyyyy/memo/pull/87)
- 修复新建 `markdown` 时初始值错误的问题 [#89](https://github.com/orzyyyy/memo/pull/89/files)
- 提交到主分支且检查通过时，自动发布 `dist` 到 gh-pages [449c2ad](https://github.com/orzyyyy/memo/commit/449c2ad1d5b96d470b5715c716968a52a92ef155)
- 使用装饰器修饰 controller 中的 router [f8c1204](https://github.com/orzyyyy/memo/commit/f8c1204ce0bf004f12055aba232ff61f0597ec28)
- 重构 server [9e72b57](https://github.com/orzyyyy/memo/commit/9e72b57ceaf1996d69d9067f9006fd4fa8f89292), [b27ad63](https://github.com/orzyyyy/memo/commit/b27ad63b7e9bfd65aa5d06292478d3002d6d43b3), [69f5617](https://github.com/orzyyyy/memo/commit/69f5617f99087994b9207f2360af5e846fd0b5b3), [a2725a4](https://github.com/orzyyyy/memo/commit/a2725a4ceeeda5be9b0adfad005d38d4ca24c121), [8136804](https://github.com/orzyyyy/memo/commit/81368046f43c598a705e1bd1811b1fc72d12d790), [#98](https://github.com/orzyyyy/memo/pull/98)
- 编辑 `markdown` 保存时，server 执行 `prettier` [#100](https://github.com/orzyyyy/memo/pull/100)
- 更新全局滚动条样式 [#103](https://github.com/orzyyyy/memo/pull/103)
- 更新 `MarkdownDetail` 文本容器最小高度，以修复加载数据时过于明显的抖动 [#104](https://github.com/orzyyyy/memo/pull/104)
- 分离不同系统下，`puppeteer` 初始化时 chrome 的启动路径 [a7df0bd](https://github.com/orzyyyy/memo/commit/a7df0bdcd00dd79442ab5a85e0ba9fb8e14760da)
- `MainPage` 顶部增加文本框，以根据 url 直接下载 exhentai 中的所有图片 [#117](https://github.com/orzyyyy/memo/pull/117)
- 增加检查 exhentai 下载遗漏图片的接口 [#119](https://github.com/orzyyyy/memo/pull/119)
- 更新 `nino-cli` 到 1.0.3 [#120](https://github.com/orzyyyy/memo/pull/120)
- 提交 exhentai 漫画名称列表及相关 url [a649b11](https://github.com/orzyyyy/memo/commit/a649b112c7f6275b5aab26707def28eec20e7d2b)

---

## 1.0.0

`2019-06-29`

- 本地在线编辑 markdown、mapping
  - markdown 依赖于 `react-markdown`，mapping 依赖于 `mini-xmind`
- 本地服务抓取 exhentai 缩略图
  - `puppeteer` 模拟操作
  - 自动设置 cookie
  - 大图显示。图片懒加载依赖于 `react-lazyload`
- 本地服务下载指定 exhentai 所有图片到本地

---
