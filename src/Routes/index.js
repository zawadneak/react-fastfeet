import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Login from '../pages/Login/index';
import Deliveries from '../pages/Deliveries/index';
import Problems from '../pages/Problems/index';
import Providers from '../pages/Providers/index';
import Recipients from '../pages/Recipients/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/deliveries" isPrivate component={Deliveries} />
      <Route path="/providers" isPrivate component={Providers} />
      <Route path="/recipients" isPrivate component={Recipients} />
      <Route path="/problems" isPrivate component={Problems} />
    </Switch>
  );
}
