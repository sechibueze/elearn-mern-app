import {
  ADD_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from '../_actions/types';

const initialState = {
  items: []
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART:
      return {
        ...state,
        items: [payload, ...state.items]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.courseId !== payload)
      };
    case CLEAR_CART:
      return {
        ...state,
        items: []
      }
    default:
      return state;
  }
}