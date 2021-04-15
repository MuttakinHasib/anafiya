import { motion } from 'framer-motion';
import React from 'react';
import imgSrc from '../assets/slider-1.jpg';
const Banner = () => {
  return (
    <div>
      <motion.img
        src={imgSrc}
        className='mb-10'
        alt=''
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
    </div>
  );
};

export default Banner;
