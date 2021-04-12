import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrdersList } from '../redux/actions/orderActions';

const UserOrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.userOrdersList);

  useEffect(() => {
    dispatch(getUserOrdersList());
  }, [dispatch]);

  return (
    <>
      <h3 className='text-gray-800 text-xl pb-3 border-b-2 mb-5'>Order List</h3>
      <div class='overflow-x-auto mt-6'>
        <table class='table-auto border-collapse w-full'>
          <thead>
            <tr
              class='rounded-lg text-sm font-medium text-gray-700 text-left'
              style={{ backgroundColor: '#f8f8f8' }}
            >
              <th class='px-4 py-2 whitespace-nowrap'>ID</th>
              <th class='px-4 py-2 whitespace-nowrap'>Date</th>
              <th class='px-4 py-2 whitespace-nowrap'>Total</th>
              <th class='px-4 py-2 whitespace-nowrap'>Paid</th>
              <th class='px-4 py-2 whitespace-nowrap'>Delivered</th>
              <th class='px-4 py-2 whitespace-nowrap'>Action</th>
            </tr>
          </thead>
          <tbody class='text-sm font-normal text-gray-700'>
            {orders?.map(order => (
              <tr
                class='hover:bg-gray-100 border-b border-gray-200 py-10'
                key={order._id}
              >
                <td class='px-4 py-4 whitespace-nowrap'>{order._id}</td>
                <td class='px-4 py-4 whitespace-nowrap'>
                  {order.createdAt.substring(0, 10)}
                </td>
                <td class='px-4 py-4 whitespace-nowrap'>${order.totalPrice}</td>
                <td class='px-4 py-4 whitespace-nowrap'>
                  {order.isPaid ? (
                    <span class='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                      <span
                        aria-hidden
                        class='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                      ></span>
                      <span class='relative text-xs'>Paid</span>
                    </span>
                  ) : (
                    <span class='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                      <span
                        aria-hidden
                        class='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                      ></span>
                      <span class='relative text-xs'>Not paid</span>
                    </span>
                  )}
                </td>
                <td class='px-4 py-4 whitespace-nowrap'>
                  {order.isDelivered ? (
                    <span class='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                      <span
                        aria-hidden
                        class='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                      ></span>
                      <span class='relative text-xs'>Delivered</span>
                    </span>
                  ) : (
                    <span class='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                      <span
                        aria-hidden
                        class='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                      ></span>
                      <span class='relative text-xs'>Not Delivered</span>
                    </span>
                  )}
                </td>
                <td class='px-4 py-4 whitespace-nowrap'>
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
        </table>
      </div>
    </>
  );
};

export default UserOrderListScreen;
