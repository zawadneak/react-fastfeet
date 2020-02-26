import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};
export default function provider(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@file/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@file/SUCCESS': {
        draft.data = action.payload.file;
        draft.loading = false;
        break;
      }
      case '@file/FAILURE': {
        draft.loading = false;
        break;
      }
      case '@provider/SUCCESS': {
        draft.data = [];
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
