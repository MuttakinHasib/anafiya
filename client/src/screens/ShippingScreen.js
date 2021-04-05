import React from 'react';
// import { Link } from 'react-router-dom';
import { CheckoutSteps } from '../components';

const ShippingScreen = ({ history }) => {
  return (
    <>
      <CheckoutSteps step1 />
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 max-w-full lg:max-w-2xl'>
          <h2 className='text-2xl text-gray-600 mb-12'>Shipping Address</h2>
          <form className='space-y-5'>
            <div className='flex items-center space-x-2 sm:space-x-5'>
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                placeholder='Full Name'
              />
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                placeholder='Phone Number'
              />
            </div>
            <textarea
              className='border-2 w-full text-xs sm:text-base border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
              placeholder='Address'
              style={{ maxWidth: '47.5rem' }}
            ></textarea>
            <div className='flex items-center space-x-2 sm:space-x-5'>
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                placeholder='Postcode'
              />
              <input
                className='border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                placeholder='City'
              />
              <input
                className='opacity-50 bg-gray-100 border-2 w-full text-xs sm:text-base lg:w-60 border-gray-200 focus:ring-gray-200 transition-shadow duration-500 rounded-md px-5 overflow-hidden'
                type='text'
                value='Bangladesh'
                disabled
                placeholder='Country'
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
              <h4 className='text-md text-gray-600'>Sub-total (5) Items</h4>
              <span className='text-base text-gray-600'>$50.55</span>
            </div>
            <button
              className='w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300'
              onClick={() => history.push('/payment')}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingScreen;
