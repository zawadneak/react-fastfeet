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

function* loadProviders({ payload }) {
  try {
    const { page, query, limit } = payload;
    const response = yield call(api.get, 'provider', {
      params: {
        page: page || 1,
        q: query || '%',
        limit: limit || null,
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

function* deleteProviders({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `provider/${id}`);

    yield put(providerDeleteSuccess(id));
  } catch (e) {
    toast.error('Error deleting!');
    yield put(providerFailure());
  }
}

function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

function* registerProviders({ payload }) {
  try {
    const { name, email, fileID } = payload;
    const response = yield call(api.post, 'provider', {
      name,
      email,
    });

    if (fileID) {
      yield call(api.put, `provider/${response.data.id}`, {
        avatar_id: fileID,
      });
    }

    yield put(providerSuccess());
    history.push('/providers');
  } catch (e) {
    if (e.response.data.error) {
      toast.error(`Couldn't register provider! ${e.response.data.error}`);
    } else {
      toast.error(`Couldn't register provider!`);
    }
    yield put(providerFailure());
  }
}

function* editProviders({ payload }) {
  try {
    const { id, name, fileID, email } = payload;

    yield call(api.put, `provider/${id}`, {
      avatar_id: fileID || null,
      name,
      email,
    });

    yield put(providerSuccess());
    history.push('/providers');
  } catch (e) {
    if (e.response.data.error) {
      toast.error(`Couldn't edit provider! ${e.response.data.error}`);
    } else {
      toast.error(`Couldn't edit provider!`);
    }
    yield put(providerFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@provider/DELETE_REQUEST', deleteProviders),
  takeLatest('@provider/REQUEST', loadProviders),
  takeLatest('@provider/REGISTER_REQUEST', registerProviders),
  takeLatest('@provider/EDIT_REQUEST', editProviders),
]);
