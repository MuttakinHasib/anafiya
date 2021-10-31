import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_FACEBOOK_LOGIN_FAIL,
  USER_FACEBOOK_LOGIN_REQUEST,
  USER_FACEBOOK_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_ACTIVATION_FAIL,
  USER_REGISTER_ACTIVATION_REQUEST,
  USER_REGISTER_ACTIVATION_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
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
        user: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

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
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

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
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

// User Google Login Reducer
export const userGoogleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GOOGLE_LOGIN_REQUEST:
      return { loading: true };
    case USER_GOOGLE_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        user: action.payload,
      };
    case USER_GOOGLE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

// User Facebook Login Reducer
export const userFacebookLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FACEBOOK_LOGIN_REQUEST:
      return { loading: true };
    case USER_FACEBOOK_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        user: action.payload,
      };
    case USER_FACEBOOK_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

// User Details Reducer
export const userProfileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { loading: true };
    case USER_PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      };
    case USER_PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

// User Details Reducer
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

// User Profile Update Reducer
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

// User Profile Update Reducer
export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        user: action.payload,
      };
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

// User Delete Reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
      };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

// User List Reducer
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};
