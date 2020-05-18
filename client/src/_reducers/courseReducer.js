import { LOAD_COURSES, LOAD_CURRENT_COURSE } from '../_actions/types';

const initialState = {
  userCourses: null,
  currentCourse: null
}

export default function(state = initialState, action){
  const { type, payload} = action;
  switch (type) {
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
  
    default:
      return state;
  }
}