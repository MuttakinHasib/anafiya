import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
import { CheckoutSteps, Meta } from '../components';
import { saveShippingAddress } from '../redux/actions/cartActions';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { user } = useSelector(state => state.userLogin);
  const [shippingAddress, setShippingAddress] = useState({
    name: cart?.shippingAddress?.name || '',
    phone: cart?.shippingAddress?.phone || '',
    email: user?.email || '',
    address: cart?.shippingAddress?.address || '',
    postcode: cart?.shippingAddress?.postcode || '',
    city: cart?.shippingAddress?.city || '',
    country: cart?.shippingAddress?.country || 'Bangladesh',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onChange = e =>
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      shippingAddress.name === '' ||
      shippingAddress.phone === '' ||
      shippingAddress.address === '' ||
      shippingAddress.postcode === '' ||
      shippingAddress.city === '' ||
      shippingAddress.country === ''
    ) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(saveShippingAddress(shippingAddress));
    navigate('/payment');
  };

  const stagger = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
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
      <Meta title='Shipping address' />
      <CheckoutSteps step1 />
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 max-w-full lg:max-w-2xl'>
          <h2 className='text-2xl text-gray-600 mb-12'>Shipping Address</h2>
          <form className='space-y-5' {...{ onSubmit }}>
            <div className='flex items-center space-x-2 sm:space-x-5'>
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                name='name'
                value={shippingAddress.name}
                placeholder='Full Name'
                {...{ onChange }}
              />
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                name='phone'
                placeholder='Phone Number'
                value={shippingAddress.phone}
                {...{ onChange }}
              />
            </div>
            <input
              className='border-2 w-full text-xs sm:text-base border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
              type='email'
              name='email'
              placeholder='Email Address'
              value={shippingAddress.email}
              {...{ onChange }}
            />
            <textarea
              className='border-2 w-full text-xs sm:text-base border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
              placeholder='Address'
              style={{ maxWidth: '47.5rem' }}
              name='address'
              value={shippingAddress.address}
              {...{ onChange }}
            ></textarea>
            <div className='flex items-center space-x-2 sm:space-x-5'>
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                placeholder='Postcode'
                name='postcode'
                value={shippingAddress.postcode}
                {...{ onChange }}
              />
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                placeholder='City'
                name='city'
                value={shippingAddress.city}
                {...{ onChange }}
              />
              <input
                className='opacity-50 bg-gray-100 border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                value={shippingAddress.country}
                disabled
                placeholder='Country'
                name='country'
                {...{ onChange }}
              />
            </div>
          </form>
        </div>
        <div className='lg:col-span-1'>
          <div className='border-2 border-dashed p-8 rounded-md'>
            <h2 className='text-xl text-gray-700 font-semibold mb-5'>
              Order Summary
            </h2>
            <div className='flex justify-between items-center border-b-2 border-dashed pb-5'>
              <h4 className='text-md text-gray-600'>
                Sub-total (
                {cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0)}
                ) Items
              </h4>
              <span className='text-base text-gray-600'>
                $
                {cart?.cartItems
                  ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button
              className='w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300'
              onClick={onSubmit}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingScreen;
