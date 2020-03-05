#### 发布周期

- 主版本号：当整体框架发生颠覆性变化时。如 `1.0.0` 发布时几乎重写了所有代码
- 次版本号：当新特性自觉极具标志性时。如 `1.0.0` 中的`根据 url 保存 exhentai 图片到本地` 的接口，极大简化了获得快乐的步骤
- 修订号：天气或心情晴朗时

---

## 1.1.4

`2020-03-05`

- 版本主要任务

  -

- server

  - 分离开发与生产端口
  - 为 controller 中每个接口输出日志
  - 路由增加前缀以区分业务
  - 尝试为每个接口增加队列

- 构建

  - 增加私有服务器个性化构建命令
  - 加入 `wait-on` 以避免服务构建完成、页面尚未完成时，直接访问目标地址 404 的问题
  - 构建用户指定为 [`peko-bot`](https://github.com/peko-bot)
  - 重新构建时，先输出到临时文件夹。无异常时再删除目标文件，以避开构建期间无法访问主页的问题
  - 使用 cpr 取代 cp 以跨平台

- view

  - 启用 react 严格模式
  - 初始化行号组件
  - 部分 json 文件不再使用请求的方式获得，而是直接 import，以避开各类路径错误
  - 增加工具页

    - 局域网上传
    - 碎图

  - 重写主页

    - 样式改成简洁版
    - 更精细的组件分离，为后续的移动端适配做准备

  - 增加 url 导航
  - 增加初始化工具页的 EditForm 选项
  - 统一工具页的说明

    - 每个工具需要有独立的说明，文件名与工具名相同，/src/assets/document/xxx.md

- exhentai

  - 修复 win 文件路径名称不兼容的问题。
  - 下载前增加 confirm 提示，而不是直接下载。
  - 重命名记录文件。

- 其他

  - 移除 codecov。关键测试不需要覆盖率来提醒我，本地看看覆盖路径就够了。

    - 但配置文件还是得留着，指不定哪天就反悔了。

  - 分离 server 的依赖到 devDependencies
  - 移除 ci 测试中对 netlify 页面构建的冗余检查

---

## 1.1.3

`2019-12-11`

- 版本主要任务

  - 移除 business

    - Angular Form 真香！

---

## 1.1.2

`2019-12-08`

- 版本主要任务

  - 加入 business

    - 以部分不敏感的实际业务、逐渐抽象状态形成表单通用组件
    - 结合对实施记录中问题的思考和对业务页面点击轨迹的记录，逐步脱离现有组件库，形成业务化的交互设计

  - 去 ui 库

    - 学习并尝试实现个性化的设计

- ci

  - 使用 peaceiris/actions-gh-pages 部署 gh-pages [a4f6499](http://github.com/orzyyyy/memo/commit/a4f6499)
  - 每天早上八点部署一次 gh-pages [55a6d80](http://github.com/orzyyyy/memo/commit/55a6d80)
  - 使用 github action cache
  - 分别检查对 gh-pages 和 netlify 的检查 [07c5199](http://github.com/orzyyyy/memo/commit/07c5199)

- document

  - view

    - 增加 meta 信息尝试增强 seo [df9c1d8](http://github.com/orzyyyy/memo/commit/df9c1d8)
    - 增加 google analytics 和 hotjar 的 html 脚本
    - 修复详情页中 github-markdown 不生效的问题 [e4c08d0](http://github.com/orzyyyy/memo/commit/e4c08d0e80637303a2b74368cd5bc6f2446a65a3)
    - 移除 antd [b6856e6](http://github.com/orzyyyy/memo/commit/b6856e6723d4f0b30036b33387c3f81873384a8c)
      - Icon 和 monent.js 无法被 tree-shaking 的问题到 4.0-prepare 仍未解决
    - list 以创建时间排序，而不是更新时间 [0ea85d8](http://github.com/orzyyyy/memo/commit/0ea85d8105e006ee698a77cfc288eefc54ac6dd3)

  - server

    - 在 service 的构造器中注入实例 [b97e9a4](http://github.com/orzyyyy/memo/commit/b97e9a43bb37429dde4eb538936cee004af7c12f)
    - 分离 mapping 和 markdown 的更新方法 [520150f](http://github.com/orzyyyy/memo/commit/520150f16ff9e663ef0ee20aba0d635190fa8c33)

- exhentai

  - 修复文件夹名称过长时服务崩溃的问题 [834a80f](http://github.com/orzyyyy/memo/commit/834a80f2272ccd83cf2e55f332c6b2f0b24b0b15)
  - 线上移除 exhentai 菜单项 [bc715f2](http://github.com/orzyyyy/memo/commit/bc715f22d6bda5c143ab4618b187313f6a2aa6e1)

- business

  - view

    - 实施记录 [76f663e](https://orzyyyy.github.io/memo/markdown/76f663e411865e7811cf56576abbd3e6)
    - 完成对单一表单复杂状态的重构 [867507c](https://orzyyyy.github.io/memo/markdown/867507c5d6c8e4a29ed2b5151a9f9d6a)
    - 增加 dev 的 live reload [67c945d](http://github.com/orzyyyy/memo/commit/67c945d1d0be92a406a092fb2367f56769a69311)
    - 增加 mui 的 loading 页 [76b3c93](http://github.com/orzyyyy/memo/commit/76b3c935dc62e0d4bb08fa1528ba6b25eba26bea)

  - server

    - 增加通用接口，实现只依赖 sql 和数据库连接的增删改查 [838a6cb](http://github.com/orzyyyy/memo/commit/838a6cb820f9507bba504ea538f15add6a311aba)
    - 增加系统变量，@@dateStamp [49ce44d](http://github.com/orzyyyy/memo/commit/49ce44dbcd5998537c61769970fe18a6892eeb93)
    - 加入 pm2 [6a62a71](http://github.com/orzyyyy/memo/commit/6a62a71e0a86b8f4df9c187c019bf3619f3fd550)

- 其他

  - 使用 ts/tsx 重构测试用例
  - 分离构建时的环境变量 [02e9391](http://github.com/orzyyyy/memo/commit/02e93916b71c648ce2d454ed7c70cb6b313de42d)

    - 在 html 中注入变量控制构建环境，而不是在 router 中硬编码
    - 相关配置的分离

  - 运行测试时，不再运行构建产物中的用例 [f63aa35](http://github.com/orzyyyy/memo/commit/f63aa350cd8cdabff56528d3a55406ac0fb2ca0e)
  - 构建结束后自动打开本地地址 [6044e62](http://github.com/orzyyyy/memo/commit/6044e620b3d96973d633120b840fec2dd9198fbc)

---

## 1.1.1

`2019-10-07`

- 版本主要任务

  - 以 react hooks 重构页面代码
    - 暂时移除局部页面的按需加载
  - 覆盖测试用例

- document

  - 增加 `collapsible` 使 Sider 可折叠 [#190](https://github.com/orzyyyy/memo/pull/190)
  - 从 `react-markdown` 迁移到 `marked` [#204](https://github.com/orzyyyy/memo/pull/204)
    - 加入 `github-markdown-css`
  - 增加 `visible` 属性以控制 MainPageList 项的显隐 [#212](https://github.com/orzyyyy/memo/pull/212)
  - 增加隐藏 MainPageList 项的接口 [#214](https://github.com/orzyyyy/memo/pull/214)
    - 位于右键菜单中
  - 设置 `mini-xmind` 默认方向为横向 [d26d526](https://github.com/orzyyyy/memo/commit/d26d5269cd15205960ac6b8c1993d06295dd9948)

- exhentai

  - 增加按钮用于更新 exhentai list [#203](https://github.com/orzyyyy/memo/pull/203)
  - 重写 exhentai 中 的`/download/status` [#233](https://github.com/orzyyyy/memo/pull/233)
    - 默认显示最新时间戳目录下所有文件夹的图片缺失情况，以前则是只能指定某个文件夹
    - 现在不需要再传 `name`
    - `dateStamp` 可选
  - 检查图片状态时返回漫画名称 [cdbe9b1](https://github.com/orzyyyy/memo/commit/cdbe9b18559f67f3a9bfa7c43816bfe78de8fb7c)

- 构建

  - 从 CircleCI 迁移到 github actions [#201](https://github.com/orzyyyy/memo/pull/201)
  - 线上构建时，不再上传 mapping.json 中 `visible` 为 false 的文件 [#213](https://github.com/orzyyyy/memo/pull/213)
  - 移除 `moment` 的 locales [866b200](https://github.com/orzyyyy/memo/commit/866b200c49f634816c99a92a388b1250db4991fa)
  - 构建时为每个路由创建 html 模板 [#229](https://github.com/orzyyyy/memo/pull/229) [#230](https://github.com/orzyyyy/memo/pull/230)
    - 从 HashRouter 迁移到 BrowserRouter
    - 同时支持 netlify 和 gh-pages [3db201b](https://github.com/orzyyyy/memo/commit/3db201b56cab1c5960200b987b55f3eb46a884d4)
  - 线上环境压缩 json 文件 [#243](https://github.com/orzyyyy/memo/pull/243)
  - 现在只会在 release 时 deploy 到 gh-pages，netlify 仍然是合并到 master 时构建 [04b91b3](https://github.com/orzyyyy/memo/commit/04b91b3b39c2f8dbfba0753623a617056fb34f83)

- 其他
  - 更新 banner [#215](https://github.com/orzyyyy/memo/pull/215)
  - 增加通用接口查询 mysql [#225](https://github.com/orzyyyy/memo/pull/225) [424fa58](https://github.com/orzyyyy/memo/commit/424fa5877307f23267dc9ab1022193089e685ec6) [6ea552f](https://github.com/orzyyyy/memo/commit/6ea552fe6f2615c461cca2f28ceee5231477efda)
  - 以 middleware 的方式初始化路由 [#227](https://github.com/orzyyyy/memo/pull/227)
  - 装饰器 Request 支持默认返回值 [#232](https://github.com/orzyyyy/memo/pull/232)
    - return 时则返回被 return 的值
    - 否则返回字符串 `success`

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
