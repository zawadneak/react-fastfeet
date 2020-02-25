import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Login from '../pages/Login/index';
import Deliveries from '../pages/Deliveries/index';
import DeliveryRegister from '../pages/DeliveryRegister/index';
import DeliveryEdition from '../pages/DeliveryEdition/index';
import Problems from '../pages/Problems/index';
import Providers from '../pages/Providers/index';
import ProviderRegister from '../pages/ProviderRegister/index';
import ProviderEdition from '../pages/ProviderEdition/index';
import Recipients from '../pages/Recipients/index';
import RecipientEdition from '../pages/RecipientEdition/index';
import RecipientRegister from '../pages/RecipientRegister/index';
import NotFound from '../pages/NotFound/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/deliveries" exact isPrivate component={Deliveries} />
      <Route
        path="/deliveries/register"
        isPrivate
        component={DeliveryRegister}
      />
      <Route
        path="/deliveries/edit/:id"
        isPrivate
        component={DeliveryEdition}
      />
      <Route path="/providers" exact isPrivate component={Providers} />
      <Route
        path="/providers/register"
        isPrivate
        component={ProviderRegister}
      />
      <Route path="/providers/edit/:id" isPrivate component={ProviderEdition} />
      <Route path="/recipients" exact isPrivate component={Recipients} />
      <Route
        path="/recipients/register/"
        isPrivate
        component={RecipientRegister}
      />
      <Route
        path="/recipients/edit/:id"
        isPrivate
        component={RecipientEdition}
      />
      <Route path="/problems" exact isPrivate component={Problems} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
}
