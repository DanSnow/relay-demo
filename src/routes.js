import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from './components/CoreLayout';
import RecordList, { RecordsQuery } from './components/RecordList';
import RecordDetail, { RecordQuery } from './components/RecordDetail';
import RecordAdd, { AddRecordQuery } from './components/RecordAdd';

export default (
  <Route path='/' component={ CoreLayout }>
    <IndexRoute name="list" component={ RecordList } queries={ RecordsQuery } />
    <Route name="new" path='new' component={ RecordAdd } queries={ AddRecordQuery } />
    <Route name="detail" path=':id' component={ RecordDetail } queries={ RecordQuery } />
  </Route>
);
