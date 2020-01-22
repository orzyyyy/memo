- 作用

用作 github profile 左下角的 organization icon，就像[这个](https://github.com/orzyyyy)一样。

- 用法

  1. 首先你得申请 14 个 organization。以 0- 开头可以防止在加入正经的 organization 时，被展示的 icon 被分隔的问题
  2. 上传一张图
  3. 点下载。1-1 表示从左往右、从上到下，第一行第一张，其他的以此类推。
  4. 挨个替换 icon

- 流程：

  1. 把图转成 canvas
  2. 以两行七列的规格计算每个 icon 的长宽
  3. 把每个 icon 缩放进 35 \* 35 的格子，并渲染到预览框
  4. 下载时为每个 icon 创建 a 标签
