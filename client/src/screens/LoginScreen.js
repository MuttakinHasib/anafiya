import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  return (
    <div className='grid gap-15 md:grid-cols-2 mt-20'>
      <div className='m-auto'>
        <h2 className='text-5xl leading-tight font-semibold text-gray-700'>
          Assalamualaikom
          <br /> Welcome Back
        </h2>
        <p className='prose mt-5 text-gray-500'>
          You don't have an account? <br />
          Please{' '}
          <Link to='/register'>
            <span className='text-blue-600'>Register here!</span>
          </Link>
        </p>
      </div>
      <div className='max-w-lg ml-auto'>
        <form className='space-y-5 border-0 border-dashed border-gray-100 p-10'>
          <input
            type='email'
            name='email'
            className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
            placeholder='E-mail Address'
            required
            value={email}
            {...{ onChange }}
          />
          <input
            type='password'
            name='password'
            className='border-0 bg-gray-100 bg-opacity-50 px-4 border-gray-100 rounded-md focus:ring-0 focus:border-gray-200 w-full'
            placeholder='Password'
            required
            value={password}
            {...{ onChange }}
          />
          <button className='bg-blue-600 hover:bg-blue-700 shadow-lg rounded-lg text-white px-5 py-2 h-12 w-full transition-colors duration-300 focus:outline-none'>
            Sign in
          </button>
        </form>
        <div className='px-10'>
          <div className='flex items-center space-x-5 mb-8'>
            <div style={{ height: '1px' }} className='w-full bg-gray-300'></div>
            <p className='flex-1 whitespace-nowrap text-base text-gray-400'>
              Or Sign in with
            </p>
            <div style={{ height: '1px' }} className='w-full bg-gray-300'></div>
          </div>
          <div className='flex items-center space-x-5'>
            <button className='w-full focus:outline-none flex justify-center items-center space-x-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300'>
              <img
                className='w-7'
                src='https://img.icons8.com/color/50/000000/google-logo.png'
                alt=''
              />
              <span>Google</span>
            </button>
            <button className='w-full focus:outline-none flex justify-center items-center space-x-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300'>
              <img
                className='w-7'
                src='https://img.icons8.com/fluent/48/000000/facebook-new.png'
                alt=''
              />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default LoginScreen;
