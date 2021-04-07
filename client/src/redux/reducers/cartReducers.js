import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

const initialState = {
  cartItems: [],
  shippingAddress: {},
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        x => x.product === item.product
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existingItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

    default:
      return state;
  }
};
