import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownPage from '../.';
import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import { CONTENT } from './consts';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <MarkdownPage markdownText={CONTENT} isHashRouter={true} />
      </Route>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));

// "react": "16.13.1",
//     "react-dom": "16.13.1",
//     "react-router-dom": "^5.3.0",

// "@types/react-router-dom": "^5.3.3",
//     "@types/react-dom": "^18.0.3",
