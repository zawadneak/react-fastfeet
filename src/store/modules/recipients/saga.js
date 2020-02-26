import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  recipientSuccess,
  recipientFailure,
  recipientDeleteSuccess,
  recipientRegisterSuccess,
} from './actions';
import api from '~/services/api';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';

export function* loadRecipient({ payload }) {
  try {
    const { page, query, limit } = payload;
    const response = yield call(api.get, 'recipient', {
      params: {
        page: page || 1,
        q: query || '%',
        limit: limit || null,
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

export function* registerRecipient({ payload }) {
  try {
    const { data } = payload;
    yield call(api.post, '/recipient', data);

    yield put(recipientSuccess());
    history.push('/recipients');
  } catch (e) {
    toast.error(`Couldn't register recipient! ${e.message}`);
    yield put(recipientFailure());
  }
}

export function* editRecipient({ payload }) {
  try {
    const { id, data } = payload;

    yield call(api.put, `/recipient/${id}`, data);

    yield put(recipientSuccess());
    history.push('/recipients');
  } catch (e) {
    if (e.response.data.error) {
      toast.error(`Couldn't edit! ${e.response.data.error}`);
    } else {
      toast.error(`Couldn't edit recipient!`);
    }
    yield put(recipientFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@recipient/DELETE_REQUEST', deleteRecipient),
  takeLatest('@recipient/REQUEST', loadRecipient),
  takeLatest('@recipient/REGISTER_REQUEST', registerRecipient),
  takeLatest('@recipient/EDIT_REQUEST', editRecipient),
]);
