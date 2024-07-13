import {
    SUBSCRIBE_REQUEST,
    SUBSCRIBE_SUCCESS,
    SUBSCRIBE_FAILED,
    SUBSCRIBE_EMAIL,
  } from '../actions/actionTypes';
  
  const initialState = {
    email: '',
    isFetching: false,
    mailChimpStg: '',
    errors: []
  };

  export default function subscribe(state = initialState, action) {
    switch (action.type) {
        case SUBSCRIBE_EMAIL: {
          const { email } = action;
          return {
            ...state,
            email: email.email,
            errors: [],
          };
        }
        case SUBSCRIBE_REQUEST: {
          return {
            ...state,
            isFetching: true
          }
        }
        case SUBSCRIBE_SUCCESS: {
          const { payload } = action;
          if (payload.data.response.detail) {
            const email = payload.data.response.detail.split(' ')[0]
            return {
              ...state,
              isFetching: false,
              mailChimpStg: '',
              errors: [`${email} is already subscribed. If you haven't yet received a confirmation email, please check your SPAM folder.`],
            };
          } else if (payload.data.response.email_address) {
            const successMessage = "Almost finished... We need to confirm your email address. To complete the subscription process please click the link in your email we just sent you."
            return {
              ...state,
              isFetching: false,
              mailChimpStg: successMessage,
              errors: [],
            };
          }
        }
        case SUBSCRIBE_FAILED: {
          const { payload } = action;
          return {
            ...state,
            isFetching: false,
            errors: ['Something went wrong. If the problem persists, please get in touch with us.']
          };
        }
    default: return state;
    }
  }
