import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_DATA_STORY,
  DATA_STORY_API_REQUEST,
  DATA_STORY_API_SUCCESS,
  DATA_STORY_API_FAILURE,
} from './actionTypes';

const addDataStory = ({ slug, data }) => ({
  type: ADD_DATA_STORY,
  payload: { slug, data },
});

const dataStoryRequest = () => ({
  type: DATA_STORY_API_REQUEST,
});

const dataStoryApiSuccess = () => ({
  type: DATA_STORY_API_SUCCESS,
});

const dataStoryApiFailure = ({ error }) => ({
  type: DATA_STORY_API_FAILURE,
  error,
});

export const getPageData = ({ slug, locale }) => (dispatch) => {
  dispatch(dataStoryRequest());

  const csrftoken = getCookie('csrftoken');

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url: `/${locale}/api/v1/data-stories/${slug}/`,
  }).then(({ data }) => {
    dispatch(addDataStory({
      slug,
      data,
    }));
    dispatch(dataStoryApiSuccess());
  }).catch((error) => {
    dispatch(dataStoryApiFailure({ error }));
  });
};

export default getPageData;
