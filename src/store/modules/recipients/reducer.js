import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};
export default function recipients(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipient/SUCCESS': {
        draft.data = action.payload.recipients;
        draft.data.map(item => {
          item.address = `${item.street} ${item.number} ${item.complement ||
            ''}- ${item.city},${item.state}`;
        });
        console.log(draft);
        draft.loading = false;
        break;
      }
      case '@recipient/FAILURE': {
        draft.loading = false;
        break;
      }
      case '@recipient/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipient/DELETE_SUCCESS': {
        const { id } = action.payload;

        const index = draft.data.findIndex(item => item.id === id);
        if (index >= 0) {
          draft.data.splice(index, 1);
        }

        draft.loading = false;
        break;
      }
      default:
    }
  });
}
