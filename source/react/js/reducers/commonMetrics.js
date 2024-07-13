import {
  ADD_COMMON_METRICS,
  RESET_COMMON_METRICS,
  COMMON_METRICS_API_REQUEST,
  COMMON_METRICS_API_SUCCESS,
  COMMON_METRICS_API_FAILURE,
  ADD_MARQUEE_NUMBER,
  MARQUEE_NUMBER_API_REQUEST,
  MARQUEE_NUMBER_API_SUCCESS,
  MARQUEE_NUMBER_API_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  items: {
    common_metric_menu_items: [],
    agency_program_data: {},
    common_metric: null,
    page_info: {},
    marqueeNumber: null
  },
  errors: [],
  isFetching: true,
  marqueeRequest: null
};

export default function commonMetrics(state = initialState, action) {
  switch (action.type) {
    case ADD_MARQUEE_NUMBER: {
      const { data, requestTimestamp } = action.payload;
      const { count } = data;

      // Preventing race condition
      if (requestTimestamp == state.marqueeRequest?.requestTimestamp) {
        return {
          ...state,
          items: {
            ...state.items,
            common_metric: {
              ...state.items.common_metric,
              marqueeNumber: count,
            },
          },
          error: [],
        }
      }
      return state;
    }
    case ADD_COMMON_METRICS: {
      const { data } = action.payload;
      return {
        ...state,
        items: data,
        isFetching: false,
        error: [],
      };
    }
    case RESET_COMMON_METRICS: {
      return {
        ...state,
        items: {
          ...state.items,
          common_metric: null,
          marqueeNumber: null
        }
      };
    }
    case COMMON_METRICS_API_REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: [],
      };
    case COMMON_METRICS_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: [],
      };
    case COMMON_METRICS_API_FAILURE: {
      const { errors } = action;

      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    
    case MARQUEE_NUMBER_API_REQUEST: {
      const { requestTimestamp } = action.payload;
      
      return {
        ...state,
        errors: [],
        marqueeRequest: {
          requestTimestamp
        },
      };
    }

    case MARQUEE_NUMBER_API_SUCCESS: {
      const { requestTimestamp } = action.payload;
      
      if (requestTimestamp == state.marqueeRequest?.requestTimestamp) {
        return {
          ...state,
          errors: [],
          marqueeRequest: null,
        };
      }
      return state;
    }

    case MARQUEE_NUMBER_API_FAILURE: {
      const { error } = action;

      return {
        ...state,
        marqueeRequest: null,
        error,
      };
    }
    default:
      return state;
  }
}
