import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChangePasswordScreen = () => {
  const { user } = useSelector(state => state.userLogin);

  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    cPassword: '',
  });

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });
  return (
    <>
      <h3 className='text-gray-800 text-xl pb-3 border-b-2 mb-5'>
        Change Password
      </h3>
      <div className='max-w-xl'>
        <form className='space-y-3'>
          <div>
            <label
              for='oldPassword'
              className='font-semibold text-gray-700 block pb-2'
            >
              Old Password
            </label>
            <div className='flex'>
              <input
                id='oldPassword'
                name='oldPassword'
                className={'border-gray-200 px-4 rounded-md bg-gray-100 w-full'}
                type='password'
                value={state.oldPassword}
                placeholder='Enter old password'
                {...{ onChange }}
              />
            </div>
          </div>
          <div>
            <label
              for='newPassword'
              className='font-semibold text-gray-700 block pb-2'
            >
              New Password
            </label>
            <div className='flex'>
              <input
                id='newPassword'
                name='newPassword'
                className={'border-gray-200 px-4 rounded-md bg-gray-100 w-full'}
                type='password'
                value={state.newPassword}
                placeholder='Enter new password'
                {...{ onChange }}
              />
            </div>
          </div>
          <div>
            <label
              for='cPassword'
              className='font-semibold text-gray-700 block pb-2'
            >
              Confirm Password
            </label>
            <div className='flex'>
              <input
                id='cPassword'
                name='cPassword'
                className={'border-gray-200 px-4 rounded-md bg-gray-100 w-full'}
                type='password'
                value={state.cPassword}
                placeholder='Confirm password'
                {...{ onChange }}
              />
            </div>
          </div>
          <div className='flex mt-5'>
            <button
              type='submit'
              className='rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-300 transition-colors duration-300'
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
