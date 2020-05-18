import axios from 'axios';
import { LOADING, LOADED, LOAD_CATEGORY } from './types';
import { getConfigHeaders } from './authActions';
import { handleResponseErrors } from './alertActions';

export const loadCategory = () => dispatch => {
  dispatch({ type: LOADING });

  axios.get('/api/category')
    .then(({ data }) => {
      console.log('cats', data)
      dispatch({
        type: LOAD_CATEGORY,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'CATEGORY_ALERT');
      dispatch({ type: LOADED });
    });
};