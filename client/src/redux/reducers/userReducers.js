import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_ACTIVATION_FAIL,
  USER_REGISTER_ACTIVATION_REQUEST,
  USER_REGISTER_ACTIVATION_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../actions/types';

// User Login Reducer

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        user: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

// User Register Reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        message: action.payload,
      };
    case USER_REGISTER_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

// User Register Activation Reducer
export const userActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_ACTIVATION_REQUEST:
      return { loading: true };
    case USER_REGISTER_ACTIVATION_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        user: action.payload,
      };
    case USER_REGISTER_ACTIVATION_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};
