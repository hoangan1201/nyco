import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_DATA_STORIES,
  DATA_STORIES_API_REQUEST,
  DATA_STORIES_API_SUCCESS,
  DATA_STORIES_API_FAILURE,
} from './actionTypes';

const addDataStories = ({ data }) => ({
  type: ADD_DATA_STORIES,
  payload: { data },
});

const pagesRequest = () => ({
  type: DATA_STORIES_API_REQUEST,
});

const pagesApiSuccess = () => ({
  type: DATA_STORIES_API_SUCCESS,
});

const pagesApiFailure = ({ error }) => ({
  type: DATA_STORIES_API_FAILURE,
  error,
});

export const getDataStories = ({ locale }) => (dispatch) => {
  dispatch(pagesRequest());

  const csrftoken = getCookie('csrftoken');

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url: `/${locale}/api/v1/data-stories/`,
  }).then(({ data }) => {    
    dispatch(addDataStories({
      data,
    }));
    dispatch(pagesApiSuccess());
  }).catch((error) => {
    dispatch(pagesApiFailure({ error }));
  });
};

export default getDataStories;
