import axios from 'axios';
import { LOADING, LOADED, 
  LOAD_COURSES,
  LOAD_CURRENT_COURSE
 } from './types';
import { getConfigHeaders } from './authActions';
import { handleResponseErrors } from './alertActions';

export const loadCourses = () => dispatch => {
  dispatch({type: LOADING});

  axios.get('/api/courses')
    .then(({ data }) => {
      console.log('courses', data)
      dispatch({ 
        type: LOAD_COURSES,
        payload: data.data
       });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'COURSE_ALERT');
      dispatch({ type: LOADED });
    });
};

export const loadCourseById = (courseId) => dispatch => {
  dispatch({ type: LOADING });

  axios.get(`/api/courses`,{
    params: {
      courseId: courseId
    }
  })
    .then(({ data }) => {
      dispatch({
        type: LOAD_CURRENT_COURSE,
        payload: data.data[0]
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'COURSE_ALERT');
      dispatch({ type: LOADED });
    });
};