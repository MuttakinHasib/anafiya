import { combineReducers } from 'redux';
import {
  userActivationReducer,
  userLoginReducer,
  userRegisterReducer,
} from './userReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userActivation: userActivationReducer,
});
