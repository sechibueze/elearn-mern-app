import { SET_ALERT, CLEAR_ALERT } from '../_actions/types';
const initialState = {
  alertBucket: []
};
export default function(state = initialState, action){
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return {...state,
        alertBucket: state.alertBucket.concat([payload])
      }
    case CLEAR_ALERT:
      return {
        ...state,
        alertBucket: payload ? state.alertBucket.filter(alert => alert.alertId !== payload) : []
      };
    default:
      return state;
  }
}