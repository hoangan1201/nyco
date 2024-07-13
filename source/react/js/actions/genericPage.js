import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_GENERIC_PAGE,
  GENERIC_PAGE_API_REQUEST,
  GENERIC_PAGE_API_SUCCESS,
  GENERIC_PAGE_API_FAILURE,
} from './actionTypes';

const addGenericPage = ({ data }) => ({
  type: ADD_GENERIC_PAGE,
  payload: { data },
});

const genericPageApiRequest = () => ({
  type: GENERIC_PAGE_API_REQUEST,
});

const genericPageApiSuccess = () => ({
  type: GENERIC_PAGE_API_SUCCESS,
});

const genericPageApiFailure = ({ error }) => ({
  type: GENERIC_PAGE_API_FAILURE,
  error,
});

export const getGenericPage = ({ slug, lang }) => (dispatch) => {
  dispatch(genericPageApiRequest());

  const csrftoken = getCookie('csrftoken');

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url: `/${lang}/api/v1/pages/${slug}/`,
  }).then(({ data }) => {
    data.title = data.translations[lang].title;
    dispatch(addGenericPage({
      data,
    }));
    dispatch(genericPageApiSuccess());

    return data;
  }).catch((error) => {
    dispatch(genericPageApiFailure({ error }));
  });
};

export default getGenericPage;
