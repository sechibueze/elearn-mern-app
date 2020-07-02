import axios from 'axios';
import { LOADING, LOADED, 
  LOAD_COURSES,
  LOAD_COURSE_INFO,
  CREATE_COURSE,
  CLEAR_COURSE_DATA,
  UPDATE_COURSE,
  TOGGLE_COURSE_VISIBILITY,
  DELETE_COURSE,

  LOAD_COURSE_SUBSCRIPTIONS,
  SUBSCRIBE,
  UNSUBSCRIBE,

  ADD_LESSON,
  GET_LESSON,
  UPDATE_LESSON,
  CLEAR_LESSON_DATA,
  DELETE_LESSON
 } from './types';
import { getConfigHeaders } from './authActions';
import { handleResponseErrors, setAlert } from './alertActions';


export const loadCourseSubscriptionsByUserId = () => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  
  axios.get(`/api/courses/users/subscriptions`, config)
    .then(({ data }) => {
      dispatch({
        type: LOAD_COURSE_SUBSCRIPTIONS,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
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
      dispatch({
        type: ADD_LESSON,
        payload: data.data
      });
      dispatch(setAlert('Lesson added', 'ADD_LESSON_SUCCESS'));
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'ADD_LESSON_ALERT'));
      dispatch({ type: LOADED });
    });
};

export const updateLesson = (courseId, lessonId, lessonData) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }/lessons/${ lessonId }`, lessonData, config)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_LESSON,
        payload: data.data
      });
      dispatch(setAlert('Lesson updated', 'UPDATE_LESSON_SUCCESS'));
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'UPDATE_LESSON_ALERT'));
      dispatch({ type: LOADED });
    });
};

export const getLessonItem = (courseId, lessonId) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.get(`/api/courses/${ courseId }/lessons/${ lessonId }`, config)
    .then(({ data }) => {
      dispatch({
        type: GET_LESSON,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'UPDATE_LESSON_ALERT'));
      dispatch({ type: LOADED });
    });
};

export const removeLessonItem = (courseId, lessonId) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.delete(`/api/courses/${ courseId }/lessons/${ lessonId }`, config)
    .then(({ data }) => {
      dispatch({
        type: DELETE_LESSON,
        payload: data.data
      });
      dispatch(setAlert('Lesson deleted', 'DELETE_LESSON_SUCCESS'))
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'DELETE_LESSON_ALERT'));
      dispatch({ type: LOADED });
    });
};

export const clearLessonData = () => dispatch => {
  dispatch({ type: CLEAR_LESSON_DATA });
};



export const createCourse = courseData => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.post('/api/courses', courseData, config)
    .then(({ data }) => {
      dispatch({
        type: CREATE_COURSE,
        payload: data.data
      });
      dispatch(setAlert('Course created', 'CREATE_COURSE_SUCCESS'))
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'CREATE_COURSE_ALERT'));
      dispatch({ type: LOADED });
    });
};

export const clearCourseData = () => dispatch => {
  dispatch({ type: CLEAR_COURSE_DATA });
};

export const updateCourse = (courseId, courseData) => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }`, courseData, config)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_COURSE,
        payload: data.data
      });
      dispatch(setAlert('Course Updated', 'UPDATE_COURSE_SUCCESS'))
      dispatch({ type: LOADED });
     
    })
    .catch(err => {
      handleResponseErrors(err, 'UPDATE_COURSE_ALERT');
      dispatch({ type: LOADED });
    });
};
export const toggleCourseVisibility = courseId => dispatch => {
  dispatch({ type: LOADING });
  const config = getConfigHeaders();
  axios.put(`/api/courses/${ courseId }/visibility`, null, config)
    .then(({ data }) => {
      dispatch({
        type: TOGGLE_COURSE_VISIBILITY,
        payload: data.data
      });
      dispatch(setAlert('Updated Course Visibility', 'COURSE_VISIBILITY_SUCCESS'))
      dispatch({ type: LOADED });
      
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'COURSE_VISIBILITY_ALERT'));
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
      dispatch({ 
        type: LOAD_COURSES,
        payload: data.data
       });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'LOAD_COURSES_ALERT');
      dispatch({ type: LOADED });
    });
};

export const loadCourseById = (courseId) => dispatch => {
  dispatch({ type: LOADING });
  axios.get(`/api/courses/${ courseId }`
  // {
  //   params: {
  //     courseId: courseId
  //   }
  // }
  )
    .then(({ data }) => {
      dispatch({
        type: LOAD_COURSE_INFO,
        payload: data.data
      });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, LOAD_COURSE_INFO);
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
