import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyCartImg from '../assets/empty-cart.svg';
import Loader from '../components/Loader';
import { addToCart, removeCartItem } from '../redux/actions/cartActions';

const CartScreen = ({ history, match, location }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  const { cartItems, loading: cartLoading, error: cartError } = useSelector(
    state => state.cart
  );

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  return cartItems?.length === 0 ? (
    <div className='space-y-10'>
      <Link
        to='/'
        className='py-3 px-5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300'
      >
        Go Back
      </Link>
      <div className='flex justify-center items-center mt-20'>
        <img src={emptyCartImg} width='250' height='250' alt='' />
      </div>
      <h1 className='text-center text-2xl lg:text-4xl text-gray-700'>
        Your Shopping Cart is Empty
      </h1>
    </div>
  ) : (
    <>
      {cartLoading && <Loader />}
      <h2 className='text-4xl text-gray-700 mb-10'>Your Shopping Cart</h2>
      <div className='grid gap-12 lg:grid-cols-3 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 overflow-auto divide-y-2'>
          {cartItems?.map(item => (
            <div className='flex md:flex-row flex-col md:justify-between md:items-center md:space-x-8 space-y-3 py-3 pb-4'>
              <img
                className='sm:w-2/3 mx-auto md:w-20'
                src={item?.image}
                alt=''
              />
              <Link
                to={`/product/${item?.product}`}
                className='text-lg text-gray-700 hover:underline flex-1'
              >
                {item?.name}
              </Link>
              <div className='lg:w-32 lg:text-center'>${item?.price}</div>
              <div>
                <select
                  className='w-1/2 lg:w-24 tex-sm h-9 border-none bg-gray-100 rounded-md focus:ring-purple-100'
                  name='quantity'
                  id='quantity'
                  value={item?.quantity}
                  onChange={e =>
                    dispatch(addToCart(item?.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item?.countInStock).keys()].map(x => (
                    <option value={x + 1} key={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className='w-14 lg:w-16 bg-red-500 hover:bg-red-600 transition-colors duration-300 py-1 rounded-md text-white'
                onClick={() => dispatch(removeCartItem(item?.product))}
              >
                <svg
                  className='w-5 lg:w-6 mx-auto'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className='lg:col-span-1'>
          <div className=' border-2 border-dashed p-5 md:p-8 rounded-md'>
            <h2 className='text-xl text-gray-700 font-semibold mb-5'>
              Order Summary
            </h2>
            <div className='flex justify-between items-center border-b-2 border-dashed pb-5'>
              <h4 className='text-md text-gray-600'>
                Sub-total (
                {cartItems?.reduce((acc, item) => acc + item.quantity, 0)})
                Items
              </h4>
              <span className='text-base text-gray-600'>
                $
                {cartItems
                  ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button
              className={`${
                cartItems?.length === 0 && 'opacity-50 pointer-events-none'
              } w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300`}
              disabled={cartItems?.length === 0}
              onClick={() => history.push('/shipping')}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
