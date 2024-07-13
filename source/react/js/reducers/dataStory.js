import {
  ADD_DATA_STORY,
  DATA_STORY_API_REQUEST,
  DATA_STORY_API_SUCCESS,
  DATA_STORY_API_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  items: {},
  errors: [],
  isFetching: true,
};

export default function dataStory(state = initialState, action) {
  switch (action.type) {
    case ADD_DATA_STORY: {
      const { slug, data } = action.payload;
      const newState = {
        ...state,
        items: {
          ...state.items,
          [slug]: data,
        },
        isFetching: false,
        errors: [],
      };
      return newState;
    }
    case DATA_STORY_API_REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: [],
      };
    case DATA_STORY_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: [],
      };
    case DATA_STORY_API_FAILURE: {
      const { errors } = action;

      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    default:
      return state;
  }
}
