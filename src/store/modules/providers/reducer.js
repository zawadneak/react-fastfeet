import { produce } from 'immer';

const INITIAL_STATE = {
  providers: [],
  loading: false,
};
export default function provider(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@provider/REQUEST': {
        draft.loading = true;
        console.log(draft.providers);
        break;
      }
      case '@provider/SUCCESS': {
        draft.providers = action.payload.providers;
        draft.providers.map(item => {
          item.visible = false;
          item.nullImageString = item.name.charAt(0);
        });
        draft.loading = false;
        break;
      }
      case '@provider/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@provider/DELETE_SUCCESS': {
        const { id } = action.payload;

        const index = draft.providers.findIndex(item => item.id === id);

        if (index >= 0) {
          draft.providers.splice(index, 1);
        }

        draft.loading = false;
        break;
      }
      case '@provider/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
