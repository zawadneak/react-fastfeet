export function problemRequest(query, page) {
  return {
    type: '@problem/REQUEST',
    payload: { query, page },
  };
}

export function problemSuccess(problems) {
  return {
    type: '@problem/SUCCESS',
    payload: { problems },
  };
}

export function problemFailure() {
  return {
    type: '@problem/FAILURE',
  };
}

export function problemCancelRequest(id) {
  return {
    type: '@problem/CANCEL_REQUEST',
    payload: { id },
  };
}

export function problemCancelSuccess(id) {
  return {
    type: '@problem/CANCEL_SUCCESS',
    payload: { id },
  };
}
