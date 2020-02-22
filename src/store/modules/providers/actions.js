export function providerRequest(query, page) {
  return {
    type: '@provider/REQUEST',
    payload: { query, page },
  };
}

export function providerSuccess(providers) {
  return {
    type: '@provider/SUCCESS',
    payload: { providers },
  };
}

export function providerDeleteRequest(id) {
  return {
    type: '@provider/DELETE_REQUEST',
    payload: { id },
  };
}

export function providerDeleteSuccess(id) {
  return {
    type: '@provider/DELETE_SUCCESS',
    payload: { id },
  };
}
export function providerFailure() {
  return {
    type: '@provider/FAILURE',
  };
}
