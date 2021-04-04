import React from 'react';
import { Link } from 'react-router-dom';

const CartScreen = ({history}) => {
  return (
    <>
      <h2 className='text-4xl text-gray-700 mb-10'>Your Shopping Cart</h2>
      <div className='grid gap-12 grid-cols-3'>
        <div className='col-span-2'>
          <div className='flex justify-between items-center space-x-8'>
            <img
              className='w-32'
              src='https://cdn.shopify.com/s/files/1/1252/6423/collections/books_360x.jpg?v=1616852293'
              alt=''
            />
            <Link to='/' className='text-md hover:underline flex-1'>
              Ramadan Pack
            </Link>
            <div className='w-32 text-center'>$19.59</div>
            <div>
              <select
                className='w-24 border-none bg-gray-100 rounded-md focus:ring-purple-100'
                name='quantity'
                id='quantity'
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <button className='w-20 bg-red-500 hover:bg-red-600 transition-colors duration-300 py-1 rounded-md text-white'>
              <svg
                className='w-8 mx-auto'
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
        </div>
        <div className='col-span-1 bg-gray-100 p-8'>
          <h2 className='text-xl text-gray-700 font-semibold mb-5'>
            Order Summary
          </h2>
          <div className='flex justify-between items-center'>
            <h4 className='text-md text-gray-600'>Sub-total (5) Items</h4>
            <span className='text-base text-gray-600'>$50.55</span>
          </div>
          <button className='w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300'}>
            Process to checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
