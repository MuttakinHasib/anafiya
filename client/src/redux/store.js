import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/rootReducers';

const userInfoFromStorage = localStorage.getItem('anafiya_userInfo')
  ? JSON.parse(localStorage.getItem('anafiya_userInfo'))
  : null;
const cartItemsFromStorage = localStorage.getItem('anafiya_cartItems')
  ? JSON.parse(localStorage.getItem('anafiya_cartItems'))
  : [];
const shippingAddressFromStorage = localStorage.getItem(
  'anafiya_shippingAddress'
)
  ? JSON.parse(localStorage.getItem('anafiya_shippingAddress'))
  : {};
const paymentMethodFromStorage = localStorage.getItem('anafiya_paymentMethod')
  ? JSON.parse(localStorage.getItem('anafiya_paymentMethod'))
  : '';

const middleware = [thunk];
const initial = {
  userLogin: { user: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};

export const store = createStore(
  reducers,
  initial,
  composeWithDevTools(applyMiddleware(...middleware))
);
