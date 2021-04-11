import React from 'react';

const Alert = ({ title, success }) => {
  return success ? (
    <span className='text-green-800 bg-green-200 py-1 px-4 rounded-xl text-sm'>
      <i className='fas fa-check-circle text-green-delay-500'></i> &nbsp;{' '}
      {title}
    </span>
  ) : (
    <span className='text-red-800 bg-red-200 py-1 px-4 rounded-xl text-sm'>
      <i className='fas fa-times-circle text-red-500'></i> &nbsp; {title}
    </span>
  );
};

export default Alert;
