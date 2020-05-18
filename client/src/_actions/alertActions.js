import { v4 } from 'uuid';
import { SET_ALERT, CLEAR_ALERT } from './types';


export const setAlert = (alertText, type = 'danger', alertId = v4() ,  timeout=3000 ) => dispatch => {
  
  dispatch({
    type: SET_ALERT,
    payload: { alertText, alertId, type }
  });

  setTimeout(() => (dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  })), timeout)
}
 
export const clearAlert = (alertId = null) => dispatch => {
  dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  });
};

export const handleResponseErrors = (err, type = 'danger') => dispatch => {
  if (err.response.status === 422) {
    err.response.data.errors.map(e => (
      dispatch({
        type: SET_ALERT,
        payload: {
          alertId: v4(),
          alertText: e,
          type: type
        }
      })
    ))
  }

  if (err.response.status !== 422 && err.response.data.error) {
    dispatch({
      type: SET_ALERT,
      payload: {
        alertId: v4(),
        alertText: err.response.data.error,
        type: type
      }
    })
  }
};