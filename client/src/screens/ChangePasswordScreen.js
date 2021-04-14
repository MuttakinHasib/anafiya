import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileUpdate } from '../redux/actions/userActions';

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.userLogin);

  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    cPassword: '',
  });

  const { oldPassword, newPassword, cPassword } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (oldPassword && newPassword && cPassword) {
      if (newPassword === cPassword) {
        dispatch(userProfileUpdate({ oldPassword, newPassword }));
      } else {
        toast.error('The Confirm password does not match');
      }
    }
    setState({ oldPassword: '', newPassword: '', cPassword: '' });
  };
  return (
    <>
      <h3 className='text-gray-800 text-xl pb-3 border-b-2 mb-5 font-medium'>
        Change Password
      </h3>
      <div className='max-w-xl'>
        <form className='space-y-3' {...{ onSubmit }}>
          <div>
            <label
              htmlFor='oldPassword'
              className='font-semibold text-gray-700 block pb-2'
            >
              Current Password
            </label>
            <div className='flex'>
              <input
                id='oldPassword'
                name='oldPassword'
                className={
                  'text-gray-600 border-gray-200 px-4 rounded-md bg-gray-100 w-full'
                }
                type='password'
                value={oldPassword}
                required
                placeholder='Enter current password'
                {...{ onChange }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='newPassword'
              className='font-semibold text-gray-700 block pb-2'
            >
              New Password
            </label>
            <div className='flex'>
              <input
                id='newPassword'
                name='newPassword'
                className={
                  'text-gray-600 border-gray-200 px-4 rounded-md bg-gray-100 w-full'
                }
                type='password'
                value={newPassword}
                required
                placeholder='Enter new password'
                {...{ onChange }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='cPassword'
              className='font-semibold text-gray-700 block pb-2'
            >
              Confirm Password
            </label>
            <div className='flex'>
              <input
                id='cPassword'
                name='cPassword'
                className={
                  'text-gray-600 border-gray-200 px-4 rounded-md bg-gray-100 w-full'
                }
                type='password'
                value={cPassword}
                required
                placeholder='Confirm password'
                {...{ onChange }}
              />
            </div>
          </div>
          <div className='flex mt-5'>
            <button
              type='submit'
              className='rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordScreen;
