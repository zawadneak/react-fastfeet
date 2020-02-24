import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  problemSuccess,
  problemFailure,
  problemCancelSuccess,
} from './actions';
import api from '~/services/api';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';

export function* loadProblems({ payload }) {
  try {
    const { page } = payload;
    const response = yield call(api.get, 'delivery/problems', {
      params: {
        page: page || 1,
      },
    });

    yield put(problemSuccess(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(signOut());
      history.push('/');
    } else {
      toast.error(`Error loading problems! ${e.message}`);
    }
    yield put(problemFailure());
  }
}
export function* cancelDelivery({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `problem/${id}/cancel-delivery`);

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
