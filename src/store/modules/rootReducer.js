import { combineReducers } from 'redux';

import auth from './auth/reducer';
import providers from './providers/reducer';
import deliveries from './deliveries/reducer';
import recipients from './recipients/reducer';
import problems from './problems/reducer';
import files from './files/reducer';

export default combineReducers({
  auth,
  providers,
  deliveries,
  recipients,
  problems,
  files,
});
