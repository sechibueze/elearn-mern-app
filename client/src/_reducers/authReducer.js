import { 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  LOADED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  LOAD_CURRENT_USER
} from '../_actions/types';

const initialState = {
  token: null,
  isAuthenticated: null,
  currentUser: null,
  loading: false
};

export default function(state = initialState, action){
  const { type, payload} = action;
  switch(type){
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true
      };
    case LOAD_CURRENT_USER: 
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        currentUser: null
      };
    case LOADING:
      return {...state, loading: true};
    case LOADED:
      return {...state, loading: false};
    default:
      return state;
  }
};