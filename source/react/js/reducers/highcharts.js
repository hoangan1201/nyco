import {
  MAP_ADDED,
  SANKEY_ADDED,
  CHART_EXPORT_API_REQUEST,
  CHART_EXPORT_API_SUCCESS,
  CHART_EXPORT_API_FAILURE
} from '../actions/actionTypes';

const initialState = {
  mapPresent: false,
  sankeyPresent: false,
  isExporting: false
};

export default function highcharts(state = initialState, action) {
  switch (action.type) {
    case MAP_ADDED: {
      return {
        ...state,
        mapPresent: true,
      };
    }
    case SANKEY_ADDED:
      return {
        ...state,
        sankeyPresent: true,
      };
    case CHART_EXPORT_API_REQUEST: {
      return {
        ...state,
        isExporting: true
      }
    }
    case CHART_EXPORT_API_SUCCESS: {
      return {
        ...state,
        isExporting: false
      };
    }
    case CHART_EXPORT_API_FAILURE: {
      return {
        ...state,
        isExporting: false,
        errors: ['Something went wrong. If the problem persists, please get in touch with us.']
      };
    }
    default:
      return state;
  }
}
