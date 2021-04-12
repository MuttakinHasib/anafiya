import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  stripePaymentReducer,
  userOrdersListReducer,
} from './orderReducers';
import { productDetailsReducer, productListReducer } from './productReducers';
import {
  userActivationReducer,
  userFacebookLoginReducer,
  userGoogleLoginReducer,
  userLoginReducer,
  userRegisterReducer,
} from './userReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userActivation: userActivationReducer,
  userGoogleLogin: userGoogleLoginReducer,
  userFacebookLogin: userFacebookLoginReducer,
  userOrdersList: userOrdersListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  stripePayment: stripePaymentReducer,
});
