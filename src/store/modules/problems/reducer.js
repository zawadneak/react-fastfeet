import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};
export default function problems(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@problem/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@problem/SUCCESS': {
        draft.data = action.payload.problems;
        draft.loading = false;
        break;
      }
      case '@problem/FAILURE': {
        draft.loading = false;
        break;
      }
      case '@problem/CANCEL_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@problem/CANCEL_SUCCESS': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
