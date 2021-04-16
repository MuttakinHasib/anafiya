import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import checkIcon from '../assets/check-icon.svg';
import { Meta } from '../components';
import Loader from '../components/Loader';
import { orderDetails } from '../redux/actions/orderActions';

const OrderPlacedScreen = () => {
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();
  const { order, loading } = useSelector(state => state.orderDetails);

  useEffect(() => {
    dispatch(orderDetails(orderId));
  }, [dispatch, orderId]);

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

  return loading ? (
    <Loader />
  ) : (
    <motion.div
      exit={{ opacity: 0, y: 5 }}
      variants={stagger}
      initial='hidden'
      animate='visible'
    >
      <Meta title='Order placed' />
      <div className='text-center mt-20'>
        <img className='mx-auto' src={checkIcon} alt='' />
        <h3 className='mt-5 mb-3 text-3xl text-gray-700 font-light'>
          Order Placed!
        </h3>
        <p className='text-base text-gray-400 font-light'>
          Thank you for your order, It should be delivered in next 2-3 working
          days
        </p>
      </div>
      <div className='mt-12 border-2 border-gray-200 rounded-md p-5 mx-auto max-w-lg'>
        <h3 className='text-center text-lg text-gray-400 mb-2'>
          Order No #{order?._id?.substring(order?._id?.length - 8)}
        </h3>
        <h3 className='text-center text-lg text-gray-600 mb-5'>
          Your Order will be sent to this address
        </h3>

        <div className='px-3 py-1'>
          <div className='space-x-5 flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 p-2 text-gray-600 box-content rounded-full bg-gray-100'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <p className='text-gray-400'>
              {order?.shippingAddress.address}, {order?.shippingAddress.city}{' '}
              {order?.shippingAddress.country}
            </p>
          </div>
        </div>
        <div className='px-3 py-1'>
          <div className='space-x-5 flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 p-2 text-gray-600 box-content rounded-full bg-gray-100'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
              />
            </svg>
            <p className='text-gray-400'>{order?.shippingAddress.phone}</p>
          </div>
        </div>
        <div className='px-3 py-1'>
          <div className='space-x-5 flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 p-2 text-gray-600 box-content rounded-full bg-gray-100'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
            <a
              href={`mailto:${order?.shippingAddress.email}`}
              className='text-gray-400 hover:underline'
            >
              {order?.shippingAddress.email}
            </a>
          </div>
        </div>
        {(order?.paymentMethod === 'cashOnDelivery' || !order?.isPaid) && (
          <div className='bg-gray-100 p-3 mt-5 text-gray-700 text-center rounded-md'>
            The payment of ${order?.totalPrice} you’ll make when the courier
            arrives with your order.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderPlacedScreen;
