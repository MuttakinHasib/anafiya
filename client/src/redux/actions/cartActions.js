import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from './types';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/products/${id}`
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    });

    localStorage.setItem(
      'anafiya_cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    console.error(err.message);
  }
};

export const removeCartItem = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      'anafiya_cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    console.error(err.message);
  }
};

export const saveShippingAddress = data => async dispatch => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem('anafiya_shippingAddress', JSON.stringify(data));
  } catch (err) {
    console.error(err.message);
  }
};

export const savePaymentMethod = data => async dispatch => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem('anafiya_paymentMethod', JSON.stringify(data));
  } catch (err) {
    console.error(err.message);
  }
};

export const cartReset = () => dispatch => {
  try {
    dispatch({ type: CART_RESET });

    localStorage.removeItem('anafiya_cartItems');
  } catch (err) {
    console.error(err.message);
  }
};
