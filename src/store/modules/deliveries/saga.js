import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  deliverySuccess,
  deliveryFailure,
  deliveryDeleteSuccess,
} from './actions';
import api from '~/services/api';

export function* loadDeliveries({ payload }) {
  try {
    const { page, q } = payload;
    const response = yield call(api.get, 'delivery', {
      query: {
        page: page || 1,
        q: q || '%',
      },
    });

    yield put(deliverySuccess(response.data));
  } catch (e) {
    toast.error('Error loading deliveries!');
    console.log(e);
    yield put(deliveryFailure());
  }
}
export function* deleteDelivery({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `delivery/${id}`);

    console.log(response);
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
