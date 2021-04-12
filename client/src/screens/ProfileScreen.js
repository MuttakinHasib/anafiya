import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from '../components';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div className='grid gap-10 lg:grid-cols-7'>
      <div className='lg:col-span-2'>
        <div className='shadow-lg p-5 space-y-8 max-w-xl lg:max-w-full mx-auto'>
          <div className='text-center space-y-3'>
            <img
              src={user?.avatar}
              alt=''
              className='w-24 mx-auto h-24 rounded-full'
            />
            <div>
              <h2 className='text-2xl font-medium text-gray-600'>
                {user?.firstName} {user?.lastName}
              </h2>
              <a
                href={`mailto:${user?.email}`}
                className='text-sm font-light text-gray-400 hover:underline'
              >
                {user?.email}
              </a>
            </div>
          </div>
          <div className='space-y-4'>
            <NavLink
              to='/profile'
              activeClassName='border-l-4 border-gray-900'
              className='px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light'
            >
              <div className='flex items-center space-x-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
                  />
                </svg>
                <span>My Account</span>
              </div>
            </NavLink>
            <NavLink
              to='/profile/address'
              activeClassName='border-l-4 border-gray-900'
              className='px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light'
            >
              <div className='flex items-center space-x-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
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
                <span>Address</span>
              </div>
            </NavLink>
            <NavLink
              to='/profile/orderlist'
              activeClassName='border-l-4 border-gray-900'
              className='px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light'
            >
              <div className='flex items-center space-x-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  />
                </svg>
                <span>Order List</span>
              </div>
            </NavLink>
            <NavLink
              to='/profile/change-password'
              activeClassName='border-l-4 border-gray-900'
              className='px-3 py-2 bg-gray-100 w-full block text-gray-600 font-light'
            >
              <div className='flex items-center space-x-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                  />
                </svg>
                <span>Change Password</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className='lg:col-span-5 overflow-x-auto'>
        <div className='shadow-lg p-8 max-w-xl lg:max-w-full mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
