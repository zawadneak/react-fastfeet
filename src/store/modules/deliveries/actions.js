export function deliveryRequest(query, page) {
  return {
    type: '@delivery/REQUEST',
    payload: { query, page },
  };
}

export function deliverySuccess(deliveries) {
  return {
    type: '@delivery/SUCCESS',
    payload: { deliveries },
  };
}

export function deliveryFailure() {
  return {
    type: '@delivery/FAILURE',
  };
}

export function deliveryDeleteRequest(id) {
  return {
    type: '@delivery/DELETE_REQUEST',
    payload: { id },
  };
}

export function deliveryDeleteSuccess(id) {
  return {
    type: '@delivery/DELETE_SUCCESS',
    payload: { id },
  };
}

export function deliveryDeleteFailure() {
  return {
    type: '@delivery/DELETE_FAILURE',
  };
}

export function deliveryEditRequest(id) {
  return {
    type: '@delivery/EDIT_REQUEST',
    payload: { id },
  };
}

export function deliveryEditSuccess(id) {
  return {
    type: '@delivery/EDIT_SUCCESS',
    payload: { id },
  };
}

export function deliveryEditFailure() {
  return {
    type: '@delivery/EDIT_FAILURE',
  };
}
