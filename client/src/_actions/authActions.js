import axios from 'axios';

import { handleResponseErrors } from './alertActions';
import { 
  SET_ALERT, 
  LOADING, 
  LOADED, 
  LOGIN_SUCCESS,
  LOAD_CURRENT_USER,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL
} from './types';

export const getConfigHeaders = () => {
  let configHeaders = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const token = localStorage.getItem('token');
  if (token) {
    configHeaders.headers['x-auth-token'] = token;
  }
  return configHeaders;
};
export const loadCurrentUser = () => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.get('/api/auth', configHeaders)
    .then(({data}) => {
      dispatch({
        type: LOAD_CURRENT_USER,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'AUTH_FAIL'));
      dispatch({ type: LOADED });
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
      dispatch(handleResponseErrors(err, 'SIGNUP_FAIL'));
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
      dispatch(handleResponseErrors(err));
      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: LOADED });
    })
}

export const logout = () => dispatch => dispatch({type: LOGOUT});

