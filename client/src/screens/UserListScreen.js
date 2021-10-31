import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import emptyImg from '../assets/not-found.svg';
import Loader from '../components/Loader';
import { getUserList, userDelete } from '../redux/actions/userActions';

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: userLogin } = useSelector(state => state.userLogin);
  const { users, loading } = useSelector(state => state.userList);

  useEffect(() => {
    if (!userLogin?.isAdmin) {
      navigate('/profile');
    } else {
      dispatch(getUserList());
    }
  }, [dispatch, navigate, userLogin]);

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
        All users
      </h3>
      {users?.length === 0 ? (
        <div className='space-y-10'>
          <div className='flex justify-center items-center mt-20'>
            <img src={emptyImg} width='250' height='250' alt='' />
          </div>
          <h4 className='text-center text-lg lg:text-xl text-gray-700'>
            Sorry, users not found
          </h4>
        </div>
      ) : (
        <div className='overflow-x-auto mt-6'>
          {loading && <Loader />}
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
                <th className='px-4 py-2 whitespace-nowrap'>Picture</th>
                <th className='px-4 py-2 whitespace-nowrap'>Name</th>
                <th className='px-4 py-2 whitespace-nowrap'>Email</th>
                <th className='px-4 py-2 whitespace-nowrap'>Role</th>
                <th className='px-4 py-2 whitespace-nowrap'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-sm font-normal text-gray-700'>
              {users?.map(user => (
                <tr
                  className='hover:bg-gray-100 border-b border-gray-200 py-10'
                  key={user._id}
                >
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <img
                      src={user.avatar}
                      alt=''
                      className='w-10 h-10 rounded-md'
                    />
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {user.firstName} {user?.lastName}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <a
                      className='hover:underline'
                      href={`mailto:${user.email}`}
                    >
                      {user.email}
                    </a>
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {user.isAdmin ? (
                      <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Admin</span>
                      </span>
                    ) : (
                      <span className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Subscriber</span>
                      </span>
                    )}
                  </td>

                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='flex items-center space-x-3'>
                      <button
                        className='px-4 py-2 bg-gray-100 hover:bg-white'
                        onClick={() => navigate(`/profile/users/${user._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className='px-4 py-2 bg-red-500 text-white hover:bg-red-400 transition-colors duration-300'
                        onClick={() => {
                          if (userLogin?._id === user._id || user?.isAdmin) {
                            toast.error('You can not delete admin account');
                          } else {
                            if (
                              window.confirm(
                                'Are you sure to delete this account?'
                              )
                            ) {
                              dispatch(userDelete(user?._id));
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
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

export default UserListScreen;
