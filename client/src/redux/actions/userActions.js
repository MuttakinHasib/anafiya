import axios from 'axios';
import toast from 'react-hot-toast';
import {
  USER_FACEBOOK_LOGIN_FAIL,
  USER_FACEBOOK_LOGIN_REQUEST,
  USER_FACEBOOK_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_ACTIVATION_FAIL,
  USER_REGISTER_ACTIVATION_REQUEST,
  USER_REGISTER_ACTIVATION_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './types';

// User Logout Action

export const logout = () => dispatch => {
  localStorage.removeItem('anafiya_userInfo');
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
      `/api/users/login`,
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
    const { data } = await axios.post(`/api/users/register`, userData, config);
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
    const { data } = await axios.post(`/api/users/activation`, token, config);

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
    const { data } = await axios.post(`/api/users/googleSignIn`, token, config);

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
      `/api/users/facebookSignIn`,
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
