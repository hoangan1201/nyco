import {
  ADD_DATA_STORIES,
  DATA_STORIES_API_REQUEST,
  DATA_STORIES_API_SUCCESS,
  DATA_STORIES_API_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  errors: [],
  isFetching: true,
};

export default function dataStories(state = initialState, action) {
  switch (action.type) {
    case ADD_DATA_STORIES: {
      const { data } = action.payload;
      return {
        ...state,
        items: data,
        isFetching: false,
        error: [],
      };
    }
    case DATA_STORIES_API_REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: [],
      };
    case DATA_STORIES_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: [],
      };
    case DATA_STORIES_API_FAILURE: {
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
