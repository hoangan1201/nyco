import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_COMMON_METRICS,
  COMMON_METRICS_API_REQUEST,
  COMMON_METRICS_API_SUCCESS,
  COMMON_METRICS_API_FAILURE,
  ADD_MARQUEE_NUMBER,
  MARQUEE_NUMBER_API_REQUEST,
  MARQUEE_NUMBER_API_SUCCESS,
  MARQUEE_NUMBER_API_FAILURE,
  RESET_COMMON_METRICS,
} from './actionTypes';

const addCommonMetrics = ({ data, requestTimestamp }) => ({
  type: ADD_COMMON_METRICS,
  payload: { data, requestTimestamp },
});

export const resetCommonMetrics = () => ({
  type: RESET_COMMON_METRICS
});

const commonMetricsApiRequest = () => ({
  type: COMMON_METRICS_API_REQUEST,
});

const commonMetricsApiSuccess = () => ({
  type: COMMON_METRICS_API_SUCCESS,
});

const commonMetricsApiFailure = ({ error }) => ({
  type: COMMON_METRICS_API_FAILURE,
  error,
});

const addMarqueeNumber = ({ data, requestTimestamp }) => ({
  type: ADD_MARQUEE_NUMBER,
  payload: { data, requestTimestamp },
});

const marqueeNumberApiRequest = ({ requestTimestamp }) => ({
  type: MARQUEE_NUMBER_API_REQUEST,
  payload: { requestTimestamp }
});

const marqueeNumberApiSuccess = ({ requestTimestamp }) => ({
  type: MARQUEE_NUMBER_API_SUCCESS,
  payload: { requestTimestamp }
});

const marqueeNumberApiFailure = ({ error }) => ({
  type: MARQUEE_NUMBER_API_FAILURE,
  error,
});

export const getCommonMetrics = ({ lang, slug, ignoreMarqueeNumber = false }) => (dispatch) => {
  const csrftoken = getCookie('csrftoken');
  const url = slug
    ? `/${lang}/api/v1/common-metrics/${slug}/`
    : `/${lang}/api/v1/common-metrics/`;

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url,
  }).then(({ data }) => {
    if (ignoreMarqueeNumber) {
      data.common_metric.marqueeNumber = null;
    }

    dispatch(addCommonMetrics({
      data, 
    }));
    
    dispatch(commonMetricsApiSuccess());

    return data;
  }).catch((error) => {
    dispatch(commonMetricsApiFailure({ error }));
  });
};


export const getMarqueeNumber = ({ metric, lang, programs = [], years =[], quarterYears = [] }) => (dispatch) => {
  const requestTimestamp = Date.now();
  dispatch(marqueeNumberApiRequest({ requestTimestamp }));

  const csrftoken = getCookie('csrftoken');
  const url = `/en/api/v1/marquee/`;

  return axios({
    method: 'GET',
    withCredentials: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
    url,
  params: {metric: metric, programs: programs, years: years, quarterYears: quarterYears},
  }).then(({ data }) => {
    dispatch(addMarqueeNumber({
      data, requestTimestamp
    }));
    dispatch(marqueeNumberApiSuccess({ requestTimestamp }));

    return data;
  }).catch((error) => {
    dispatch(marqueeNumberApiFailure({ error }));
  });
};

export default getCommonMetrics;
