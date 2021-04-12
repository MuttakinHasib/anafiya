import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserInfoScreen = () => {
  const [disableEdit, setDisableEdit] = useState(true);
  const { user } = useSelector(state => state.userLogin);

  const [state, setState] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });
  return (
    <>
      <div className='flex items-center justify-between pb-3 border-b-2 mb-5'>
        <h3 className='text-gray-800 text-xl'>Personal Information</h3>
        {disableEdit && (
          <button
            className='text-purple-900 transition-colors duration-300 flex items-center'
            onClick={() => setDisableEdit(!disableEdit)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
            </svg>
            &nbsp; Edit
          </button>
        )}
      </div>
      <div className='max-w-lg'>
        <form className='space-y-3'>
          <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5'>
            <div className='w-full'>
              <label
                for='firstName'
                className='font-semibold text-gray-700 block pb-2'
              >
                First Name
              </label>
              <div className='flex'>
                <input
                  disabled={disableEdit}
                  id='firstName'
                  name='firstName'
                  className={
                    'px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={state.firstName}
                  placeholder='Enter first name'
                  {...{ onChange }}
                />
              </div>
            </div>
            {user?.lastName && (
              <div className='w-full'>
                <label
                  for='lastName'
                  className='font-semibold text-gray-700 block pb-2'
                >
                  Last Name
                </label>
                <div className='flex'>
                  <input
                    disabled={disableEdit}
                    id='lastName'
                    name='lastName'
                    className={
                      'px-4 rounded-md bg-gray-100 w-full' +
                      (!disableEdit
                        ? ' border-gray-300'
                        : ' border-transparent')
                    }
                    type='text'
                    value={state.lastName}
                    placeholder='Enter last name'
                    {...{ onChange }}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <label
              for='email'
              className='font-semibold text-gray-700 block pb-2'
            >
              E-mail Address
            </label>
            <div className='flex'>
              <input
                disabled
                id='email'
                name='email'
                className={
                  'px-4 rounded-md text-gray-500 bg-gray-100 w-full border-none'
                }
                type='email'
                value={state.email}
                placeholder='Enter email address'
                {...{ onChange }}
              />
            </div>
          </div>
          {!disableEdit && (
            <div className='flex items-center space-x-5'>
              <button
                type='button'
                className='rounded-md border-2 px-5 py-2 text-gray-700 font-light hover:bg-gray-50 transition-colors duration-300'
                onClick={() => setDisableEdit(true)}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300'
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default UserInfoScreen;
