import {
  ADD_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from './types';

export const addCourseToCart = product => (dispatch, getState) => {
  const cartItems = getState().cart.items;
  const courseAlreadyAdded = cartItems.find(item => item.courseId === product.courseId);
  if (!courseAlreadyAdded) {
    dispatch({
      type: ADD_CART,
      payload: product
    })
  }
};

export const removeItemFromCart = itemId => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: itemId
  })
}
export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART
  })
}