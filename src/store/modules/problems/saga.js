import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  problemSuccess,
  problemFailure,
  problemCancelSuccess,
} from './actions';
import api from '~/services/api';

export function* loadProblems({ payload }) {
  try {
    const { page, q } = payload;
    const response = yield call(api.get, 'delivery/problems', {
      query: {
        page: page || 1,
        q: q || '%',
      },
    });

    console.log(response.data);

    yield put(problemSuccess(response.data));
  } catch (e) {
    toast.error('Error loading problems!');
    console.log(e);
    yield put(problemFailure());
  }
}
export function* cancelDelivery({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `recipient/${id}`);

    console.log(response);
    yield put(problemCancelSuccess(id));
  } catch (e) {
    toast.error('Error deleting!');
    yield put(problemFailure());
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
  takeLatest('@problem/CANCEL_REQUEST', cancelDelivery),
  takeLatest('@problem/REQUEST', loadProblems),
]);
