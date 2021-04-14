import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { addToCart } from '../../redux/actions/cartActions';
import Rating from '../Rating';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      className='block'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className='flex flex-col justify-center mx-auto hover:shadow-xl border-2 border-dashed transition-shadow duration-500'>
        <Link to={`/product/${product?._id}`} className='flex-1'>
          <img
            className='h-64 w-80 object-cover '
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
              to='/product/1'
              className='text-base text-gray-700 hover:underline '
            >
              {product?.name}
            </Link>
            <small className='text-gray-400'>
              {product?.numReviews} reviews
            </small>
          </div>
        </div>
        <div className='flex justify-between items-center px-5 py-3 border-t border-dotted'>
          <h3 className='text-base text-yellow-700'>${product?.price}</h3>
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
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
