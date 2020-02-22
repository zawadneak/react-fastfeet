import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  recipientSuccess,
  recipientFailure,
  recipientDeleteSuccess,
} from './actions';
import api from '~/services/api';

export function* loadRecipient({ payload }) {
  try {
    const { page, q } = payload;
    const response = yield call(api.get, 'recipient', {
      query: {
        page: page || 1,
        q: q || '%',
      },
    });

    console.log(response.data);

    yield put(recipientSuccess(response.data));
  } catch (e) {
    toast.error('Error loading recipients!');
    console.log(e);
    yield put(recipientFailure());
  }
}
export function* deleteRecipient({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `recipient/${id}`);

    console.log(response);
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
