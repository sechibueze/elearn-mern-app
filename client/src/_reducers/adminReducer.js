import {
  LOAD_USERS,
  MANAGE_USER_AUTH
} from '../_actions/types';

const initialState = {
  users: null,
  userAuth: null
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USERS:
      return {
        ...state,
        users: payload
      };
    case MANAGE_USER_AUTH:
      return {
        ...state,
        userAuth: payload
      };
    
    default:
      return state;
  }
}