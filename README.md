# markdown-to-page

Light weight react component for creating an responsive markdown page with beautiful TOC.

## Features

* Supports [`<HashRouter>`](https://reactrouter.com/docs/en/v6/api#hashrouter).
* Supports [`<BrowserRouter>`](https://reactrouter.com/docs/en/v6/api#browserrouter).
* Auto create a table of contents.
* Responsive component.
* Code highlighting.
* Optional support for theme.
* Easy-to-use.
* Thorough documentation 😍.
* Chinese docs.
* High speed.
* [Safe](https://github.com/markdown-it/markdown-it/tree/master/docs/security.md) by default.

## Installation

```js
npm install --save markdown-to-page
```

with yarn :

```js
yarn add markdown-to-page
```

## Usage

Only `markdownText` is a required prop

```js
import * as React from 'react';
import MarkdownPage from 'markdown-to-page';

const App = () => {
  const md = '# your markdown text ...';
  return <MarkdownPage markdownText={md}/>;
};

export default App;
```

## Props

|                           Name                            |               Type                | Default | Description |
|        :-----------------------------------------:        |    :-------------------------:    | :-----: | :---------- |
|        **[`markdownText`](#markdownText)**                |        `string`   |   `-`      | markdown text string |
|        **[`isHashRouter`](#isHashRouter)**                |        `boolean`   |    `false`     | current route is `<HashRouter>` or not |
|        **[`themeColor`](#themeColor)**                |        `string`   |    `#5e7ce0`     | theme color |
|        **[`anchorId`](#anchorId)**                |        `string`   |    `_to`    | if choose `<HashRouter>`, the anchor is `?_to=xxx` |
|        **[`markdownInstance`](#markdownInstance)**|[Markdown-it](https://www.npmjs.com/package/markdown-it)|`-`| implement a markdown parse by yourself with markdown-it  |

### `markdownText`

Follows the __[CommonMark spec](http://spec.commonmark.org/)__ + adds syntax extensions & sugar (URL autolinking, typographer).

### `isHashRouter`

Use [`<HashRouter>`](https://reactrouter.com/docs/en/v6/api#hashrouter) whether or not.

### `themeColor`

Change the style of the page with a main color, incoming prop like `themeColor={'5e7ce0'}` or `themeColor={'#5e7ce0'}` are all OK.

### `anchorId`

The default anchorId is `_to` , just like this `localhost:8080/#/page/level/?_to=custom-style`, maybe `_to` is conflict with your query, with anchorId prop to change this.

### `markdownInstance`

This prop is a instance of [Markdown-it](https://www.npmjs.com/package/markdown-it), when you want to implement a markdown parse by yourself.

## FAQ

### Anchor don't work under `HashRouter`

To check whether `React.StrictMode` is used , `markdown-to-page` monitor URL changes by `react-router-dom`, but the usage of `useLocation` hook will fail under strict mode , just like this:

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

So try to remove this nested `StrictMode` :

```js

root.render(
-  <React.StrictMode>
    <App />
-  </React.StrictMode>
);
```

## Development

Local development is broken into two parts (ideally using two tabs).

1. First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```js
npm start
```

2. The second part will be running the example/ create-react-app that's linked to the local version of your module.

```js
cd example
npm start
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

![](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

### Publishing to npm

```js
npm publish
```

## License

MIT
