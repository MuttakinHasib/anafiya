import React from 'react';

const StockAlert = ({ inStock }) => {
  return inStock ? (
    <span className='text-green-800 bg-green-200 py-1 px-3 rounded-xl text-sm'>
      <i className='fas fa-check-circle text-green-delay-500'></i> &nbsp; In
      stock
    </span>
  ) : (
    <span className='text-red-800 bg-red-200 py-1 px-3 rounded-xl text-sm'>
      <i className='fas fa-times-circle text-red-500'></i> &nbsp; Stock out
    </span>
  );
};

export default StockAlert;
