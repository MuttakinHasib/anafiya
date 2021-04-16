import { motion } from 'framer-motion';
import React from 'react';

const Loader = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='fixed flex justify-center items-center w-screen h-screen text-center loading top-0 left-0'
      style={{ backgroundColor: '#0008', color: '#fff', zIndex: 20 }}
    >
      <svg width='130' height='130' viewBox='0 0 40 50'>
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
    </motion.div>
  );
};

export default Loader;
