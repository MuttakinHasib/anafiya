import React from 'react';
import { Link } from 'react-router-dom';
import { CheckoutSteps } from '../components';

const PlaceOrderScreen = ({ history }) => {
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 space-y-7'>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Ordered Items</h2>
            <div className='border-2 border-gray-200 rounded-md px-8 py-5 divide-y-2 space-y-2'>
              <div className='flex md:items-center flex-col md:flex-row justify-between'>
                <div className='flex items-center'>
                  <img
                    src='https://cdn.shopify.com/s/files/1/1252/6423/collections/books_360x.jpg?v=1616852293'
                    alt=''
                    className='w-20 mr-8'
                  />
                  <Link
                    to={`/product/1`}
                    className='text-base md:text-lg text-gray-600 hover:underline'
                  >
                    Ramadan Gift
                  </Link>
                </div>
                <p className='prose'>1 x $19.68 = $19.68</p>
              </div>
              <div className='flex md:items-center flex-col md:flex-row justify-between'>
                <div className='flex items-center'>
                  <img
                    src='https://cdn.shopify.com/s/files/1/1252/6423/collections/books_360x.jpg?v=1616852293'
                    alt=''
                    className='w-20 mr-8'
                  />
                  <Link
                    to={`/product/1`}
                    className='text-base md:text-lg text-gray-600 hover:underline'
                  >
                    Ramadan Gift
                  </Link>
                </div>
                <p className='prose'>1 x $19.68 = $19.68</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Payment Method</h2>
            <div className='border-2 border-gray-200 rounded-md p-8'>
              <h2 className='text-lg'>Stripe Payment</h2>
            </div>
          </div>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Shipping Details</h2>
            <div className='border-2 border-gray-200 hover:bg-blue-400 hover:bg-opacity-5 rounded-md p-8'>
              <h4 className='text-lg text-gray-700'>Hasib Molla</h4>
              <div className='text-gray-500 font-light'>
                <a
                  className='hover:underline text-'
                  href='mailto:hasibmuttakin@gmail.com'
                >
                  hasibmuttakin@gmail.com
                </a>
                <p>01315873250</p>
                <p>BegunHati, Karihata, Kapasia - 1730</p>
                <p>Bangladesh</p>
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
                <h4 className='text-md text-gray-600'>Sub-total (5) Items</h4>
                <span className='text-base text-gray-600'>$50.55</span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>Shipping Price</h4>
                <span className='text-base text-gray-600'>$50.55</span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>Tax</h4>
                <span className='text-base text-gray-600'>$50.55</span>
              </div>
              <div className='flex justify-between items-center border-b-2 border-dashed pb-5'>
                <h4 className='text-lg font-semibold text-gray-700'>Total</h4>
                <span className='text-base text-gray-600'>$50.55</span>
              </div>
            </div>
            <button
              className='w-full mt-5 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 transition-shadow duration-300'
              onClick={() => history.push('/order/1')}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
