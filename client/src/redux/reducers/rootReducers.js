import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
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
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});
