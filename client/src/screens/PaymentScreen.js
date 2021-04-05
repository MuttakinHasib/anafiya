import React from 'react';
import { CheckoutSteps } from '../components';

const PaymentScreen = ({ history }) => {
  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 '>
          <h2 className='text-2xl text-gray-600 mb-5'>Payment Method</h2>
          <div className='border-2 border-gray-200 rounded-md p-8'>
            <form className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <input checked type='radio' name='payment' id='stripe' />
                <label className='cursor-pointer' htmlFor='stripe'>
                  Stripe Payment
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input type='radio' name='payment' id='cashOnDelivery' />
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
              <h4 className='text-md text-gray-600'>Sub-total (5) Items</h4>
              <span className='text-base text-gray-600'>$50.55</span>
            </div>
            <button
              className='w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300'
              onClick={() => history.push('/placeorder')}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
