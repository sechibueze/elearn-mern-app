import axios from 'axios';
import { 
  baseUrl,
  LOADING, LOADED, 
  LOAD_CATEGORY, 
  GET_CATEGORY_BY_ID,
  LOAD_CATEGORY_COURSELIST,
   CREATE_CATEGORY, 
   UPDATE_CATEGORY, 
   CLEAR_CATEGORY_DATA,
   DELETE_CATEGORY } from './types';
import { getConfigHeaders } from './authActions';
import { handleResponseErrors, setAlert } from './alertActions';

export const createCategory = (categoryFormData) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.post(`${baseUrl}/api/category`, categoryFormData, config)
    .then(({ data }) => {
      dispatch({
        type: CREATE_CATEGORY,
        payload: data.data
      });
      dispatch(setAlert('Category created', CREATE_CATEGORY, 'success'))
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'CREATE_CATEGORY_ALERT');
      dispatch({ type: LOADED });
    });
};

export const updateCategory = (categoryId, categoryData) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders('multipart/form-data');
  axios.put(`/api/category/${ categoryId }`,  categoryData, config)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: data.data
      });
      dispatch(setAlert('Category updated', 'UPDATE_CATEGORY_SUCCESS'))
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'CATEGORY_ALERT');
      dispatch({ type: LOADED });
    });
};
export const clearCategoryData = () => dispatch => {
  dispatch({
        type: CLEAR_CATEGORY_DATA
      });
};

export const deleteCategory = (categoryId) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.delete(`/api/category/${categoryId}`, config)
    .then(({ data }) => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: data.data
      });
      dispatch(setAlert('Category deleted', 'DELETE_CATEGORY_SUCCESS'))
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'DELETE_CATEGORY_ALERT');
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

// Load all categories
export const loadCategory = () => dispatch => {
  dispatch({ type: LOADING });
  axios.get('/api/category')
    .then(({ data }) => {
      dispatch({
        type: LOAD_CATEGORY,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, LOAD_CATEGORY);
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
  axios.get(`/api/courses`, options)
    .then(({ data }) => {
      dispatch({
        type: LOAD_CATEGORY_COURSELIST,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, LOAD_CATEGORY_COURSELIST);
      dispatch({ type: LOADED });
    });
};