# markdown-to-page

Light weight react component for creating an responsive markdown page with beautiful TOC.

## Features

* Supports [`<HashRouter>`](https://reactrouter.com/docs/en/v6/api#hashrouter)
* Supports [`<BrowserRouter>`](https://reactrouter.com/docs/en/v6/api#browserrouter)
* Auto create a table of contents
* Responsive component
* Code highlighting
* Optional support for theme
* Easy-to-use
* Thorough documentation 😍
* Chinese docs

## Installation

```js
npm install --save markdown-to-page
```

with yarn :

```js
yarn add markdown-to-page
```

## Example

```js
import * as React from 'react';
import MarkdownPage from 'markdown-to-page';

const App = () => {
  const md = '# your markdown text ...';
  return <MarkdownPage markdownText={md}/>;
};

export default App;
```

* Only `markdownText` is the required prop

## Props

|                           Name                            |               Type                | Default | Description |
|        :-----------------------------------------:        |    :-------------------------:    | :-----: | :---------- |
|        **[`markdownText`](#markdownText)**                |        `string`   |         | markdown text string |
|        **[`isHashRouter`](#isHashRouter)**                |        `boolean`   |    `false`     | current route is `<HashRouter>` or not |
|        **[`themeColor`](#themeColor)**                |        `string`   |    `#5e7ce0`     | theme color |
|        **[`anchorId`](#anchorId)**                |        `string`   |    `_to`    | if choose `<HashRouter>`, the anchor is `?_to=xxx` |
|        **[`markdownInstance`](#markdownInstance)**       |        Markdown-it   |     | implement a markdown parse by yourself with markdown-it  |

## License

MIT
