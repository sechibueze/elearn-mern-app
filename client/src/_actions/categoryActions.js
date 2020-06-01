import axios from 'axios';
import { LOADING, LOADED, 
  LOAD_CATEGORY, 
  GET_CATEGORY_BY_ID,
  LOAD_CATEGORY_COURSELIST,
   CREATE_CATEGORY, 
   UPDATE_CATEGORY, 
   DELETE_CATEGORY } from './types';
import { getConfigHeaders } from './authActions';
import { handleResponseErrors } from './alertActions';

export const createCategory = (categoryFormData) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.post('/api/category', categoryFormData, config )
    .then(({ data }) => {
      console.log('new cats', data)
      dispatch({
        type: CREATE_CATEGORY,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'CATEGORY_ALERT');
      dispatch({ type: LOADED });
    });
};

export const updateCategory = (categoryId, categoryData, history = '') => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders('multipart/form-data');
  //['headers']['Content-Type'] = 'multipart/form-data';
  console.log('upd content typ', config)
  axios.put(`/api/category/${ categoryId }`,  categoryData, config)
    .then(({ data }) => {
      console.log('upd cats', data)
      dispatch({
        type: UPDATE_CATEGORY,
        payload: data.data
      });
      dispatch({ type: LOADED });

      if (history) {
        history.push('/category-items');
      }
    })
    .catch(err => {
      handleResponseErrors(err, 'CATEGORY_ALERT');
      dispatch({ type: LOADED });
    });
};

export const deleteCategory = (categoryId) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.delete(`/api/category/${categoryId}`, config)
    .then(({ data }) => {
      console.log('del cats', data)
      dispatch({
        type: DELETE_CATEGORY,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'CATEGORY_ALERT');
      dispatch({ type: LOADED });
    });
};

export const loadCategoryById = categoryId => dispatch => {
  dispatch({ type: LOADING });

  axios.get(`/api/category/${ categoryId }`)
    .then(({ data }) => {
      console.log('cats by id', data)
      dispatch({
        type: GET_CATEGORY_BY_ID,
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

export const loadCategoryCourseList = categoryId => dispatch => {
  dispatch({ type: LOADING });

  let options = {
    params : {
      categoryId: categoryId,
      published: true
    }
  }
  console.log('course cat id', categoryId)
  axios.get(`/api/courses`, options)
    .then(({ data }) => {
      console.log('course cat', data)
      dispatch({
        type: LOAD_CATEGORY_COURSELIST,
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