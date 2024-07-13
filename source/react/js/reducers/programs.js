import {
  ADD_PROGRAMS,
  PROGRAMS_API_REQUEST,
  PROGRAMS_API_SUCCESS,
  PROGRAMS_API_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  locations: [],
  locationDescriptions: [],
  errors: [],
  isFetching: true,
  introduction: "This map shows New York City PUMAs shaded by 2017 unemployment rate. PUMAs, or Public Use Microdata Areas, are geographic areas used by US Census for aggregating statistical and demographic information. PUMAs each contain at least 100,000 people. In New York City they roughly match up to Community Districts. Unemployment rates shown on this map represent a 2017 five-year estimate from the US Census American Community Survey. Darker greens represent higher unemployment rates. Hover over an area on the map to see the neighborhoods that compose that PUMA and the estimated percentage of unemployed persons for that PUMA.",
};

export default function programs(state = initialState, action) {
  switch (action.type) {
    case ADD_PROGRAMS: {
      const { data } = action.payload;
      const newState = {
        ...state,
        items: data,
        locations: data.map(program => program.location.map((location) => {
          const { contact } = program;
          const programLink = program.program_link;
          const filters = program.filter_categories;
          return ({
            ...location, contact, programLink, filters,
          });
        })),
        locationDescriptions: data.map(({ name, description }) => ({ name, description })),
        isFetching: false,
        error: [],
      };
      return newState;
    }
    case PROGRAMS_API_REQUEST:
      return {
        ...state,
        isFetching: true,
        errors: [],
      };
    case PROGRAMS_API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: [],
      };
    case PROGRAMS_API_FAILURE: {
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
