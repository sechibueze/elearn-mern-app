import axios from 'axios';

import { handleResponseErrors, setAlert } from './alertActions';
import {
  LOADING, 
  LOADED, 

  LOGIN_SUCCESS,
  LOGIN_FAIL,

  SIGNUP_SUCCESS,
  SIGNUP_FAIL,

  LOAD_CURRENT_USER,
  AUTH_ERROR,
  LOGOUT
} from './types';

// Sets the config headers for HTTP requests
export const getConfigHeaders = (type = "application/json") => {
  let configHeaders = {
    headers: {
      "Content-Type": type 
    }
  }
  const token = localStorage.getItem('token');
  if (token) {
    configHeaders.headers['x-auth-token'] = token;
  }
  return configHeaders;
};

export const loadCurrentUser = () => dispatch => {
  // dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.get('/api/auth', configHeaders)
    .then(({data}) => {
      dispatch({
        type: LOAD_CURRENT_USER,
        payload: data.data
      });
      // dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, AUTH_ERROR) 
      // dispatch({ type: LOADED });
    })
};

export const signup = userData => dispatch => {
  dispatch({type: LOADING});
  const configHeaders = getConfigHeaders();
  const body = JSON.stringify(userData);
  axios.post('/api/signup', body, configHeaders)
    .then(({data}) => {
      const { token } = data;
      localStorage.setItem('token', token);
      dispatch(loadCurrentUser());
      dispatch({ type: SIGNUP_SUCCESS});
      dispatch({ type: LOADED});
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, SIGNUP_FAIL));
      dispatch({ type: SIGNUP_FAIL });
      dispatch({ type: LOADED });
    });
};
export const login = userData => dispatch => { 
  dispatch({type: LOADING});
  const body = JSON.stringify(userData);
  const configHeaders = getConfigHeaders()
  axios.post('/api/login', body, configHeaders)
    .then(({ data }) => {
      // Put token in localStrorage
      const { token } = data;
      localStorage.setItem('token', token);
      // load current user
      dispatch(loadCurrentUser());
      // Update state
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, LOGIN_FAIL));
      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: LOADED });
    })
}
export const toggleAdminAuth = data => dispatch => { 
  dispatch({type: LOADING});
  const body = JSON.stringify(data);
  const configHeaders = getConfigHeaders()
  axios.put('/api/users/admin/toggle', body, configHeaders)
    .then(({ data }) => {
      // Update state
      dispatch(setAlert("User role updated successfully", 'TOGGLE_ADMIN_AUTH', 'success'));
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'TOGGLE_ADMIN_AUTH_ERROR'));
      dispatch({ type: LOADED });
    })
}

export const logout = () => dispatch => dispatch({type: LOGOUT});

