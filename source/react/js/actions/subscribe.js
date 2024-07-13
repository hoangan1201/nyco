import axios from 'axios';
import { getCookie } from '../utils/misc';
import { focusOnAlertFields } from '../utils/accessibility';

import {
    SUBSCRIBE_SUCCESS,
    SUBSCRIBE_REQUEST,
    SUBSCRIBE_FAILED,
    SUBSCRIBE_EMAIL,
  } from './actionTypes';


const subscribeRequest = () => ({
    type: SUBSCRIBE_REQUEST,
  });

const subscribeSuccess = ({ data }) => ({
  type: SUBSCRIBE_SUCCESS,
  payload: { data }
});

const subscribeFailed = ({ errors }) => ({
    type: SUBSCRIBE_FAILED,
    payload: { errors }
  });

const emailCollect = ({ email }) => ({
  type: SUBSCRIBE_EMAIL,
  email: { email }
});

export const subscribeEmail = ({ email }) => (dispatch) => {
  dispatch(emailCollect({ email }));
} 

export const subscribe = ({ email, organization, industry, otherIndustry }) => (dispatch) => {
    dispatch(subscribeRequest());

    const requestData = {
      email_address: email,
      status: 'pending',
      merge_fields: {
        MMERGE1: organization,
        MMERGE8: industry,
        MMERGE7: otherIndustry,
      }
    };

    const csrftoken = getCookie('csrftoken');
    const url = `/en/api/v1/mailchimp/`;
  
    axios({
      method: 'GET',
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-CSRFToken': csrftoken,
      },
      url,
      params: {
        data: requestData
      },
    }).then(({ data }) => {
      dispatch(subscribeSuccess({ data }));
      focusOnAlertFields();
    }).catch(errors => {
      dispatch(subscribeFailed({ errors }));
      focusOnAlertFields();
    });
  };