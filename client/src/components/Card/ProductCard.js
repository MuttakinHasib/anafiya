import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { addToCart } from '../../redux/actions/cartActions';
import Rating from '../Rating';

const ProductCard = ({ product, i }) => {
  const dispatch = useDispatch();

  const fadeUp = {
    initial: { x: 30, opacity: 0 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial='initial'
      animate='animate'
      className='flex flex-col justify-center mx-auto hover:shadow-xl border-2 border-dashed transition-shadow duration-500'
    >
      <Link to={`/product/${product?._id}`} className='flex-1'>
        <img
          className='h-64 w-80 object-cover mx-auto'
          src={product?.image}
          alt=''
        />
      </Link>
      <div className='px-5 py-3'>
        <div className='flex justify-between items-center'>
          <small className='text-gray-500'>{product?.category}</small>
          <Rating value={product?.rating} />
        </div>
        <div className='flex justify-between items-center'>
          <Link
            to={`/product/${product?._id}`}
            className='text-base text-gray-700 hover:underline flex-1'
          >
            {product?.name}
          </Link>
          <small className='text-gray-400 ml-2'>
            {product?.numReviews} reviews
          </small>
        </div>
      </div>
      <div className='flex justify-between items-center px-5 py-3 border-t border-dotted'>
        <h3 className='text-base text-yellow-700'>${product?.price}</h3>
        {product?.countInStock > 0 ? (
          <button
            className='text-blue-900 hover:underline focus:outline-none font-semibold flex items-center space-x-2'
            title='Add to cart'
            // disabled={product?.countInStock === 0}
            onClick={() => {
              if (product?.countInStock === 0) {
                toast.error('Out of stock');
              } else {
                dispatch(addToCart(product?._id, 1));
                toast.success('Added to cart');
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-7'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
            <small>Add to cart</small>
          </button>
        ) : (
          <span className='relative inline-block px-3 py-1 font-semibold text-red-800 leading-tight'>
            <span
              aria-hidden
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative text-xs'>Out of stock</span>
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
