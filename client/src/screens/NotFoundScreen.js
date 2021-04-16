import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className='flex items-center justify-center'>
      <h2 className='tex-4xl text-gray-700'>404</h2>
      <h4 className='text-lg text-gray-600'>Page Not Found</h4>
      <p className='mt-8 prose'>
        The link you clicked may be broken or the page may have been removed or
        renamed.
      </p>
      <Link to='/' className='text-blue-400 underline'>
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundScreen;
