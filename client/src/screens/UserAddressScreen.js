import { motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cartActions';

const UserAddressScreen = () => {
  const dispatch = useDispatch();
  const [disableEdit, setDisableEdit] = useState(true);
  const { user } = useSelector(state => state.userLogin);
  const { shippingAddress } = useSelector(state => state.cart);
  const [state, setState] = useState({
    name: shippingAddress?.name || '',
    phone: shippingAddress?.phone || '',
    email: user?.email || '',
    address: shippingAddress?.address || '',
    postcode: shippingAddress?.postcode || '',
    city: shippingAddress?.city || '',
    country: shippingAddress?.country || 'Bangladesh',
  });
  const { name, phone, email, address, postcode, city, country } = state;
  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(saveShippingAddress(state));
    toast.success('Your address has been saved');
    setDisableEdit(true);
  };

  const stagger = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <div className='flex items-center justify-between pb-3 border-b-2 mb-5'>
        <h3 className='text-gray-800 text-2xl font-medium'>
          Address / Shipping Information
        </h3>
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
            &nbsp; <span>Edit</span>
          </button>
        )}
      </div>
      <div className='max-w-lg'>
        <motion.form
          exit={{ opacity: 0 }}
          variants={stagger}
          initial='hidden'
          animate='visible'
          className='space-y-3'
          {...{ onSubmit }}
        >
          <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='font-semibold text-gray-700 block pb-2'
              >
                Name
              </label>
              <div className='flex'>
                <input
                  disabled={disableEdit}
                  id='name'
                  name='name'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={name}
                  placeholder='Enter your name'
                  {...{ onChange }}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='phone'
                className='font-semibold text-gray-700 block pb-2'
              >
                Phone
              </label>
              <div className='flex'>
                <input
                  disabled={disableEdit}
                  id='phone'
                  name='phone'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={phone}
                  placeholder='Enter phone number'
                  {...{ onChange }}
                />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='email'
              className='font-semibold text-gray-700 block pb-2'
            >
              E-mail Address
            </label>
            <div className='flex'>
              <input
                disabled={disableEdit}
                id='email'
                name='email'
                className={
                  'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                  (!disableEdit ? ' border-gray-300' : ' border-transparent')
                }
                type='email'
                value={email}
                placeholder='Enter email address'
                {...{ onChange }}
              />
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='address'
              className='font-semibold text-gray-700 block pb-2'
            >
              Address
            </label>
            <div className='flex'>
              <textarea
                className={
                  'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                  (!disableEdit ? ' border-gray-300' : ' border-transparent')
                }
                disabled={disableEdit}
                placeholder='Enter address'
                // style={{ maxWidth: '47.5rem' }}
                name='address'
                value={address}
                {...{ onChange }}
              ></textarea>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5'>
            <div className='w-full'>
              <label
                htmlFor='postcode'
                className='font-semibold text-gray-700 block pb-2'
              >
                Postcode
              </label>
              <div className='flex'>
                <input
                  disabled={disableEdit}
                  id='postcode'
                  name='postcode'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={postcode}
                  placeholder='Enter your postcode'
                  {...{ onChange }}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='city'
                className='font-semibold text-gray-700 block pb-2'
              >
                City
              </label>
              <div className='flex'>
                <input
                  disabled={disableEdit}
                  id='city'
                  name='city'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={city}
                  placeholder='Enter city'
                  {...{ onChange }}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='country'
                className='font-semibold text-gray-700 block pb-2'
              >
                Country
              </label>
              <div className='flex'>
                <input
                  disabled={disableEdit}
                  id='country'
                  name='country'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={country}
                  placeholder='Enter country number'
                  {...{ onChange }}
                />
              </div>
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
        </motion.form>
      </div>
    </>
  );
};

export default UserAddressScreen;
