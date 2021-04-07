import React from 'react';

const Loader = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center loading text-center '
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#0008',
        color: '#fff',
        zIndex: 20,
        width: '100%',
        height: '100vh',
      }}
    >
      <svg width='205' height='250' viewBox='0 0 40 50'>
        <polygon
          strokeWidth='1'
          stroke='#fff'
          fill='none'
          points='20,1 40,40 1,40'
        ></polygon>
        <text fill='#fff' x='5' y='47'>
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loader;
