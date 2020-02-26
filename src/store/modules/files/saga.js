import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { fileUploadSuccess, fileUploadFailure } from './actions';
import api from '~/services/api';

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* uploadFile({ payload }) {
  try {
    const { file } = payload;

    const formData = new FormData();
    formData.append('file', file);

    const response = yield call(api.post, 'files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);

    yield put(fileUploadSuccess(response.data));
  } catch (e) {
    toast.error("Couldn't upload file!");
    console.log(e);
    yield put(fileUploadFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@file/REQUEST', uploadFile),
]);
