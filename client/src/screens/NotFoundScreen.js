import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <h2 className='text-5xl text-gray-700'>404</h2>
      <h4 className='text-lg text-gray-600'>Page Not Found</h4>
      <p className='my-8 prose font-light'>
        The link you clicked may be broken or the page may have been removed or
        renamed.
      </p>
      <Link to='/' className='text-blue-400 underline'>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundScreen;
