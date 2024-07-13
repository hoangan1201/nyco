import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_PAGE,
  PAGES_API_REQUEST,
  PAGES_API_SUCCESS,
  PAGES_API_FAILURE,
} from './actionTypes';

const addPage = ({ path, data }) => ({
  type: ADD_PAGE,
  payload: { path, data },
});

const pagesRequest = () => ({
  type: PAGES_API_REQUEST,
});

const pagesApiSuccess = () => ({
  type: PAGES_API_SUCCESS,
});

const pagesApiFailure = ({ error }) => ({
  type: PAGES_API_FAILURE,
  error,
});

export const getPage = ({ path }) => (dispatch) => {
  dispatch(pagesRequest());

  const csrftoken = getCookie('csrftoken');

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url: `/api/v1/${path}/`,
  }).then(({ data }) => {
    dispatch(addPage({
      path,
      data,
    }));
    dispatch(pagesApiSuccess());
  }).catch((error) => {
    dispatch(pagesApiFailure({ error }));
  });
};

export default getPage;
