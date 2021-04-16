import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutSteps, Meta } from '../components';
import Loader from '../components/Loader';
import { cartReset } from '../redux/actions/cartActions';
import { createOrder } from '../redux/actions/orderActions';
import {
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
  STRIPE_PAYMENT_RESET,
} from '../redux/actions/types';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userLogin);
  const cart = useSelector(state => state.cart);
  const { order, success, loading } = useSelector(state => state.orderCreate);

  const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2);

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  cart.shippingPrice = addDecimals(
    cart.itemsPrice > 100 ? 0 : Number((0.3 * cart.itemsPrice).toFixed(2))
  );
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: STRIPE_PAYMENT_RESET });
      if (success) {
        dispatch(cartReset());
        if (order?.paymentMethod === 'cashOnDelivery') {
          navigate(`/order/${order._id}/success`);
        } else {
          navigate(`/order/${order._id}`);
        }
      } else if (cart?.cartItems.length === 0) {
        navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [dispatch, user, navigate, success, cart]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const stagger = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      exit={{ opacity: 0, y: 5 }}
      variants={stagger}
      initial='hidden'
      animate='visible'
    >
      <Meta title='Place order' />
      {loading && <Loader />}
      <CheckoutSteps step1 step2 step3 />
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 space-y-7'>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Ordered Items</h2>
            <motion.div
              exit={{ opacity: 0, y: 5 }}
              variants={stagger}
              initial='hidden'
              animate='visible'
              className='border-2 border-gray-200 rounded-md px-8 py-5 divide-y-2 space-y-2'
            >
              {cart?.cartItems.map(item => (
                <div
                  className='flex md:items-center flex-col md:flex-row justify-between'
                  key={item?.product}
                >
                  <div className='flex items-center'>
                    <img src={item?.image} alt='' className='w-20 mr-8' />
                    <Link
                      to={`/product/${item?.product}`}
                      className='text-base md:text-lg text-gray-600 hover:underline'
                    >
                      {item?.name}
                    </Link>
                  </div>
                  <p className='prose'>
                    {item?.quantity} x ${item?.price} = $
                    {Number(item?.quantity * item?.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Payment Method</h2>
            <div className='border-2 border-gray-200 rounded-md p-8'>
              <h2 className='text-lg capitalize'>{cart?.paymentMethod}</h2>
            </div>
          </div>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Shipping Details</h2>
            <div className='border-2 border-gray-200 hover:bg-blue-400 hover:bg-opacity-5 rounded-md p-8'>
              <h4 className='text-lg text-gray-700'>
                {cart?.shippingAddress?.name}
              </h4>
              <div className='text-gray-500 font-light'>
                <a
                  className='hover:underline text-'
                  href={`mailto:${user?.email}`}
                >
                  {user?.email}
                </a>
                <p>{cart?.shippingAddress?.phone}</p>
                <p>
                  {cart?.shippingAddress?.address} {cart?.shippingAddress?.city}{' '}
                  - {cart?.shippingAddress?.postcode}
                </p>
                <p>{cart?.shippingAddress?.country}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-1'>
          <div className='border-2 border-dashed p-8 rounded-md'>
            <h2 className='text-xl text-gray-700 font-semibold mb-5'>
              Order Summary
            </h2>
            <div className='space-y-5'>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>
                  Sub-total (
                  {cart?.cartItems?.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}
                  ) Items
                </h4>
                <span className='text-base text-gray-600'>
                  ${cart?.itemsPrice}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>Shipping Price</h4>
                <span className='text-base text-gray-600'>
                  ${cart?.shippingPrice}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>Tax</h4>
                <span className='text-base text-gray-600'>
                  ${cart?.taxPrice}
                </span>
              </div>
              <div className='flex justify-between items-center border-b-2 border-dashed pb-5'>
                <h4 className='text-lg font-semibold text-gray-700'>Total</h4>
                <span
                  className='text-lg font-semibold'
                  style={{ color: '#f36' }}
                >
                  ${cart?.totalPrice}
                </span>
              </div>
            </div>
            <button
              className='w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300'
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceOrderScreen;
