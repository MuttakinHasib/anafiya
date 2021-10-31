import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  STRIPE_PAYMENT_FAIL,
  STRIPE_PAYMENT_REQUEST,
  STRIPE_PAYMENT_SUCCESS,
  USER_ORDERS_LIST_FAIL,
  USER_ORDERS_LIST_REQUEST,
  USER_ORDERS_LIST_SUCCESS,
} from './types';

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders`,
      order,
      config
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    toast.success('Order created');
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error,
    });
  }
};

export const orderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const stripePayment = payload => async (dispatch, getState) => {
  try {
    dispatch({ type: STRIPE_PAYMENT_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/payment`,
      payload,
      config
    );

    dispatch({ type: STRIPE_PAYMENT_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: STRIPE_PAYMENT_FAIL,
      payload: error,
    });
  }
};

export const orderPaid = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/${orderId}/paid`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error,
    });
  }
};

export const orderDelivered = orderId => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/${orderId}/delivered`,
      {},
      config
    );

    dispatch({ type: ORDER_DELIVERED_SUCCESS });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: error,
    });
  }
};

export const getUserOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDERS_LIST_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders/userOrders`,
      config
    );

    dispatch({ type: USER_ORDERS_LIST_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: USER_ORDERS_LIST_FAIL,
      payload: error,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { user } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/orders`,
      config
    );

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error,
    });
  }
};
