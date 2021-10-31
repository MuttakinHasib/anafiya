import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrdersList } from '../redux/actions/orderActions';
import emptyImg from '../assets/empty.svg';
import { motion } from 'framer-motion';

const UserOrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.userOrdersList);

  useEffect(() => {
    dispatch(getUserOrdersList());
  }, [dispatch]);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <h3 className='text-gray-800 text-2xl pb-3 border-b-2 mb-5 font-medium'>
        Order List
      </h3>
      {orders?.length === 0 ? (
        <div className='space-y-10'>
          <div className='flex justify-center items-center mt-20'>
            <img src={emptyImg} width='250' height='250' alt='' />
          </div>
          <h4 className='text-center text-lg lg:text-xl text-gray-700'>
            Sorry, No order history
          </h4>
        </div>
      ) : (
        <div className='overflow-x-auto mt-6'>
          <motion.table
            exit={{ opacity: 0 }}
            variants={stagger}
            initial='hidden'
            animate='visible'
            className='table-auto border-collapse w-full'
          >
            <thead>
              <tr
                className='rounded-lg text-sm font-medium text-gray-700 text-left'
                style={{ backgroundColor: '#f8f8f8' }}
              >
                <th className='px-4 py-2 whitespace-nowrap'>ID</th>
                <th className='px-4 py-2 whitespace-nowrap'>Date</th>
                <th className='px-4 py-2 whitespace-nowrap'>Total</th>
                <th className='px-4 py-2 whitespace-nowrap'>Payment</th>
                <th className='px-4 py-2 whitespace-nowrap'>Delivered</th>
                <th className='px-4 py-2 whitespace-nowrap'>Action</th>
              </tr>
            </thead>
            <tbody className='text-sm font-normal text-gray-700'>
              {orders?.map(order => (
                <tr
                  className='hover:bg-gray-100 border-b border-gray-200 py-10'
                  key={order._id}
                >
                  <td className='px-4 py-4 whitespace-nowrap'>{order._id}</td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    ${order.totalPrice}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {order.isPaid ? (
                      <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Paid</span>
                      </span>
                    ) : (
                      <span className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Not paid</span>
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {order.isDelivered ? (
                      <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Delivered</span>
                      </span>
                    ) : (
                      <span className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Not Delivered</span>
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <button
                      className='px-4 py-2 bg-gray-100 hover:bg-white'
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      )}
    </>
  );
};

export default UserOrderListScreen;
