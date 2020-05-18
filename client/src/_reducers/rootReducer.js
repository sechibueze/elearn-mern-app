import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import courseReducer from './courseReducer';
export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  courses: courseReducer
  
})
