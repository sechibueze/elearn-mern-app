import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import courseReducer from './courseReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';
import adminReducer from './adminReducer';
export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  courses: courseReducer,
  category: categoryReducer,
  cart: cartReducer,
  admin: adminReducer
  
});
