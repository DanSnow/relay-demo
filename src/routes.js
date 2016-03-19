import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from './components/CoreLayout';
import App from './components/App';
import RecordList, { RecordsQuery } from './components/RecordList';
import RecordDetail, { RecordQuery } from './components/RecordDetail';

export default (
  <Route path='/' component={ CoreLayout }>
    <IndexRoute name="list" component={ RecordList } queries={ RecordsQuery } />
    <Route name="detail" path=':id' component={ RecordDetail } queries={ RecordQuery } />
  </Route>
);
