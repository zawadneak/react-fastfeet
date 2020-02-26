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

export function deliveryEditRequest({
  id,
  product,
  recipient_id,
  provider_id,
}) {
  return {
    type: '@delivery/EDIT_REQUEST',
    payload: { product, recipient_id, provider_id, id },
  };
}

export function deliveryRegisterRequest({
  product,
  recipient_id,
  provider_id,
}) {
  return {
    type: '@delivery/REGISTER_REQUEST',
    payload: { product, recipient_id, provider_id },
  };
}
