import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};
export default function provider(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@provider/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@provider/SUCCESS': {
        if (action.payload.providers) {
          draft.data = action.payload.providers;
          draft.data.map(item => {
            item.visible = false;
            item.nullImageString = item.name.charAt(0);
          });
        }
        draft.loading = false;
        break;
      }
      case '@provider/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@provider/DELETE_SUCCESS': {
        const { id } = action.payload;

        const index = draft.data.findIndex(item => item.id === id);

        if (index >= 0) {
          draft.data.splice(index, 1);
        }

        draft.loading = false;
        break;
      }
      case '@provider/FAILURE': {
        draft.loading = false;
        break;
      }
      case '@provider/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
