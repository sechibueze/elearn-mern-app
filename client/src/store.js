import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers/rootReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveCartToLocalStorage = cartState => {
  try {
    const stringifyCartItems = JSON.stringify(cartState);
    localStorage.setItem('cart', stringifyCartItems);
  } catch (err) {
    console.log('error in svain to Local Storage', err)
  }
};

const getCartFromLocalStorage = () => {
  try {
    const cartItems = localStorage.getItem('cart');
    if(cartItems === null) return undefined
    const cartData = { cart: JSON.parse(cartItems)};
    return cartData

  } catch (err) {
    console.log('error in svain to Local Storage', err)
  }
};
const persistCart = getCartFromLocalStorage();
const store = createStore(
  rootReducer,
   persistCart,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveCartToLocalStorage(store.getState().cart));

export default store;