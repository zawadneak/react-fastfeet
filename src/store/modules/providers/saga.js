import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  providerSuccess,
  providerFailure,
  providerDeleteSuccess,
} from './actions';
import api from '~/services/api';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';

export function* loadProviders({ payload }) {
  try {
    const { page, query } = payload;
    const response = yield call(api.get, 'provider', {
      params: {
        page: page || 1,
        q: query || '%',
      },
    });

    yield put(providerSuccess(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(signOut());
      history.push('/');
    } else {
      toast.error(`Error loading providers! ${e.message}`);
    }
    yield put(providerFailure());
  }
}

export function* deleteProviders({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `provider/${id}`);

    yield put(providerDeleteSuccess(id));
  } catch (e) {
    toast.error('Error deleting!');
    yield put(providerFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@provider/DELETE_REQUEST', deleteProviders),
  takeLatest('@provider/REQUEST', loadProviders),
]);
