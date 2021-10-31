import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CheckoutSteps, Meta } from '../components';
import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { user } = useSelector(state => state.userLogin);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!cart?.shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate, user, cart]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      variants={stagger}
      initial='hidden'
      animate='visible'
    >
      <Meta title='Select payment method' />
      <CheckoutSteps step1 step2 />
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 '>
          <h2 className='text-2xl text-gray-600 mb-5'>Payment Method</h2>
          <div className='border-2 border-gray-200 rounded-md p-8'>
            <form className='space-y-3' {...{ onSubmit }}>
              <div className='flex items-center space-x-3'>
                <input
                  checked={paymentMethod === 'stripe'}
                  type='radio'
                  name='payment'
                  id='stripe'
                  value='stripe'
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <label className='cursor-pointer' htmlFor='stripe'>
                  Stripe Payment
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='radio'
                  name='payment'
                  id='cashOnDelivery'
                  value='cashOnDelivery'
                  checked={paymentMethod === 'cashOnDelivery'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <label className='cursor-pointer' htmlFor='cashOnDelivery'>
                  Cash on Delivery
                </label>
              </div>
            </form>
          </div>
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
              Continue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentScreen;
