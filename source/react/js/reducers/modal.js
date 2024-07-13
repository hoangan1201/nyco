import {
  SET_MODAL,
  CLEAR_MODAL,
} from '../actions/actionTypes';

const initialState = {
  type: null,
  isDismissed: {},
  props: {},
  triggeringElement: null
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL: {
      const {
        type,
        props,
        triggeringElement
      } = action.payload;

      return {
        ...state,
        type,
        props,
        triggeringElement
      };
    }
    case CLEAR_MODAL:
      // Focus back on the modal-triggering element for screen readers
      if (state.triggeringElement) {
        state.triggeringElement.focus()
      }

      return {
        ...initialState,
        isDismissed: state.isDismissed,
      };
    default:
      return state;
  }
}
