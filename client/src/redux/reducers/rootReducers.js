import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import {
  orderCreateReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderPayReducer,
  stripePaymentReducer,
  userOrdersListReducer,
} from './orderReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from './productReducers';
import {
  userActivationReducer,
  userDeleteReducer,
  userDetailsReducer,
  userFacebookLoginReducer,
  userGoogleLoginReducer,
  userListReducer,
  userLoginReducer,
  userProfileDetailsReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './userReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userActivation: userActivationReducer,
  userGoogleLogin: userGoogleLoginReducer,
  userFacebookLogin: userFacebookLoginReducer,
  userProfileDetails: userProfileDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userOrdersList: userOrdersListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDelivered: orderDeliveredReducer,
  stripePayment: stripePaymentReducer,
});
