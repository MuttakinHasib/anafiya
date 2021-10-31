import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='flex items-center space-x-5 text-sm md:text-base'>
      <div className='space-x-5 flex items-center'>
        {step1 ? (
          <>
            <Link to='/shipping'>
              <h4 className='text-indigo-400'>Shipping Information</h4>
            </Link>
            <i className='fas fa-chevron-right'></i>
          </>
        ) : (
          <>
            <Link to='/shipping'>
              <h4 className='text-gray-400'>Shipping Information</h4>
            </Link>
            <i className='fas fa-chevron-right text-gray-400'></i>
          </>
        )}
      </div>
      <div className='space-x-5 flex items-center'>
        {step2 ? (
          <>
            <Link to='/payment'>
              <h4 className='text-indigo-400'>Payment Method</h4>
            </Link>
            <i className='fas fa-chevron-right'></i>
          </>
        ) : (
          <>
            <Link to='/payment' className='pointer-events-none'>
              <h4 className='text-gray-400'>Payment Method</h4>
            </Link>
            <i className='fas fa-chevron-right text-gray-400'></i>
          </>
        )}
      </div>
      <div className='space-x-5 flex items-center'>
        {step3 ? (
          <Link to='/placeorder'>
            <h4 className='text-indigo-400'>Place Order</h4>
          </Link>
        ) : (
          <Link to='/placeorder' className='pointer-events-none'>
            <h4 className='text-gray-400'>Place Order</h4>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
