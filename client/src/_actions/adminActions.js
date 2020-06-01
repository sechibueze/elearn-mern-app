import axios from 'axios';

import { getConfigHeaders } from './authActions';
import { handleResponseErrors } from './alertActions';
import {
  LOAD_USERS,
  MANAGE_USER_AUTH
} from './types';

export const manageUserAuth = (userId, actionType) => dispatch => {
  const config = getConfigHeaders();
  const body = {
    action: {
      type: actionType
    }
  }
  axios.put(`/api/users/${ userId }`, body, config)
    .then(({ data }) => {
      dispatch({
        type: MANAGE_USER_AUTH,
        payload: data.data
      })
    })
    .catch(err => {
      dispatch(handleResponseErrors(err))
    })
};

export const loadUsers = () => dispatch => {
  const config = getConfigHeaders();
  axios.get('/api/users', config)
    .then(({ data }) => {
      dispatch({
        type: LOAD_USERS,
        payload: data.data
      })
    })
    .catch(err => {
      dispatch(handleResponseErrors(err))
    })
};