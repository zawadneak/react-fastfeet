import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login/index';
import Deliveries from '../pages/Deliveries/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/deliveries" component={Deliveries} />
    </Switch>
  );
}
