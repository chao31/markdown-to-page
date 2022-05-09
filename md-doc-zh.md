# markdown-to-page
[![npm](https://badgen.net/npm/v/markdown-to-page)](https://www.npmjs.com/package/markdown-to-page)
[![last-commit](https://badgen.net/github/last-commit/chao31/markdown-to-page)](https://www.npmjs.com/package/markdown-to-page)
[![license](https://badgen.net/github/license/chao31/markdown-to-page)](https://www.npmjs.com/package/markdown-to-page)

一款轻量级的 React 组件，将 markdown 语言转换成具有响应式目录的漂亮页面。

📖 [ English ](https://github.com/chao31/markdown-to-page/blob/master/README.md)

## 预览

![Image from Gyazo](https://i.gyazo.com/5fc74622bab0fb613705f52fba939593.gif)

## Demo

[点击查看](https://chao31.github.io/markdown-to-page/)
## 功能

* 支持 [`<HashRouter>`](https://reactrouter.com/docs/en/v6/api#hashrouter) 🔥.
* 支持 [`<BrowserRouter>`](https://reactrouter.com/docs/en/v6/api#browserrouter).
* 自动创建目录 😍。
* 响应式组件，目录自适应页面宽度 🔥。
* 代码高亮 😍。
* 可配置主题色。
* 渲染 markdown 的速度很快 🔥。
* 对 markdown 语法的解析和渲染都很[安全](https://github.com/markdown-it/markdown-it/tree/master/docs/security.md)。
* 上手简单。
* 详尽的文档说明 🎉。
* 中英文文档 🌐。

## 安装

```js
npm install markdown-to-page
```

使用 `yarn` 安装：

```js
yarn add markdown-to-page
```

## 使用

只有 `markdownText` 属性必传。

```js
import * as React from 'react';
import MarkdownPage from 'markdown-to-page';

const App = () => {
  const md = '# your markdown text ...';
  return <MarkdownPage markdownText={md}/>;
};

export default App;
```

## 属性

|                           Name                            |               Type                | Default | Description |
|        :-----------------------------------------:        |    :-------------------------:    | :-----: | :---------- |
|        **[`markdownText`](#markdownText)**                |        `string`   |   `-`      | markdown 字符串 |
|        **[`isHashRouter`](#isHashRouter)**                |        `boolean`   |    `false`     | 当前是否使用的是 `<HashRouter>` |
|        **[`themeColor`](#themeColor)**                |        `string`   |    `#5e7ce0`     | 主题色 |
|        **[`anchorId`](#anchorId)**                |        `string`   |    `_to`    | 因为当使用 `<HashRouter>`时，是不能使用 hash 锚点的，所以这里支持 query 参数锚点，默认 query 为`?_to=xxx`，也可以通过改属性修改 |
|        **[`markdownInstance`](#markdownInstance)**|[Markdown-it](https://www.npmjs.com/package/markdown-it)|`-`| 如果你希望使用自己的 markdown 渲染引擎，通过此参数传入 |

### `markdownText`

`markdown-to-page`对 markdown 语法的解析遵循 __[CommonMark spec](http://spec.commonmark.org/)__ 规范。

### `isHashRouter`

是否使用 __[`<HashRouter>`](https://reactrouter.com/docs/en/v6/api#hashrouter)__ 路由。

### `themeColor`

若要改变当前渲染后页面的主题色，通过给`themeColor`传入一个颜色，`5e7ce0` 或者 `#5e7ce0`都支持。

### `anchorId`

默认锚点 query 的 id 是 `_to` , 比如 `localhost:8080/#/page/level/?_to=custom-style`, 但若 `_to` 和您的 query 参数冲突，可以通过该参数自定义。

### `markdownInstance`

`markdown-to-page`的解析引擎使用的是 __[Markdown-it](https://www.npmjs.com/package/markdown-it)__ , 通过该参数可以使用您自定义的 markdwon 解析引擎。

## Q&A

### 为什么在 `HashRouter` 路由下，我的锚点定位失效？

检查一下您的项目是否使用了 React 的严格模式 `React.StrictMode`, 因为`markdown-to-page` 是通过`react-router-dom`去监听 URL 上锚点的变化，但在严格模式下，`react-router-dom`的  `useLocation` hook 会失效，比如：

```js
import * as React from 'react';
import ReactDOM from 'react-dom/client';

import MarkdownPage from '../.';
import { HashRouter, Route, Switch } from 'react-router-dom';
const md = '# your markdown text ...'; 

const App = () => (
  <HashRouter>
    <Switch>
      <Route path="/">
        <MarkdownPage markdownText={md} isHashRouter={true} />
      </Route>
    </Switch>
  </HashRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

所以去掉包裹子组件的`StrictMode` :

```js

root.render(
-  <React.StrictMode>
    <App />
-  </React.StrictMode>
);
```

## Development

开发本项目分两步：

1. 开启 `rollup` 对 `src/` 目录的监听，这样代码变动后， 会被自动编译到 `dist/` 目录。

```js
npm start
```

2. 进入  `example/` 目录开发，`example`会引用上一级目录的`markdown-to-page`版本。

```js
cd example
npm start
```

这样，任何时候 `src/` 或者 `example/src`的代码变动，都会在本地服务器上响应。

![](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

### 发布到 npm

```js
npm publish
```

## License

MIT © [chao31](https://github.com/chao31)
