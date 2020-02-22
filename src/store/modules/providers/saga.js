import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  providerSuccess,
  providerFailure,
  providerDeleteSuccess,
} from './actions';
import api from '~/services/api';

export function* loadProviders({ payload }) {
  try {
    const { page, q } = payload;
    const response = yield call(api.get, 'provider', {
      query: {
        page: page || 1,
        q: q || '%',
      },
    });

    console.log(response.data);

    yield put(providerSuccess(response.data));
  } catch (e) {
    toast.error('Error loading providers!');
    console.log(e);
    yield put(providerFailure());
  }
}

export function* deleteProviders({ payload }) {
  try {
    console.log('test');
    const { id } = payload;
    const response = yield call(api.delete, `provider/${id}`);

    console.log(response);
    yield put(providerDeleteSuccess(id));
  } catch (e) {
    toast.error('Error deleting!');
    console.log(e);
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
