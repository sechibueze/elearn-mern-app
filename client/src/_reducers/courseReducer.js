import { 
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


 } from '../_actions/types';

const initialState = {
  userCourses: null,
  currentCourse: null,
  newCourse: null,
  updatedCourse: null,
  deletedCourse: null,
  courseVisibilityStatus: null,

  subscriptions: [],
  subscribe: null,
  unsubscribe: null,

  newLesson: null,
  lessonItems: null,
  updatedLesson: null,
  deletedLesson: null,
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
        lessonItems: payload
      };
    case UPDATE_LESSON:
      return {
        ...state,
        updatedLesson: payload
      };
    case DELETE_LESSON:
      return {
        ...state,
        deletedLesson: payload
      };
    case CREATE_COURSE:
      return {
        ...state,
        newCourse: payload
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
        userCourses: payload
      };
    case LOAD_CURRENT_COURSE:
      return {
        ...state,
        currentCourse: payload
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