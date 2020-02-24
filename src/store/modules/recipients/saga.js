import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  recipientSuccess,
  recipientFailure,
  recipientDeleteSuccess,
} from './actions';
import api from '~/services/api';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';

export function* loadRecipient({ payload }) {
  try {
    const { page, query } = payload;
    const response = yield call(api.get, 'recipient', {
      params: {
        page: page || 1,
        q: query || '%',
      },
    });

    yield put(recipientSuccess(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(signOut());
      history.push('/');
    } else {
      toast.error(`Error loading recipients! ${e.message}`);
    }
    yield put(recipientFailure());
  }
}
export function* deleteRecipient({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `recipient/${id}`);

    yield put(recipientDeleteSuccess(id));
  } catch (e) {
    toast.error('Error deleting!');
    yield put(recipientFailure());
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
  takeLatest('@recipient/DELETE_REQUEST', deleteRecipient),
  takeLatest('@recipient/REQUEST', loadRecipient),
]);
