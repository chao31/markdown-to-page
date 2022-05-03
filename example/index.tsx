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
