export function fileUploadRequest(file) {
  return {
    type: '@file/REQUEST',
    payload: { file },
  };
}

export function fileUploadSuccess(file) {
  return {
    type: '@file/SUCCESS',
    payload: { file },
  };
}

export function fileUploadFailure() {
  return {
    type: '@file/FAILURE',
  };
}
