import { combineReducers } from 'redux';
import {
  userActivationReducer,
  userFacebookLoginReducer,
  userGoogleLoginReducer,
  userLoginReducer,
  userRegisterReducer,
} from './userReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userGoogleLogin: userGoogleLoginReducer,
  userFacebookLogin: userFacebookLoginReducer,
  userRegister: userRegisterReducer,
  userActivation: userActivationReducer,
});
