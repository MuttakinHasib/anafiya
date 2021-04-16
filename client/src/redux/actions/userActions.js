import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ORDER_CREATE_RESET,
  ORDER_DELIVERED_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
  STRIPE_PAYMENT_RESET,
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
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_ORDERS_LIST_RESET,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
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
} from './types';

// User Logout Action

export const logout = () => dispatch => {
  localStorage.removeItem('anafiya_userInfo');
  dispatch({ type: USER_PROFILE_DETAILS_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_RESET });
  dispatch({ type: USER_DELETE_RESET });
  dispatch({ type: USER_LOGIN_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: ORDER_CREATE_RESET });
  dispatch({ type: ORDER_DETAILS_RESET });
  dispatch({ type: ORDER_PAY_RESET });
  dispatch({ type: ORDER_DELIVERED_RESET });
  dispatch({ type: STRIPE_PAYMENT_RESET });
  dispatch({ type: USER_ORDERS_LIST_RESET });
  dispatch({ type: USER_LOGOUT });
};

// User Login Action

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success('Logged in successfully');
    localStorage.setItem('anafiya_userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

// User Register Action

export const register = userData => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/register`,
      userData,
      config
    );
    toast.success(data.message);
    // console.log(data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};

// User Register Activation Action

export const userActivation = token => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_ACTIVATION_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/activation`,
      token,
      config
    );

    dispatch({ type: USER_REGISTER_ACTIVATION_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success('User activation successful');

    localStorage.setItem('anafiya_userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_REGISTER_ACTIVATION_FAIL,
      payload: error,
    });
  }
};

// Google Sign In Action

export const googleSignIn = token => async dispatch => {
  try {
    dispatch({ type: USER_GOOGLE_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/googleSignIn`,
      token,
      config
    );

    dispatch({ type: USER_GOOGLE_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success('Logged in with Google');

    localStorage.setItem('anafiya_userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_GOOGLE_LOGIN_FAIL,
      payload: error,
    });
  }
};

// Facebook Sign In Action

export const facebookSignIn = token => async dispatch => {
  try {
    dispatch({ type: USER_FACEBOOK_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/facebookSignIn`,
      token,
      config
    );

    dispatch({ type: USER_FACEBOOK_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success('Logged in with Facebook');

    localStorage.setItem('anafiya_userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_FACEBOOK_LOGIN_FAIL,
      payload: error,
    });
  }
};

// User Profile Details Action

export const getUserProfileDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_DETAILS_REQUEST });

    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${id}`,
      config
    );

    dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('anafiya_userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_PROFILE_DETAILS_FAIL,
      payload: error,
    });
  }
};

// User Details Action

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${id}`,
      config
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error,
    });
  }
};

// User Profile Update Action

export const userProfileUpdate = userData => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/users/profile`,
      userData,
      config
    );

    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    toast.success('User updated successfully');
    dispatch(getUserProfileDetails('profile'));

    localStorage.setItem('anafiya_userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload: error,
    });
  }
};

// User Update Action

export const updateUser = (id, userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${id}`,
      userData,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });
    if (user._id === id) {
      dispatch(getUserProfileDetails('profile'));
    }

    toast.success('User updated successfully');
    dispatch(getUserDetails(id));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error,
    });
  }
};

// User Delete Action

export const userDelete = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { user } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${id}`,
      config
    );
    dispatch({ type: USER_DELETE_SUCCESS });
    dispatch(getUserList());

    toast.success('User deleted successfully');
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error,
    });
  }
};

// User List Action

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/`,
      config
    );

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({
      type: USER_LIST_FAIL,
      payload: error,
    });
  }
};
