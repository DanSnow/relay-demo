import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import createRelayContainer from './create-relay-container';

const history = useRouterHistory(createHistory)();

injectTapEventPlugin();

ReactDOM.render((
  <Router history={ history } createElement={ createRelayContainer }>
    { routes }
  </Router>
), document.getElementById('root'));
