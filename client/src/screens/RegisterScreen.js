import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  facebookSignIn,
  googleSignIn,
  register,
} from '../redux/actions/userActions';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import Meta from '../components/Meta';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(({ userLogin }) => userLogin);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cPassword: '',
  });

  const { firstName, lastName, email, password, cPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (
      firstName === '' ||
      email === '' ||
      password === '' ||
      cPassword === ''
    ) {
      toast.error('Please fill all fields');
    } else if (password !== cPassword) {
      toast.error('Please make sure your passwords match');
    } else {
      dispatch(register({ firstName, lastName, email, password }));
    }
  };

  const googleSignInHandler = res => {
    dispatch(googleSignIn({ idToken: res.tokenId }));
  };
  const facebookSignInHandler = res => {
    const { accessToken, userID } = res;
    dispatch(facebookSignIn({ accessToken, userID }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='grid gap-15 md:grid-cols-2 mt-20'>
      <Meta title='Create new account' />
      <div className='m-auto'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold text-gray-700'>
          Get started <br /> With a free Account
        </h2>
        <p className='prose mt-5 text-gray-500'>
          Already have an account? <br />
          Please{' '}
          <Link to='/login'>
            <span className='text-blue-600'>Login here!</span>
          </Link>
        </p>
      </div>
      <div className='max-w-full sm:max-w-lg mx-auto md:ml-auto'>
        <form
          className='space-y-3 sm:space-y-5 border-0 border-dashed border-gray-100 p-10'
          {...{ onSubmit }}
        >
          <div className='flex sm:flex-row flex-col items-center space-y-3 sm:space-y-0 sm:space-x-5'>
            <input
              type='text'
              name='firstName'
              className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
              placeholder='First Name'
              required
              value={firstName}
              {...{ onChange }}
            />
            <input
              type='text'
              className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
              placeholder='Last Name'
              name='lastName'
              value={lastName}
              {...{ onChange }}
            />
          </div>
          <input
            type='email'
            className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
            placeholder='E-mail Address'
            required
            name='email'
            value={email}
            {...{ onChange }}
          />
          <div className='flex sm:flex-row flex-col items-center space-y-3 sm:space-y-0 sm:space-x-5'>
            <input
              type='password'
              className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
              placeholder='Enter Password'
              required
              name='password'
              value={password}
              {...{ onChange }}
            />
            <input
              type='password'
              className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
              placeholder='Confirm Password'
              required
              name='cPassword'
              value={cPassword}
              {...{ onChange }}
            />
          </div>
          <button className='bg-blue-600 hover:bg-blue-700 shadow-lg rounded-lg text-white px-5 py-2 h-12 w-full transition-colors duration-300 focus:outline-none'>
            Create Account
          </button>
        </form>
        <div className='px-10'>
          <div className='flex items-center space-x-5 mb-8'>
            <div style={{ height: '1px' }} className='w-full bg-gray-300'></div>
            <p className='flex-1 whitespace-nowrap text-base text-gray-400'>
              Or Sign up with
            </p>
            <div style={{ height: '1px' }} className='w-full bg-gray-300'></div>
          </div>
          <div className='flex sm:flex-row flex-col items-center space-y-3 sm:space-y-0 sm:space-x-5'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={renderProps => (
                <button
                  className='w-full focus:outline-none flex justify-center items-center space-x-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    className='w-7'
                    src='https://img.icons8.com/color/50/000000/google-logo.png'
                    alt=''
                  />
                  <span>Google</span>
                </button>
              )}
              buttonText='Login'
              onSuccess={googleSignInHandler}
              onFailure={googleSignInHandler}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields='name,email,picture'
              callback={facebookSignInHandler}
              render={renderProps => (
                <button
                  className='w-full focus:outline-none flex justify-center items-center space-x-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    className='w-7'
                    src='https://img.icons8.com/fluent/48/000000/facebook-new.png'
                    alt=''
                  />
                  <span>Facebook</span>
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RegisterScreen;
