import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  STRIPE_PAYMENT_FAIL,
  STRIPE_PAYMENT_REQUEST,
  STRIPE_PAYMENT_RESET,
  STRIPE_PAYMENT_SUCCESS,
  USER_ORDERS_LIST_FAIL,
  USER_ORDERS_LIST_REQUEST,
  USER_ORDERS_LIST_RESET,
  USER_ORDERS_LIST_SUCCESS,
} from '../actions/types';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        error: null,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const stripePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case STRIPE_PAYMENT_REQUEST:
      return { loading: true };
    case STRIPE_PAYMENT_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
        paymentResult: action.payload,
      };
    case STRIPE_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case STRIPE_PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        error: null,
        success: true,
      };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};

    default:
      return state;
  }
};

export const userOrdersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDERS_LIST_REQUEST:
      return { loading: true };
    case USER_ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        orders: action.payload,
      };
    case USER_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ORDERS_LIST_RESET:
      return { orders: [] };

    default:
      return state;
  }
};
