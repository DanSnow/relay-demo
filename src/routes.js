import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from './components/CoreLayout';
import App from './components/App';
import RecordDetail from './components/RecordDetail';

export default (
  <Route path='/' component={ CoreLayout }>
    <IndexRoute component={ App } />
    <Route path=':id' component={ RecordDetail } />
  </Route>
);
