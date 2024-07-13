import {
  SET_MODAL,
  CLEAR_MODAL,
} from './actionTypes';

export const setModal = ({ type, props, triggeringElement }) => ({
  type: SET_MODAL,
  payload: {
    type,
    props,
    triggeringElement
  },
});

export const clearModal = () => ({
  type: CLEAR_MODAL,
});
