import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_PROGRAMS,
  PROGRAMS_API_REQUEST,
  PROGRAMS_API_SUCCESS,
  PROGRAMS_API_FAILURE,
} from './actionTypes';

const addPrograms = ({ slug, data }) => ({
  type: ADD_PROGRAMS,
  payload: { slug, data },
});

const programsRequest = () => ({
  type: PROGRAMS_API_REQUEST,
});

const programsApiSuccess = () => ({
  type: PROGRAMS_API_SUCCESS,
});

const programsApiFailure = ({ error }) => ({
  type: PROGRAMS_API_FAILURE,
  error,
});

export const getPrograms = ({ locale }) => (dispatch) => {
  dispatch(programsRequest());

  const csrftoken = getCookie('csrftoken');

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url: `/${locale}/api/v1/programs/`,
  }).then(({ data }) => {
    dispatch(addPrograms({
      data,
    }));
    dispatch(programsApiSuccess());
  }).catch((error) => {
    dispatch(programsApiFailure({ error }));
  });
};

export default getPrograms;
