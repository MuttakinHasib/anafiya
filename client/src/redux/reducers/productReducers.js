import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../actions/types';

// GET ALL PRODUCTS
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, error: null, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

// GET PRODUCT DETAILS BY ID
export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, error: null, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};
