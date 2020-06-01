import { 
  CREATE_CATEGORY, 
  LOAD_CATEGORY, 
  GET_CATEGORY_BY_ID,
  LOAD_CATEGORY_COURSELIST,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
 } from '../_actions/types';

const initialState = {
  categoryItems: null,
  categoryCourseList: null,
  newCategory: null,
  categoryById: null,
  updateCategory: null,
  deleteCategory: null

}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        newCategory: payload
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updateCategory: payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        deleteCategory: payload
      };
    case LOAD_CATEGORY:
      return {
        ...state,
        categoryItems: payload
      };
    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        categoryById: payload
      };
    case LOAD_CATEGORY_COURSELIST:
      return {
        ...state,
        categoryCourseList: payload
      };
    default:
      return state;
  }
}