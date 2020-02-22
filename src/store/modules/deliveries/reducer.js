import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};
export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@delivery/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@delivery/SUCCESS': {
        draft.data = action.payload.deliveries;
        draft.data.map(item => {
          item.visible = false;
          item.nullImageString = !item.provider
            ? ' '
            : item.provider.name.charAt(0);
          if (!item.start_date) {
            item.status = 'PENDING';
            item.statusColor = '#F0F0DF';
          } else if (!item.end_date) {
            item.status = 'PICKED UP';
            item.statusColor = '#BAD2FF';
          } else if (!item.canceled_at) {
            item.status = 'DELIVERED';
            item.statusColor = '#dff0df';
          }
          if (item.canceled_at !== null) {
            item.status = 'CANCELED';
            item.statusColor = '#FAB0B0';
          }
        });
        draft.loading = false;
        break;
      }
      case '@delivery/FAILURE': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@delivery/DELETE_SUCCESS': {
        const { id } = action.payload;

        const index = draft.data.findIndex(item => item.id === id);
        console.log(index);

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
