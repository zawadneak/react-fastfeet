export function providerRequest(query, page, limit) {
  return {
    type: '@provider/REQUEST',
    payload: { query, page, limit },
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

export function providerRegisterRequest(name, email, fileID) {
  return {
    type: '@provider/REGISTER_REQUEST',
    payload: { name, email, fileID },
  };
}

export function providerEditRequest(id, name, email, fileID) {
  return {
    type: '@provider/EDIT_REQUEST',
    payload: { id, name, email, fileID },
  };
}
