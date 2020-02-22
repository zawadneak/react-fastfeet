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

export function recipientEditRequest(id) {
  return {
    type: '@recipient/EDIT_REQUEST',
    payload: { id },
  };
}

export function recipientEditSuccess(id) {
  return {
    type: '@recipient/EDIT_SUCCESS',
    payload: { id },
  };
}

export function recipientEditFailure() {
  return {
    type: '@recipient/EDIT_FAILURE',
  };
}
