export function recipientRequest(query, page) {
  return {
    type: '@recipient/REQUEST',
    payload: { query, page },
  };
}

export function recipientSuccess(recipients) {
  return {
    type: '@recipient/SUCCESS',
    payload: { recipients },
  };
}

export function recipientFailure() {
  return {
    type: '@recipient/FAILURE',
  };
}

export function recipientDeleteRequest(id) {
  return {
    type: '@recipient/DELETE_REQUEST',
    payload: { id },
  };
}

export function recipientDeleteSuccess(id) {
  return {
    type: '@recipient/DELETE_SUCCESS',
    payload: { id },
  };
}

export function recipientDeleteFailure() {
  return {
    type: '@recipient/DELETE_FAILURE',
  };
}

export function recipientEditRequest(id, data) {
  return {
    type: '@recipient/EDIT_REQUEST',
    payload: { id, data },
  };
}

export function recipientRegisterRequest(data) {
  return {
    type: '@recipient/REGISTER_REQUEST',
    payload: { data },
  };
}
