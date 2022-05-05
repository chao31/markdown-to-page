import * as React from 'react';
import ReactDOM from 'react-dom/client';

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

const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(<App />);
