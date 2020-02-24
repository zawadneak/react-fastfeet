import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  deliverySuccess,
  deliveryFailure,
  deliveryDeleteSuccess,
} from './actions';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';

export function* loadDeliveries({ payload }) {
  try {
    const { page, query } = payload;

    const response = yield call(api.get, 'delivery', {
      params: {
        page: page || 1,
        q: query || '%',
      },
    });

    yield put(deliverySuccess(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(signOut());
      history.push('/');
    } else {
      toast.error(`Error loading deliveries! ${e.message}`);
    }
    yield put(deliveryFailure());
  }
}
export function* deleteDelivery({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `delivery/${id}`);

    yield put(deliveryDeleteSuccess(id));
  } catch (e) {
    toast.error('Error deleting!');
    yield put(deliveryFailure());
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
  takeLatest('@delivery/DELETE_REQUEST', deleteDelivery),
  takeLatest('@delivery/REQUEST', loadDeliveries),
]);
