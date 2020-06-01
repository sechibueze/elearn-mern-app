import axios from 'axios';
import { LOADING, LOADED, 
  LOAD_COURSES,
  LOAD_CURRENT_COURSE,
  CREATE_COURSE,
  UPDATE_COURSE,
  TOGGLE_COURSE_VISIBILITY,
  DELETE_COURSE,

  LOAD_COURSE_SUBSCRIPTIONS,
  SUBSCRIBE,
  UNSUBSCRIBE,

  ADD_LESSON,
  GET_LESSON,
  UPDATE_LESSON,
  DELETE_LESSON
 } from './types';
import { getConfigHeaders } from './authActions';
import { handleResponseErrors } from './alertActions';


export const loadCourseSubscriptionsByUserId = () => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.get(`/api/courses/subscriptions`, config)
    .then(({ data }) => {
      dispatch({
        type: LOAD_COURSE_SUBSCRIPTIONS,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'SUB_ALERT');
      dispatch({ type: LOADED });
    });
};
export const subscribeUserToCourse = courseId => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }/subscriptions`, {}, config)
    .then(({ data }) => {
      dispatch({
        type: SUBSCRIBE,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'SUB_ALERT');
      dispatch({ type: LOADED });
    });
};
export const unsubscribeUserToCourse = courseId => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }/unsubscribe`, {}, config)
    .then(({ data }) => {
      dispatch({
        type: UNSUBSCRIBE,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'SUB_ALERT');
      dispatch({ type: LOADED });
    });
};

export const addLesoon = (courseId, lessonData) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  // /api/courses /: courseId
  axios.post(`/api/courses/${ courseId }`, lessonData, config)
    .then(({ data }) => {
      console.log('courses', data)
      dispatch({
        type: ADD_LESSON,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      dispatch(handleResponseErrors(err, 'LESSON_ALERT'));
      dispatch({ type: LOADED });
    });
};




export const createCourse = courseData => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.post('/api/courses', courseData, config)
    .then(({ data }) => {
      console.log('courses', data)
      dispatch({
        type: CREATE_COURSE,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('courses err', err)
      dispatch(handleResponseErrors(err, 'COURSE_ALERT'));
      dispatch({ type: LOADED });
    });
};

export const updateCourse = (courseId, courseData, history = null) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }`, courseData, config)
    .then(({ data }) => {
      console.log('courses', data)
      dispatch({
        type: UPDATE_COURSE,
        payload: data.data
      });
      dispatch({ type: LOADED });
      if (history) {
        history.push('/course-items');
      }
    })
    .catch(err => {
      console.log('courses err', err)
      handleResponseErrors(err, 'COURSE_ALERT');
      dispatch({ type: LOADED });
    });
};
export const toggleCourseVisibility = courseId => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }/visibility`, null, config)
    .then(({ data }) => {
      console.log('courses', data)
      dispatch({
        type: TOGGLE_COURSE_VISIBILITY,
        payload: data.data
      });
      dispatch({ type: LOADED });
      
    })
    .catch(err => {
      console.log('courses err', err)
      dispatch(handleResponseErrors(err, 'COURSE_ALERT'));
      dispatch({ type: LOADED });
    });
};


export const loadCourses = (opt = null) => dispatch => {
  dispatch({type: LOADING});
  let options = {
    params: opt
  }
  axios.get('/api/courses', options)
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

export const deleteCourse = courseId => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.delete(`/api/courses/${ courseId }`, config)
    .then(({ data }) => {
      console.log('courses', data)
      dispatch({
        type: DELETE_COURSE,
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
