import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import providers from './providers/saga';
import deliveries from './deliveries/saga';
import recipients from './recipients/saga';
import problems from './problems/saga';
import files from './files/saga';

export default function* rootSaga() {
  return yield all([auth, providers, deliveries, recipients, problems, files]);
}
