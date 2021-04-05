import React from 'react';
import checkIcon from '../assets/check-icon.svg';

const OrderScreen = () => {
  return (
    <>
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
          Order No #
          {'606b24c2cd11400004b519d6'.substring(
            '606b24c2cd11400004b519d6'.length - 8
          )}
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
            <p className='text-gray-400'>Begunhati, Karihata, Gazipur</p>
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
            <p className='text-gray-400'>01315873250</p>
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
              href='mailto:hasibmuttakin@gmail.com'
              className='text-gray-400 hover:underline'
            >
              hasibmuttakin@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
