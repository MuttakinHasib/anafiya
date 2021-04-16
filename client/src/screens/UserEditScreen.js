import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import { getUserDetails, updateUser } from '../redux/actions/userActions';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
  const [disableEdit, setDisableEdit] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { user: userLogin } = useSelector(state => state.userLogin);
  const { user } = useSelector(state => state.userDetails);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userLogin || !userLogin?.isAdmin) {
      navigate('/profile');
    } else {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, userId, userLogin, navigate]);

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
      setIsAdmin(user?.isAdmin);
    }
  }, [user]);

  // Upload Avatar Handler

  const handleAvatar = async e => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('avatar', file);

    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userLogin.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload/avatar`,
        formData,
        config
      );
      dispatch(updateUser(user?._id, { avatar: data.url, isAdmin }));

      setUploading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Submit form handler

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateUser(user?._id, { firstName, lastName, email, isAdmin }));
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
      {uploading && <Loader />}
      <div className='flex items-center justify-between pb-3 border-b-2 mb-5'>
        <h3 className='text-gray-800 text-xl font-medium'>User Information</h3>
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
      <div className='flex justify-between'>
        <div className='flex mb-10 space-x-5'>
          <div className='relative w-24 h-24 rounded-xl img-container overflow-hidden '>
            <div className='absolute top-0 left-0 w-full h-full img-overlay'></div>
            <img
              src={user?.avatar}
              alt=''
              className='w-full h-full object-cover block'
            />
            <label
              htmlFor='upload-avatar'
              className='flex justify-center w-full upload-btn text-white h-1/3 absolute -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm'
            >
              change
              <input
                type='file'
                id='upload-avatar'
                name='avatar'
                className='opacity-0 cursor-pointer absolute top-0 left-0'
                onChange={handleAvatar}
              />
            </label>
          </div>
          <div>
            <div className='flex items-center space-x-5'>
              <h2 className='text-2xl font-medium text-gray-600 relative inline-block'>
                {user?.firstName} {user?.lastName}
              </h2>
              {user?.isAdmin ? (
                <span className='relative text-center px-3 py-1 font-semibold text-green-900 leading-tight'>
                  <span
                    aria-hidden
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                  ></span>
                  <span className='relative text-center text-xs'>Admin</span>
                </span>
              ) : (
                <span className='relative text-center px-3 py-1 font-semibold text-red-900 leading-tight'>
                  <span
                    aria-hidden
                    className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                  ></span>
                  <span className='relative text-center text-xs'>
                    Subscriber
                  </span>
                </span>
              )}
            </div>
            <a
              className='hover:underline text-gray-500 text-base'
              href={`mailto:${user?.email}`}
            >
              {user?.email}
            </a>
            <p className='text-gray-400 text-sm font-light'>
              Joined <Moment fromNow>{user?.createdAt}</Moment>
            </p>
          </div>
        </div>
        {!disableEdit && (
          <div>
            <button
              className='bg-gray-800 px-4 py-2 text-white'
              onClick={() => setIsAdmin(prev => !prev)}
            >
              Mark as{isAdmin ? ' Subscriber' : ' Admin'}
            </button>
          </div>
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
                htmlFor='firstName'
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
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
                  type='text'
                  value={firstName}
                  placeholder='Enter first name'
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
            </div>
            {(user?.lastName || !disableEdit) && (
              <div className='w-full'>
                <label
                  htmlFor='lastName'
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
                      'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                      (!disableEdit
                        ? ' border-gray-300'
                        : ' border-transparent')
                    }
                    type='text'
                    value={lastName}
                    placeholder='Enter last name'
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
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
                onChange={e => setEmail(e.target.value)}
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
        </motion.form>
      </div>
    </>
  );
};

export default UserEditScreen;
