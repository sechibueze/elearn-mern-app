import { 
  LOAD_COURSES, 
  LOAD_COURSE_INFO,
  CLEAR_COURSE_DATA,
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,

  TOGGLE_COURSE_VISIBILITY,

  LOAD_COURSE_SUBSCRIPTIONS,
  SUBSCRIBE,
  UNSUBSCRIBE,

  ADD_LESSON,
  GET_LESSON,
  CLEAR_LESSON_DATA,
  UPDATE_LESSON,
  DELETE_LESSON


 } from '../_actions/types';

const initialState = {
  coursesList: [],
  
  newCourse: null,
  deletedCourse: null,
  updatedCourse: null,
  courseInfo: null,
  
  courseVisibilityStatus: null,

  subscriptions: [],
  subscribe: null,
  unsubscribe: null,

  newLesson: null,
  lessonUpdate: null,
  lessonItem: null,
  lessonDelete: null
}

export default function(state = initialState, action){
  const { type, payload} = action;
  switch (type) {
    case LOAD_COURSE_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: payload
      };
    case SUBSCRIBE:
      return {
        ...state,
        subscribe: payload
      };
    case UNSUBSCRIBE:
      return {
        ...state,
        unsubscribe: payload
      };
    case ADD_LESSON:
      return {
        ...state,
        newLesson: payload
      };
    case GET_LESSON:
      return {
        ...state,
        lessonItem: payload
      };
    case CLEAR_LESSON_DATA:
      return {
        ...state,
        lessonUpdate: null,
        newLesson: null,
        lessonItem: null
      };
    case UPDATE_LESSON:
      return {
        ...state,
        lessonUpdate: payload
      };
    case DELETE_LESSON:
      return {
        ...state,
        lessonDelete: payload
      };
    case CREATE_COURSE:
      return {
        ...state,
        newCourse: payload
      };
    case CLEAR_COURSE_DATA:
      return {
        ...state,
        newCourse: null,
        updatedCourse: null,
        courseInfo: null
      };
    case UPDATE_COURSE:
      return {
        ...state,
        updatedCourse: payload
      };
    case TOGGLE_COURSE_VISIBILITY:
      return {
        ...state,
        courseVisibilityStatus: payload
      };
    
    case LOAD_COURSES:
      return {
        ...state,
        coursesList: payload
      };
    case LOAD_COURSE_INFO:
      return {
        ...state,
        courseInfo: payload
      };
    case DELETE_COURSE:
      return {
        ...state,
        deletedCourse: payload
      };
    default:
      return state;
  }
}