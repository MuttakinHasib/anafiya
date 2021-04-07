import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/rootReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const middleware = [thunk];
const initial = {
  userLogin: { user: userInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
};

export const store = createStore(
  reducers,
  initial,
  composeWithDevTools(applyMiddleware(...middleware))
);
