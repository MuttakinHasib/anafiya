import axios from 'axios';
import toast from 'react-hot-toast';
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from './types';

// GET ALL PRODUCTS ACTION
export const getProductList = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/products`, config);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error });
  }
};
// GET PRODUCT DETAILS ACTION
export const getProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/products/${id}`, config);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    toast.error(error);
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error });
  }
};
